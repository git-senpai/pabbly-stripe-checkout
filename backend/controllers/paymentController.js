const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Create Stripe Checkout Session
const createCheckoutSession = async (req, res) => {
  try {
    const { email, items } = req.body;

    if (!email || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Email and cart items are required'
      });
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Stripe requires minimum ~₹42 (50 cents USD). We set minimum to ₹50 (5000 paise)
    if (totalAmount < 5000) {
      return res.status(400).json({
        success: false,
        message: 'Minimum order amount is ₹50. Please add more items to your cart.'
      });
    }

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : []
        },
        unit_amount: item.price // Price in paise
      },
      quantity: item.quantity
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        email: email
      }
    });

    // Create order in database with pending status
    const order = await Order.create({
      email,
      items,
      totalAmount,
      stripeSessionId: session.id,
      status: 'pending'
    });

    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Checkout Session Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create checkout session',
      error: error.message
    });
  }
};

// Handle Stripe Webhooks - ONLY way to update order status
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  console.log('Webhook received:', event.type);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      
      const updatedOrder = await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        { 
          status: 'success',
          paymentIntentId: session.payment_intent
        },
        { new: true }
      );
      
      if (updatedOrder) {
        console.log('Payment successful for session:', session.id);
      } else {
        console.log('Order not found for session:', session.id);
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object;
      
      const updatedOrder = await Order.findOneAndUpdate(
        { stripeSessionId: session.id, status: 'pending' },
        { status: 'failed' },
        { new: true }
      );
      
      if (updatedOrder) {
        console.log('Session expired:', session.id);
      }
      break;
    }

    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      
      await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        { status: 'failed' }
      );
      
      console.log('Async payment failed for session:', session.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      
      const updatedOrder = await Order.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { status: 'failed' },
        { new: true }
      );
      
      if (updatedOrder) {
        console.log('Payment failed for intent:', paymentIntent.id);
      } else {
        console.log('No order found for payment intent:', paymentIntent.id);
      }
      break;
    }

    default:
      console.log('Unhandled event type:', event.type);
  }

  res.status(200).json({ received: true });
};

// Get order by session ID (for success/cancel pages)
const getOrderBySessionId = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const order = await Order.findOne({ stripeSessionId: sessionId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get Order Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order',
      error: error.message
    });
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
  getOrderBySessionId
};