const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const categories = mongoose.model('Categories', eventSchema);

module.exports = categories;