const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            maxLength: 50,
        },
        time: {
            type: String,
            required: [true, 'Time is mandatory'],
        },
        repeat: {
            type: [String], // ['Monday', 'Tuesday', ...]
            default: [],
        },
        dateRange: {
            from: { type: Date },
            to: { type: Date },
        },
        sound: {
            type: Boolean,
            default: true,
        },
        customSoundPath: {
            type: String,
        },
        tts: {
            type: Boolean,
            default: false,
        },
        notificationReminder: {
            type: Number, // 1, 5, 10, 15 minutes
            default: 10,
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed'],
            default: 'Pending',
        },
        completionTime: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Schedule', scheduleSchema);
