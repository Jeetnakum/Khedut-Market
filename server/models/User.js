const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true },
    role: { type: String, enum: ['farmer', 'trader', 'admin'], default: 'farmer' },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    blueTick: { type: Boolean, default: false },
    profilePhoto: { type: String, default: '' },

    // Location
    state: { type: String, default: 'Gujarat' },
    district: { type: String },
    taluka: { type: String },
    village: { type: String },

    // Farmer specific
    primaryCrops: [{ type: String }],
    landRecords: {
      totalLand: String,
      cropSeason: String,
      aadharStatus: String,
    },

    // Trader specific
    companyName: { type: String },
    gstNumber: { type: String },
    apmcLicense: { type: String },
    businessType: { type: String },

    // Bank details
    bankAccount: {
      accountNumber: String,
      ifsc: String,
      bankName: String,
      accountType: String,
      upiId: String,
    },

    // Preferences
    language: { type: String, default: 'gujarati' },
    alertChannels: {
      sms: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: true },
    },

    // KYC Documents
    aadhaarNumber: { type: String },
    aadhaarVerified: { type: Boolean, default: false },
    documents: [
      {
        type: { type: String },
        url: String,
        verified: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
