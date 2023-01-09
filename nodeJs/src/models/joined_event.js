const mongoose = require('mongoose');

const joinedEventSchema = new mongoose.Schema({

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

joinedEventSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

joinedEventSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});


const joined_event = mongoose.model('Joined_Event', joinedEventSchema);

module.exports = joined_event;