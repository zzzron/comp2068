const mongoose = require('mongoose');

// Our schema
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cotent: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PUBLISHED'],
        default: 'DRAFT'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', BlogSchema);