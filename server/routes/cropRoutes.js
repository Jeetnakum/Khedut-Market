const express = require('express');
const router = express.Router();
const {
  getCrops, getCropById, createCrop, updateCrop, deleteCrop, uploadCropPhotos
} = require('../controllers/cropController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCrops);
router.get('/:id', getCropById);

// Farmer only
router.post('/', protect, authorize('farmer'), createCrop);
router.put('/:id', protect, authorize('farmer'), updateCrop);
router.delete('/:id', protect, authorize('farmer'), deleteCrop);
router.post('/:id/photos', protect, authorize('farmer'), uploadCropPhotos);

module.exports = router;
