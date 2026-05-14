const express = require('express');
const router = express.Router();
const { getSuggestions, createSuggestion } = require('../controllers/suggestionController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').get(getSuggestions).post(protect, admin, createSuggestion);

module.exports = router;
