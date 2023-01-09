const User = require('../models/user')
const Joined_Event = require('../models/joined_event')
const Favorite_Event = require('../models/favorite_event')
const Event = require('../models/event');


const joinedEventService = async (req, res, next) => {

    var user = await User.findById(req.user.userId);
    var event = await Event.findById(req.body.eventId)
    var joinedByEvent = await Joined_Event.find({
        user: user,
        event: event
    })
    //bir kere katılabilsin
    if (joinedByEvent.length == 0) {
        const joined_event = new Joined_Event({
            event: event,
            user: user
        })
        await joined_event.save();
        return true
    } else {
        return false
    }
}

const getByUserIdJoinedEventService = async (req, res, next) => {

    var userData = await User.findById(req.user.userId);
    var getUserJoinedEvent = await Joined_Event.find({ user: userData }).lean();
    let dataAll = await Promise.all(getUserJoinedEvent.map(async (data) => {
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

const deleteJoinEventService = async (req, res, next) => {

    var userData = await User.findById(req.user.userId);
    var eventData = await Event.findById(req.params.id);
    await Joined_Event.find({ user: userData, event: eventData }).update({ isDeleted: true })
}

module.exports = {
    joinedEventService, getByUserIdJoinedEventService, deleteJoinEventService
}
