
const express = require('express');
const router = express.Router();
const { 
  createCheckoutSession, 
  getOrderBySessionId 
} = require('../controllers/paymentController');
const { getCancelledOrder } = require('../controllers/cancelController');

// POST /api/payment/create-checkout-session - Create Stripe checkout session
router.post('/create-checkout-session', createCheckoutSession);

// GET /api/payment/order/:sessionId - Get order by session ID
router.get('/order/:sessionId', getOrderBySessionId);

// GET /api/payment/cancel/:sessionId - Get cancelled order details
router.get('/cancel/:sessionId', getCancelledOrder);

// Note: Webhook route is mounted separately in server.js with raw body parser

module.exports = router;
