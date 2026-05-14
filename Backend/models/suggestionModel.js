const mongoose = require('mongoose');

const suggestionSchema = mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        subcategory: {
            type: String,
            required: true,
        },
        heading: {
            type: String,
            required: true,
        },
        subheading: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        isAdminVerified: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Suggestion', suggestionSchema);
