const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { emailTemplates, sendEmail } = require('../config/email');
const { auth } = require('../middleware/auth');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Plan definitions (amounts in paise)
const PLANS = {
  mains:    { price: 79900,  name: 'Mains Prep',         duration: 'yearly' },
  advanced: { price: 89900,  name: 'Advanced Prep',      duration: 'yearly' },
  bundle:   { price: 109900, name: 'Mains + Advanced',   duration: 'yearly' },
};

// POST /api/payment/create-order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { planType } = req.body;

    if (!PLANS[planType]) {
      return res.status(400).json({
        error: 'Invalid plan type. Valid options: mains, advanced, bundle',
      });
    }

    const plan = PLANS[planType];

    const order = await razorpay.orders.create({
      amount: plan.price,
      currency: 'INR',
      receipt: `rcpt_${req.user._id}_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        planType,
        userName: req.user.name,
        userEmail: req.user.email,
      },
    });

    // Persist pending payment record
    const payment = new Payment({
      userId: req.user._id,
      amount: plan.price / 100,
      planType,
      planDuration: plan.duration,
      orderId: order.id,
      status: 'pending',
    });
    await payment.save();

    res.json({
      success: true,
      order,
      keyId: process.env.RAZORPAY_KEY_ID,
      planName: plan.name,
      amount: plan.price,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/payment/verify
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, planType } = req.body;

    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return res.status(400).json({ error: 'Missing payment verification fields' });
    }

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      // Mark payment as failed
      await Payment.findOneAndUpdate(
        { orderId: razorpayOrderId },
        { status: 'failed' }
      );
      return res.status(400).json({ error: 'Payment verification failed: invalid signature' });
    }

    // Update payment record
    const payment = await Payment.findOneAndUpdate(
      { orderId: razorpayOrderId },
      {
        razorpayPaymentId,
        razorpaySignature,
        status: 'completed',
        completedAt: new Date(),
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: 'Payment record not found' });
    }

    // Update user plan — set 1-year expiry
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    await User.findByIdAndUpdate(req.user._id, {
      planType: planType || payment.planType,
      planExpiryDate: expiryDate,
      paymentStatus: 'completed',
      paymentId: razorpayPaymentId,
    });

    // Send confirmation email (non-blocking)
    sendEmail(
      req.user.email,
      emailTemplates.paymentConfirmation(req.user.name, payment.planType, payment.amount)
    );

    res.json({
      success: true,
      message: 'Payment verified and plan activated!',
      payment,
      planExpiry: expiryDate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/payment/history  — user's payment history
router.get('/history', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
