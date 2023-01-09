const express = require("express")

const event = require("./event_routes")
const favoriteEvent = require("./favorite_event_routes")
const user = require("./user_routes")
const joinedEvent = require("./joined_event_routes")
const categories = require("./categories_routes")


const EventService = require("../services/event_service")
const FavoriteEventService = require("../services/favorite_event_service")
const JoinedEventService = require("../services/joined_event_service")
const UserService = require("../services/user_service")
const CategoriesService = require("../services/categories_service")


const ioc = require('../middlewares/ioc_middleware')
const { authorize } = require("../middlewares/auth")


const router = express.Router();
router.use(ioc(UserService), user);
router.use(ioc(EventService), event);
router.use(ioc(FavoriteEventService), favoriteEvent);
router.use(authorize, ioc(JoinedEventService), joinedEvent)
router.use(authorize, ioc(CategoriesService), categories)

module.exports = router;
