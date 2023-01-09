const Event = require('../models/event')
const Categories = require('../models/categories');
const User = require('../models/user');
const Favorite_Event = require('../models/favorite_event')
const Joined_Event = require('../models/joined_event')

const createEventService = async (req, res, next) => {
    let user = await User.findById(req.user.userId)
    let category = await Categories.findById(req.body.categoryId);
    const event = new Event({
        title: req.body.title,
        capacity: req.body.capacity,
        city: req.body.city,
        description: req.body.description,
        state: req.body.state,
        image: req.body.image,
        categories: category,
        created: req.body.created,
        user: user
    })
    await event.save();
}

const updateEventService = async (req, res, next) => {

    let category = await Categories.findById(req.body.categoryId);
    let event = await Event.findById(req.params.id);
    await Event.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        capacity: req.body.capacity,
        city: req.body.city,
        description: req.body.description,
        state: req.body.state,
        image: req.body.image,
        categories: category
    });

    let updateEvent = await Event.findById(req.params.id);
    let favoriteEvent = await Favorite_Event.find({ event: event });
    favoriteEvent.forEach(async (fevent) => {
        fevent.event=updateEvent
        await fevent.save();
    })

    let joinedEvent = await Joined_Event.find({ event: event });
    joinedEvent.forEach(async (jevent) => {
        jevent.event=updateEvent
        await jevent.save();
    })
}

const deleteEventService = async (req, res, next) => {

    var event = await Event.findByIdAndUpdate(req.params.id, {
        isDeleted: true
    })

    let favoriteEvent = await Favorite_Event.find({ event: event });
    favoriteEvent.forEach(async (fevent) => {
        fevent.isDeleted = true;
        await fevent.save();
    })

    let joinedEvent = await Joined_Event.find({ event: event });
    joinedEvent.forEach(async (jevent) => {
        jevent.isDeleted = true;
        await jevent.save();
    })
}

const getEventService = async (req, res, next) => {

    var userData = await User.findById(req.user.userId);
    var evenData = await Event.findById(req.params.id)
    var isFavorite = await Favorite_Event.find({ user: userData, event: evenData });
    var isJoined = await Joined_Event.find({ user: userData, event: evenData });

    let getEvent = await Event.findById(req.params.id).lean();

    return {
        ...getEvent,
        isFavorite: isFavorite.length > 0 ? true : false,
        isJoined: isJoined.length > 0 ? true : false,
    };
}

const getAllEventService = async (req, res, next) => {
    let getAllEvent = await Event.find().lean();

    let dataAll = await Promise.all(getAllEvent.map(async (data) => {
        let res = {
            ...data,
            joinedCount: await Joined_Event.find({
                event: data,
                isDeleted: false //global isDeleted burada çalışmıyor
            }).count(),

            favoriteCount: await Favorite_Event.find({
                event: data,
                isDeleted: false //global isDeleted burada çalışmıyor
            }).count()
        };

        return res
    }));
    return dataAll;
}

const getByUserIdEvent = async (req, res, next) => {

    let user = await User.findById(req.user.userId);
    let events = await Event.find({ user: user });
    return events;

}

const numberOfJoinEventService = async (req, res, next) => {
    let event = await Event.findById(req.params.id)
    let joinedCountEvent = await Joined_Event.find({
        event: event
    }).count();
    return joinedCountEvent;
}

module.exports = {
    createEventService, updateEventService, deleteEventService, getEventService, getAllEventService,
    getByUserIdEvent, numberOfJoinEventService
}
