const { ErrorHandler } = require("../utils/error");

const createJoinEvent = async (req, res, next) => {
    try {
        var result = await req.service.joinedEventService(req, res, next)
        res.json({
            sucesss: result,
            message: result ? "Event successfully join" : "Already added"
        })
    }
    catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));

    }
}

const getByUserIdJoinedEvent = async (req, res, next) => {
    try {
        var data = await req.service.getByUserIdJoinedEventService(req, res, next);
        res.json({
            data: data,
            isSuccess: true
        })
    } catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

const deleteJoinedEvent = async (req, res, next) => {
    try {
        await req.service.deleteJoinEventService(req, res, next);
        res.json({
            isSuccess: true,
            message: "Event successfully favorites deleted"
        })
    } catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}


module.exports = {
    createJoinEvent, getByUserIdJoinedEvent, deleteJoinedEvent
}
