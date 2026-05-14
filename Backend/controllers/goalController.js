const Goal = require('../models/goalModel');

// @desc    Get all goals with pagination and search
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const search = req.query.search ? {
        name: {
            $regex: req.query.search,
            $options: 'i',
        },
    } : {};

    const count = await Goal.countDocuments({ user: req.user._id, ...search });
    const goals = await Goal.find({ user: req.user._id, ...search })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    res.json({ goals, page, pages: Math.ceil(count / pageSize), total: count });
};

// @desc    Create a goal
const createGoal = async (req, res) => {
    const { name, fromDate, dueDate, priority, notificationTime } = req.body;
    const goal = await Goal.create({
        user: req.user._id,
        name,
        fromDate,
        dueDate,
        priority,
        notificationTime,
    });
    res.status(201).json(goal);
};

module.exports = { getGoals, createGoal };
