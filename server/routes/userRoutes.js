const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getUserProfile, updateProfile, getAllUsers, verifyUser } = require('../controllers/userController');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfile);
router.get('/', protect, authorize('admin'), getAllUsers);
router.put('/:id/verify', protect, authorize('admin'), verifyUser);

module.exports = router;
