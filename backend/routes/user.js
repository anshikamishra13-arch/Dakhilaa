const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, requirePaidPlan } = require('../middleware/auth');
const { generateDailyQuestions } = require('../utils/helpers');

// GET /api/user/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/user/profile  — update name or currentScore
router.patch('/profile', auth, async (req, res) => {
  try {
    const allowedUpdates = ['name', 'currentScore'];
    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/user/weak-topics
router.get('/weak-topics', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, weakTopics: user.weakTopics || [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/user/daily-practice  — premium only
router.get('/daily-practice', auth, requirePaidPlan, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const questions = generateDailyQuestions(user.weakTopics, 10);
    res.json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/user/daily-practice/submit
router.post('/daily-practice/submit', auth, requirePaidPlan, async (req, res) => {
  try {
    const { questionId, answer, isCorrect, timeSpent } = req.body;

    if (questionId === undefined || answer === undefined) {
      return res.status(400).json({ error: 'questionId and answer are required' });
    }

    // TODO: persist to analytics / progress collection
    res.json({
      success: true,
      message: 'Progress saved',
      result: { questionId, isCorrect: Boolean(isCorrect), timeSpent },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/user/college-predictor
router.get('/college-predictor', auth, async (req, res) => {
  try {
    const colleges = {
      iitb:   { name: 'IIT Bombay',     branches: { cse: 340, ece: 335, me: 320, ce: 310 } },
      iitd:   { name: 'IIT Delhi',      branches: { cse: 320, ece: 315, me: 300, ce: 290 } },
      iitm:   { name: 'IIT Madras',     branches: { cse: 300, ece: 295, me: 280, ce: 270 } },
      iitk:   { name: 'IIT Kanpur',     branches: { cse: 290, ece: 285, me: 270, ce: 260 } },
      iitr:   { name: 'IIT Roorkee',    branches: { cse: 280, ece: 275, me: 260, ce: 250 } },
      iith:   { name: 'IIT Hyderabad',  branches: { cse: 260, ece: 255, me: 240, ce: 230 } },
      iiti:   { name: 'IIT Indore',     branches: { cse: 250, ece: 245, me: 230, ce: 220 } },
      iitbhu: { name: 'IIT BHU',        branches: { cse: 245, ece: 240, me: 225, ce: 215 } },
      iitg:   { name: 'IIT Guwahati',   branches: { cse: 240, ece: 235, me: 220, ce: 210 } },
      iitj:   { name: 'IIT Kharagpur',  branches: { cse: 235, ece: 230, me: 215, ce: 205 } },
      nitt:   { name: 'NIT Trichy',     branches: { cse: 200, ece: 195, me: 180, ce: 170 } },
      nitw:   { name: 'NIT Warangal',   branches: { cse: 185, ece: 180, me: 165, ce: 155 } },
      nitk:   { name: 'NIT Surathkal', branches: { cse: 175, ece: 170, me: 155, ce: 145 } },
      nitc:   { name: 'NIT Calicut',    branches: { cse: 165, ece: 160, me: 145, ce: 135 } },
      nitd:   { name: 'NIT Delhi',      branches: { cse: 170, ece: 165, me: 150, ce: 140 } },
      nitr:   { name: 'NIT Rourkela',   branches: { cse: 160, ece: 155, me: 140, ce: 130 } },
      nitm:   { name: 'NIT Mandi',      branches: { cse: 155, ece: 150, me: 135, ce: 125 } },
      iiith:  { name: 'IIIT Hyderabad', branches: { cse: 190, ece: 185, me: 170, ce: 160 } },
      iiitd:  { name: 'IIIT Delhi',     branches: { cse: 180, ece: 175, me: 160, ce: 150 } },
    };

    // If user has a diagnostic score, predict eligible colleges
    const userScore = req.user.diagnosticScore || 0;
    const eligible = Object.entries(colleges).reduce((acc, [key, college]) => {
      const eligibleBranches = Object.entries(college.branches)
        .filter(([, cutoff]) => userScore >= cutoff * 0.85) // within 15% of cutoff
        .map(([branch]) => branch);
      if (eligibleBranches.length > 0) {
        acc[key] = { ...college, eligibleBranches };
      }
      return acc;
    }, {});

    res.json({ success: true, colleges, eligibleColleges: eligible, userScore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
