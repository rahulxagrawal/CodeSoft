const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

// simple auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; next();
  } catch (err) { res.status(401).json({ message: 'Invalid token' }); }
};

router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body; // amount in cents
    if (!process.env.STRIPE_SECRET_KEY) return res.status(400).json({ message: 'Stripe key not set in env' });
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const { orderItems, totalPrice, paymentResult } = req.body;
    const order = await Order.create({ user: req.userId, orderItems, totalPrice, paymentResult, isPaid: true });
    res.json(order);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
