const Crop = require('../models/Crop');

// @route   GET /api/crops
// @desc    Get all crops (with filters)
// @access  Public
exports.getCrops = async (req, res) => {
  try {
    const { category, grade, district, minPrice, maxPrice, minQty, search, page = 1, limit = 12 } = req.query;

    let query = { status: 'Active' };
    if (category) query.category = category;
    if (grade) query.grade = grade;
    if (district) query.district = district;
    if (minPrice || maxPrice) {
      query.pricePerQuintal = {};
      if (minPrice) query.pricePerQuintal.$gte = Number(minPrice);
      if (maxPrice) query.pricePerQuintal.$lte = Number(maxPrice);
    }
    if (minQty) query.quantity = { $gte: Number(minQty) };
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { variety: { $regex: search, $options: 'i' } },
    ];

    const total = await Crop.countDocuments(query);
    const crops = await Crop.find(query)
      .populate('farmer', 'name district village isVerified blueTick')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), crops });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @route   GET /api/crops/:id
// @access  Public
exports.getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate('farmer', 'name district village mobile isVerified blueTick profilePhoto');
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    // Increment views
    crop.views += 1;
    await crop.save();
    res.json({ success: true, crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @route   POST /api/crops
// @access  Farmer only
exports.createCrop = async (req, res) => {
  try {
    const crop = await Crop.create({ ...req.body, farmer: req.user._id, status: req.body.status || 'Draft' });
    res.status(201).json({ success: true, crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @route   PUT /api/crops/:id
// @access  Farmer only
exports.updateCrop = async (req, res) => {
  try {
    let crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    if (crop.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @route   DELETE /api/crops/:id
// @access  Farmer only
exports.deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    if (crop.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await crop.deleteOne();
    res.json({ success: true, message: 'Crop deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @route   POST /api/crops/:id/photos
// @access  Farmer only
exports.uploadCropPhotos = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(
      req.params.id,
      { $push: { photos: { $each: req.body.photos } } },
      { new: true }
    );
    res.json({ success: true, crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
