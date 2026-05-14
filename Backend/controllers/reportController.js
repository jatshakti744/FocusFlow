// @desc    Get report data
// @route   GET /api/reports
// @access  Private
const getReportData = async (req, res) => {
    // Basic mock response for now
    res.json({
        totalTasks: 20,
        completedTasks: 15,
        pendingTasks: 5,
        productivityScore: 75
    });
};

module.exports = { getReportData };
