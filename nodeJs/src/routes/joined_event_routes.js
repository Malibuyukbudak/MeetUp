const express = require('express');
const { createJoinEvent, getByUserIdJoinedEvent, deleteJoinedEvent } = require('../controllers/joined_event_controller');
const { authorize } = require('../middlewares/auth');
const router = express.Router();

router.post('/Event/join', createJoinEvent);
router.get('/Event/user/JoinedEvent', getByUserIdJoinedEvent)
router.delete('/Event/JoinedEvent/:id', authorize, deleteJoinedEvent)

module.exports = router

