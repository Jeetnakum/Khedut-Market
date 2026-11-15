const mongoose = require('mongoose');

// APMC Daily Price
const apmcPriceSchema = new mongoose.Schema(
  {
    commodity: { type: String, required: true },
    variety: { type: String },
    apmc: { type: String, required: true },
    district: { type: String },
    date: { type: Date, required: true },
    minPrice: { type: Number },
    maxPrice: { type: Number },
    modalPrice: { type: Number, required: true },
    arrivals: { type: Number }, // in tonnes
    unit: { type: String, default: 'per quintal' },
    trend: { type: String, enum: ['up', 'down', 'stable'] },
    trendPercent: { type: Number },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Demand Post (Trader posts what they want to buy)
const demandSchema = new mongoose.Schema(
  {
    trader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cropType: { type: String, required: true },
    variety: { type: String },
    quantity: { type: Number, required: true },
    targetPricePerQuintal: { type: Number },
    targetLocations: [String],
    paymentType: { type: String, enum: ['Immediate', 'On Delivery', 'Credit'] },
    additionalNotes: { type: String },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

// Saved/Bookmarked Crops (by trader)
const savedCropSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
    priceAtSave: { type: Number },
    alertOnPriceChange: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ApmcPrice = mongoose.model('ApmcPrice', apmcPriceSchema);
const Demand = mongoose.model('Demand', demandSchema);
const SavedCrop = mongoose.model('SavedCrop', savedCropSchema);

module.exports = { ApmcPrice, Demand, SavedCrop };
