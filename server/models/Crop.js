const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema(
  {
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Basic Info
    title: { type: String, required: true },
    variety: { type: String, required: true },
    category: {
      type: String,
      enum: ['Cotton', 'Cumin', 'Groundnut', 'Wheat', 'Sesame', 'Castor', 'Garlic', 'Onion', 'Other'],
      required: true,
    },
    description: { type: String },

    // Quality & Price
    grade: { type: String, enum: ['A (Premium)', 'B (Medium)', 'C (Standard)'] },
    quantity: { type: Number, required: true }, // in quintal
    remainingQuantity: { type: Number },
    minOrderQuantity: { type: Number, default: 1 },
    pricePerQuintal: { type: Number, required: true },
    apmcSuggestedPrice: { type: Number },

    // Quality Details
    moisture: { type: String },
    stapleLength: { type: String },
    ginningPercentage: { type: String },
    oilContent: { type: String },

    // Photos
    photos: [{ type: String }], // Cloudinary URLs

    // Location & Stock
    stockLocation: { type: String },
    district: { type: String },
    taluka: { type: String },
    village: { type: String },
    coordinates: {
      lat: Number,
      lng: Number,
    },

    // Delivery
    loadingAvailable: { type: Boolean, default: false },
    deliveryAvailable: { type: Boolean, default: false },
    deliveryTerms: { type: String },

    // Status
    status: {
      type: String,
      enum: ['Active', 'Paused', 'In Negotiation', 'Sold', 'Draft'],
      default: 'Draft',
    },

    // Stats
    views: { type: Number, default: 0 },
    offersCount: { type: Number, default: 0 },

    // Lab Report
    hasLabReport: { type: Boolean, default: false },
    labReportUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Crop', cropSchema);
