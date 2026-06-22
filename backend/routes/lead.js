const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { emailTemplates, sendEmail } = require('../config/email');

// POST /api/leads/diagnostic-signup  — landing page form (no login required)
router.post('/diagnostic-signup', async (req, res) => {
  try {
    const { name, phone, email, currentScore, targetCollege } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const existingLead = await Lead.findOne({ phone });
    if (existingLead) {
      return res.status(400).json({ error: 'You have already signed up. Check your phone for instructions.' });
    }

    const lead = new Lead({
      name,
      phone,
      email,
      currentScore,
      targetCollege,
      signupSource: 'landing-page',
    });
    await lead.save();

    // Send welcome email if provided (non-blocking)
    if (email) {
      sendEmail(email, emailTemplates.diagnosticWelcome(name));
      await Lead.findByIdAndUpdate(lead._id, { emailSent: true });
    }

    res.status(201).json({
      success: true,
      message: 'Signup successful! Check your phone for the diagnostic test link.',
      leadId: lead._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/leads  — admin: get all leads
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { conversionStatus: status } : {};

    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Lead.countDocuments(filter);

    res.json({ success: true, leads, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/leads/:id/status  — update lead conversion status
router.patch('/:id/status', async (req, res) => {
  try {
    const { conversionStatus } = req.body;
    const validStatuses = ['pending', 'qualified', 'converted', 'rejected'];

    if (!validStatuses.includes(conversionStatus)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { conversionStatus },
      { new: true }
    );

    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
