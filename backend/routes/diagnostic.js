const express = require('express');
const router = express.Router();
const Diagnostic = require('../models/Diagnostic');
const User = require('../models/User');
const { emailTemplates, sendEmail } = require('../config/email');
const { auth } = require('../middleware/auth');

// POST /api/diagnostic/save-results  — save test results (requires login)
router.post('/save-results', auth, async (req, res) => {
  try {
    const {
      totalScore,
      physicsScore,
      chemistryScore,
      mathScore,
      weakTopicsPhysics = [],
      weakTopicsChemistry = [],
      weakTopicsMath = [],
      timeSpent,
      questionsAttempted,
      correctAnswers,
    } = req.body;

    if (totalScore === undefined || questionsAttempted === undefined) {
      return res.status(400).json({ error: 'totalScore and questionsAttempted are required' });
    }

    const accuracy = questionsAttempted > 0
      ? parseFloat(((correctAnswers / questionsAttempted) * 100).toFixed(2))
      : 0;

    const diagnostic = new Diagnostic({
      userId: req.user._id,
      totalScore,
      physicsScore,
      chemistryScore,
      mathScore,
      weakTopicsPhysics,
      weakTopicsChemistry,
      weakTopicsMath,
      timeSpent,
      questionsAttempted,
      correctAnswers,
      accuracy,
    });
    await diagnostic.save();

    // Update user record
    await User.findByIdAndUpdate(req.user._id, {
      diagnosticTaken: true,
      diagnosticScore: totalScore,
      weakTopics: [
        ...weakTopicsPhysics.map((topic) => ({ subject: 'Physics', topic, confidence: 0.7 })),
        ...weakTopicsChemistry.map((topic) => ({ subject: 'Chemistry', topic, confidence: 0.7 })),
        ...weakTopicsMath.map((topic) => ({ subject: 'Math', topic, confidence: 0.7 })),
      ],
    });

    // Send results email (non-blocking)
    sendEmail(
      req.user.email,
      emailTemplates.diagnosticResults(
        req.user.name,
        [...weakTopicsPhysics, ...weakTopicsChemistry, ...weakTopicsMath],
        totalScore
      )
    );

    res.json({ success: true, message: 'Diagnostic results saved', diagnostic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/diagnostic/results  — fetch latest diagnostic result
router.get('/results', auth, async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findOne({ userId: req.user._id }).sort({ testDate: -1 });

    if (!diagnostic) {
      return res.status(404).json({ error: 'No diagnostic results found. Please take the test first.' });
    }

    res.json({ success: true, diagnostic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/diagnostic/history  — all past diagnostics for a user
router.get('/history', auth, async (req, res) => {
  try {
    const diagnostics = await Diagnostic.find({ userId: req.user._id }).sort({ testDate: -1 });
    res.json({ success: true, count: diagnostics.length, diagnostics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;