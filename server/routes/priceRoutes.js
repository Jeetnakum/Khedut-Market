const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getPrices, getPriceById, addPrice, updatePrice } = require('../controllers/priceController');

router.get('/', getPrices);
router.get('/:id', getPriceById);
router.post('/', protect, authorize('admin'), addPrice);
router.put('/:id', protect, authorize('admin'), updatePrice);

module.exports = router;
