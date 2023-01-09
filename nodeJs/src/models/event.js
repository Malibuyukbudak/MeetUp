const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: Object,
        required: true,
        ref: 'categories'
    },
    user: {
        type: Object,
        required: true,
        ref: 'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    created: {
        type: String,
        default: false
    }
});

eventSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

eventSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const event = mongoose.model('Event', eventSchema);

module.exports = event;