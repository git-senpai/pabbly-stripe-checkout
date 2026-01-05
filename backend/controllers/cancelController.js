const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Handle cancel page - updates order status to cancelled
const getCancelledOrder = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    // Find and updates the order to cancelled status
    const order = await Order.findOneAndUpdate(
      { stripeSessionId: sessionId, status: 'pending' },
      { status: 'failed' },
      { new: true }
    );
    
    if (!order) {
      // Trying to find the order without status filter
      const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
      
      if (!existingOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }
      
      // Order exists but status already updated
      return res.status(200).json({
        success: true,
        data: {
          email: existingOrder.email,
          items: existingOrder.items,
          totalAmount: existingOrder.totalAmount,
          status: existingOrder.status
        }
      });
    }

    // Trying to expire the Stripe session to prevent future payments
    try {
      await stripe.checkout.sessions.expire(sessionId);
      console.log('Expired Stripe session:', sessionId);
    } catch (stripeError) {
      // Session already be expired or completed
      console.log(`Note: Could not expire session ${sessionId}: ${stripeError.message}`);
    }

    console.log('Order marked as failed:', sessionId);

    res.status(200).json({
      success: true,
      data: {
        email: order.email,
        items: order.items,
        totalAmount: order.totalAmount,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Get Cancelled Order Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process cancellation',
      error: error.message
    });
  }
};

module.exports = {
  getCancelledOrder
};