const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { role, isVerified, page = 1, limit = 20 } = req.query;
    let query = {};
    if (role) query.role = role;
    if (isVerified !== undefined) query.isVerified = isVerified === 'true';

    const total = await User.countDocuments(query);
    const users = await User.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, total, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { isVerified, blueTick, isBlocked } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { isVerified, blueTick, isBlocked }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
