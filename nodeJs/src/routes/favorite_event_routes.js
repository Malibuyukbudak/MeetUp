const express = require('express');
const { createFavoriteEvent, getByUserIdFavoriteEvent, deleteFavoriteEvent, isUserFavoriteEvent } = require('../controllers/favorite_event_controller');
const { authorize } = require('../middlewares/auth');
const router = express.Router();

router.post('/Event/favorite', authorize, createFavoriteEvent);
router.get('/Event/user/FavoriteEvent', authorize, getByUserIdFavoriteEvent)
router.delete('/Event/FavoriteEvent/:id', authorize, deleteFavoriteEvent)

module.exports = router

