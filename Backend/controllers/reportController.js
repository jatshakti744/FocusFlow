const Schedule = require('../models/scheduleModel');
const Goal = require('../models/goalModel');

// @desc    Get real-time report data from database
// @route   GET /api/reports
// @access  Private
const getReportData = async (req, res) => {
    try {
        const userId = req.user._id;

        // Tasks (Schedules) Stats
        const totalSchedules = await Schedule.countDocuments({ user: userId });
        const completedSchedules = await Schedule.countDocuments({ user: userId, status: 'Completed' });
        const pendingSchedules = totalSchedules - completedSchedules;

        // Goals Stats
        const totalGoals = await Goal.countDocuments({ user: userId });
        const completedGoals = await Goal.countDocuments({ user: userId, status: 'Completed' });

        // Productivity Score calculation (based on overall completion)
        const totalTasks = totalSchedules + totalGoals;
        const totalCompleted = completedSchedules + completedGoals;
        const productivityScore = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

        // Chart Data (Mocking last 6 days based on current data for visualization)
        const chartData = [
            { name: '10 May', completed: Math.round(completedSchedules * 0.4), pending: Math.round(pendingSchedules * 0.3) },
            { name: '11 May', completed: Math.round(completedSchedules * 0.5), pending: Math.round(pendingSchedules * 0.4) },
            { name: '12 May', completed: Math.round(completedSchedules * 0.7), pending: Math.round(pendingSchedules * 0.6) },
            { name: '13 May', completed: Math.round(completedSchedules * 0.9), pending: Math.round(pendingSchedules * 0.8) },
            { name: '14 May', completed: completedSchedules, pending: pendingSchedules },
        ];

        res.json({
            totalTasks,
            completedTasks: totalCompleted,
            pendingTasks: totalTasks - totalCompleted,
            productivityScore,
            chartData
        });
    } catch (error) {
        res.status(500);
        throw new Error('Failed to fetch report data');
    }
};

module.exports = { getReportData };
