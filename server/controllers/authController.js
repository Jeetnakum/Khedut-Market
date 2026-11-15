const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map();

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });
};

// @route   POST /api/auth/send-otp
// @desc    Send OTP to mobile number
// @access  Public
exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ success: false, message: 'Mobile number required' });

    const otp = generateOTP();
    // Store OTP with 5 min expiry
    otpStore.set(mobile, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    // TODO: Send via Fast2SMS
    // In development, log OTP
    console.log(`📱 OTP for ${mobile}: ${otp}`);

    /* Production: Fast2SMS integration
    const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
      params: {
        authorization: process.env.FAST2SMS_API_KEY,
        variables_values: otp,
        route: 'otp',
        numbers: mobile,
      }
    });
    */

    res.json({ success: true, message: 'OTP sent successfully', ...(process.env.NODE_ENV === 'development' && { otp }) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and login/check registration
// @access  Public
exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const stored = otpStore.get(mobile);

    if (!stored) return res.status(400).json({ success: false, message: 'OTP not found or expired' });
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(mobile);
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }
    if (stored.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });

    otpStore.delete(mobile);

    // Check if user exists
    const user = await User.findOne({ mobile });
    if (user) {
      // Login
      const token = generateToken(user._id);
      return res.json({ success: true, isNewUser: false, token, user });
    }

    // New user — needs registration
    res.json({ success: true, isNewUser: true, mobile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, mobile, role, district, taluka, village, primaryCrops, companyName } = req.body;

    const existingUser = await User.findOne({ mobile });
    if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

    const user = await User.create({ name, mobile, role, district, taluka, village, primaryCrops, companyName });
    const token = generateToken(user._id);

    res.status(201).json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};
