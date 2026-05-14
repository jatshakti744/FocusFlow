const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        streak: {
            type: Number,
            default: 0,
        },
        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },
        referralCode: {
            type: String,
            unique: true,
        },
        referredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        otp: {
            type: String,
        },
        otpExpire: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Level calculation based on streak
userSchema.pre('save', async function () {
    if (this.streak >= 100) {
        this.level = 'advanced';
    } else if (this.streak >= 50) {
        this.level = 'intermediate';
    } else {
        this.level = 'beginner';
    }
});

module.exports = mongoose.model('User', userSchema);
