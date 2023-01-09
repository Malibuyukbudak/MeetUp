const { ErrorHandler } = require('../utils/error');
const User = require('../models/user');
const { encyptHash, decryptHash } = require('../utils/hashing');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config({
    path: ".env",
});

const createUserService = async (req, res, next) => {

    const email = await User.findOne({ email: req.body.email });
    const username = await User.findOne({ user: req.body.username });
    if (email && username) {
        return false;
    }
    const user = new User({
        nameSurname: req.body.nameSurname,
        username: req.body.username,
        email: req.body.email,
        telephone: req.body.telephone,
        password: encyptHash(req.body.password),
    })
    await user.save();
    return true
}

const loginUserService = async (req, res, next) => {

    let userData = await User.findOne({ email: req.body.UsernameOrEmail });
    if (userData == null) {
        userData = await User.findOne({ username: req.body.UsernameOrEmail });
    }
    if (userData != null) {
        if (decryptHash(userData.password) == req.body.Password) {
            const accessToken = generateAccessToken(userData._id, userData.username);
            return accessToken;
        }
    } else {
        return false;
    }
}

const getUserService = async (req, res, next) => {

    return await User.findById(req.user.userId);

}

const generateAccessToken = (userId, username) => {
    return jwt.sign({ userId, username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    createUserService, loginUserService, getUserService
}
