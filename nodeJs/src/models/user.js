const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nameSurname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


userSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

userSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const User = mongoose.model('User', userSchema);

module.exports = User;