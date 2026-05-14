const Suggestion = require('../models/suggestionModel');

// @desc    Get all suggestions with pagination and search
// @route   GET /api/suggestions
// @access  Public
const getSuggestions = async (req, res) => {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    
    let search = {};
    if (req.query.search) {
        search = {
            $or: [
                { heading: { $regex: req.query.search, $options: 'i' } },
                { category: { $regex: req.query.search, $options: 'i' } }
            ]
        };
    }

    const count = await Suggestion.countDocuments(search);
    const suggestions = await Suggestion.find(search)
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    res.json({ suggestions, page, pages: Math.ceil(count / pageSize), total: count });
};

// @desc    Create a suggestion (Admin only)
const createSuggestion = async (req, res) => {
    const { category, subcategory, heading, subheading, content } = req.body;
    const suggestion = await Suggestion.create({
        category,
        subcategory,
        heading,
        subheading,
        content,
    });
    res.status(201).json(suggestion);
};

module.exports = { getSuggestions, createSuggestion };
