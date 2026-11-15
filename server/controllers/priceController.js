const { ApmcPrice } = require('../models/Market');

exports.getPrices = async (req, res) => {
  try {
    const { commodity, apmc, date, limit = 50 } = req.query;
    let query = {};
    if (commodity) query.commodity = { $regex: commodity, $options: 'i' };
    if (apmc) query.apmc = { $regex: apmc, $options: 'i' };
    if (date) query.date = { $gte: new Date(date) };

    const prices = await ApmcPrice.find(query).sort({ date: -1 }).limit(Number(limit));
    res.json({ success: true, prices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPriceById = async (req, res) => {
  try {
    const price = await ApmcPrice.findById(req.params.id);
    if (!price) return res.status(404).json({ success: false, message: 'Price not found' });
    res.json({ success: true, price });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addPrice = async (req, res) => {
  try {
    const price = await ApmcPrice.create({ ...req.body, updatedBy: req.user._id });
    res.status(201).json({ success: true, price });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updatePrice = async (req, res) => {
  try {
    const price = await ApmcPrice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!price) return res.status(404).json({ success: false, message: 'Price not found' });
    res.json({ success: true, price });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
