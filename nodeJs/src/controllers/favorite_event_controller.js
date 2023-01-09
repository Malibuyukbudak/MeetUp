const { ErrorHandler } = require("../utils/error");

const createFavoriteEvent = async (req, res, next) => {
    try {
        let result = await req.service.favoriteEventService(req, res, next)
        res.json({
            isSuccess: result,
            message: result ? "Event successfully favorites added" : "Already favorite added"
        })
    }
    catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

const getByUserIdFavoriteEvent = async (req, res, next) => {
    try {
        var data = await req.service.getByUserIdFavoriteEventService(req, res, next);
        res.json({
            data: data,
            isSuccess: true
        })
    } catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

const deleteFavoriteEvent = async (req, res, next) => {
    try {
        await req.service.deleteFavoriteEventService(req, res, next);
        res.json({
            isSuccess: true,
            message: "Event successfully favorites deleted"
        })
    } catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

module.exports = {
    createFavoriteEvent, getByUserIdFavoriteEvent, deleteFavoriteEvent
}
