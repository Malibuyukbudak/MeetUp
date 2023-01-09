const { ErrorHandler } = require('../utils/error');

const createUser = async (req, res, next) => {
    try {
        let isSuccess = await req.service.createUserService(req, res, next)

        res.json({
            isSuccess: isSuccess,
            message: isSuccess ? "User successfully added" : "Error"

        })
    }
    catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

const loginUser = async (req, res, next) => {
    try {
        var token = await req.service.loginUserService(req, res, next)
        res.json({
            data: token ? {
                accessToken: token
            } : "",
            isSuccess: token ? true : false,
            message: token ? "" : "Username or Wrong password!"
        })
    }
    catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

const getUser = async (req, res, next) => {
    try {
        var data = await req.service.getUserService(req, res, next)
        res.json({
            data: data,
            isSuccess: true
        })
    }
    catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

module.exports = {
    createUser, loginUser, getUser
}