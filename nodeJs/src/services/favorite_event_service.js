const User = require('../models/user')
const Favorite_Event = require('../models/favorite_event')
const Joined_Event = require('../models/joined_event')
const Event = require('../models/event');

const favoriteEventService = async (req, res, next) => {
    var user = await User.findById(req.user.userId);
    var event = await Event.findById(req.body.eventId)
    var favoriteByEvent = await Favorite_Event.find({
        user: user,
        event: event
    })
    //bir kere favorilesin
    if (favoriteByEvent.length == 0) {
        const favorite_event = new Favorite_Event({
            event: event,
            user: user
        })
        await favorite_event.save();
        return true
    } else {
        return false
    }
}

const getByUserIdFavoriteEventService = async (req, res, next) => {

    var userData = await User.findById(req.user.userId);
    var getUserFavoriteEvent = await Favorite_Event.find({ user: userData }).lean();
    let dataAll = await Promise.all(getUserFavoriteEvent.map(async (data) => {
        let res = {
            ...data,

            joinedCount: await Joined_Event.find({
                event: data.event
            }).count(),

            favoriteCount: await Favorite_Event.find({
                event: data.event
            }).count()
        };
        return res
    }));
    return dataAll;
}

const deleteFavoriteEventService = async (req, res, next) => {

    var userData = await User.findById(req.user.userId);
    var eventData = await Event.findById(req.params.id);
    await Favorite_Event.find({ user: userData, event: eventData }).update({ isDeleted: true })
}

module.exports = {
    favoriteEventService, getByUserIdFavoriteEventService, deleteFavoriteEventService
}
