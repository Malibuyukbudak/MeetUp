const { ErrorHandler } = require('../utils/error');

const createEvent = async (req, res, next) => {
    try {
        await req.service.createEventService(req, res, next);
        res.json({
            isSuccess: true,
            message: "Event successfully added"
        })
    } catch (err) {
        next(err);
    }
}

const updateEvent = async (req, res, next) => {
    try {
        await req.service.updateEventService(req, res, next);
        res.json({
            isSuccess: true,
            message: "Event successfully updated"
        })
    } catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        await req.service.deleteEventService(req, res, next);
        res.json({
            isSuccess: true,
            message: "Event successfully deleted"
        })
    } catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

const getEvent = async (req, res, next) => {
    try {
        var data = await req.service.getEventService(req, res, next);
        res.json({
            data: data,
            isSuccess: true,
        })
    } catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

const getAllEvent = async (req, res, next) => {
    try {
        var data = await req.service.getAllEventService(req, res, next)
        await res.json({
            data: data,
            isSuccess: true
        })
    }
    catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

const getByUserIdEvent = async (req, res, next) => {
    try {
        var data = await req.service.getByUserIdEvent(req, res, next);
        res.json({
            data: data,
            isSuccess: true,
        })
    } catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

const numberOfJoinEvent = async (req, res, next) => {
    try {
        var data = await req.service.numberOfJoinEventService(req, res, next);
        res.json({
            data: data,
            isSuccess: true,
        })
    } catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

module.exports = {
    createEvent, updateEvent, deleteEvent, getEvent, getAllEvent, getByUserIdEvent, numberOfJoinEvent
}

