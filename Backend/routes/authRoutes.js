const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP, logoutUser } = require('../controllers/authController');

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/logout', logoutUser);

module.exports = router;
