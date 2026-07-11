const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    testDate: {
      type: Date,
      default: Date.now,
    },
    totalScore: { type: Number, default: 0 },
    physicsScore: { type: Number, default: 0 },
    chemistryScore: { type: Number, default: 0 },
    mathScore: { type: Number, default: 0 },
    weakTopicsPhysics: [String],
    weakTopicsChemistry: [String],
    weakTopicsMath: [String],
    timeSpent: { type: Number, default: 0 }, // in seconds
    questionsAttempted: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 }, // percentage
  },
  { timestamps: true }
);

module.exports = mongoose.model('Diagnostic', diagnosticSchema);