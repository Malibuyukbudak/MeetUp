const express = require('express');
const { createEvent, getAllEvent, updateEvent, deleteEvent, getEvent, getByUserIdEvent, numberOfJoinEvent } = require('../controllers/event_controller');
const { authorize } = require('../middlewares/auth');
const router = express.Router();

router.post('/Event', authorize, createEvent);
router.get('/Event', getAllEvent);
router.put('/Event/:id', authorize, updateEvent);
router.delete('/Event/:id', authorize, deleteEvent);
router.get('/Event/:id', authorize, getEvent);
router.get('/Event/user/data', authorize, getByUserIdEvent);
router.get('/Event/Joined/Count/:id', numberOfJoinEvent);
module.exports = router

