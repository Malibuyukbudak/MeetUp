const mongoose = require('mongoose');

const favoriteEventSchema = new mongoose.Schema({

    event: {
        type: Object,
        required: true,
        ref: 'event'
    },
    user: {
        type: Object,
        required: true,
        ref: 'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

favoriteEventSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

favoriteEventSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const favorite_event = mongoose.model('Favorite_Event', favoriteEventSchema);

module.exports = favorite_event;