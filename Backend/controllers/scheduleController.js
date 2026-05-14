const Schedule = require('../models/scheduleModel');

// @desc    Get all schedules with pagination and search
// @route   GET /api/schedules
// @access  Private
const getSchedules = async (req, res) => {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const search = req.query.search ? {
        name: {
            $regex: req.query.search,
            $options: 'i',
        },
    } : {};

    const count = await Schedule.countDocuments({ user: req.user._id, ...search });
    const schedules = await Schedule.find({ user: req.user._id, ...search })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    res.json({ schedules, page, pages: Math.ceil(count / pageSize), total: count });
};

// @desc    Create a schedule
const createSchedule = async (req, res) => {
    const { name, time, repeat, dateRange, sound, tts, notificationReminder } = req.body;
    const schedule = await Schedule.create({
        user: req.user._id,
        name,
        time,
        repeat,
        dateRange,
        sound,
        tts,
        notificationReminder,
    });
    res.status(201).json(schedule);
};

module.exports = { getSchedules, createSchedule };
