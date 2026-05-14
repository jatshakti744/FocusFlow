const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Send OTP to email
// @route   POST /api/auth/send-otp
// @access  Public
const sendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Please provide an email');
    }

    let otp;
    if (process.env.OTP_DEV_MODE === 'true') {
        otp = process.env.DEV_OTP;
    } else {
        otp = Math.floor(100000 + Math.random() * 900000).toString();
    }

    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Find user or create temporary record
    let user = await User.findOne({ email });

    if (user) {
        user.otp = otp;
        user.otpExpire = otpExpire;
        await user.save();
    } else {
        // We create the user only after OTP verification if it's a new user
        // For now, we store OTP in a separate way or just handle it in verification
        // But for simplicity, let's create a placeholder user if name is provided or just handle in verify
    }

    // Store in a way that verification can access (Simpler: just use user model even for pending)
    // Actually, let's just use a dedicated OTP collection if we want to be clean, 
    // but the user wants it simple. I'll use the User model but make name optional initially.
    
    if (!user) {
        // Random name for placeholder
        user = await User.create({
            name: 'User',
            email,
            otp,
            otpExpire,
            referralCode: 'REF' + Math.random().toString(36).substring(7).toUpperCase()
        });
    }

    console.log(`OTP for ${email}: ${otp}`);

    res.status(200).json({
        message: 'OTP sent to email',
        devMode: process.env.OTP_DEV_MODE === 'true'
    });
};

// @desc    Verify OTP and Login/Signup
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({
        email,
        otp,
        otpExpire: { $gt: Date.now() },
    });

    if (user) {
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();

        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            streak: user.streak,
            level: user.level,
        });
    } else {
        res.status(401);
        throw new Error('Invalid or expired OTP');
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    sendOTP,
    verifyOTP,
    logoutUser
};
