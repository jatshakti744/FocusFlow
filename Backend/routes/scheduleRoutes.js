const express = require('express');
const router = express.Router();
const { getSchedules, createSchedule } = require('../controllers/scheduleController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getSchedules).post(protect, createSchedule);

module.exports = router;
