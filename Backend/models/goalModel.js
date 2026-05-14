const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Goal name is mandatory'],
            maxLength: 100,
        },
        fromDate: {
            type: Date,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        priority: {
            type: Number,
            min: 1,
            max: 10,
            required: true,
        },
        notificationTime: {
            type: String, // '1 hour before', '1 day before', etc.
            default: '1 day before',
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

module.exports = mongoose.model('Goal', goalSchema);
