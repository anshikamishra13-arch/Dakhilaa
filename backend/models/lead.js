const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    currentScore: {
      type: Number,
      default: 0,
    },
    targetCollege: {
      type: String,
      trim: true,
    },
    signupSource: {
      type: String,
      default: 'landing-page',
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    conversionStatus: {
      type: String,
      enum: ['pending', 'qualified', 'converted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
