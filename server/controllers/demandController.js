const { Demand } = require('../models/Market');

exports.getDemands = async (req, res) => {
  try {
    const demands = await Demand.find({ isActive: true })
      .populate('trader', 'name companyName district isVerified')
      .sort({ createdAt: -1 });
    res.json({ success: true, demands });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createDemand = async (req, res) => {
  try {
    const demand = await Demand.create({ ...req.body, trader: req.user._id });
    res.status(201).json({ success: true, demand });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateDemand = async (req, res) => {
  try {
    const demand = await Demand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!demand) return res.status(404).json({ success: false, message: 'Demand not found' });
    res.json({ success: true, demand });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteDemand = async (req, res) => {
  try {
    await Demand.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Demand deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
