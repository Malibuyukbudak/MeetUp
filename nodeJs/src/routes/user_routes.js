const express = require('express');
const { createUser, loginUser, getUser } = require('../controllers/user_controller');
const { authorize } = require('../middlewares/auth');
const validateRequestSchema = require('../middlewares/validator');
const registerValidation = require('../validator/user_validator');
const router = express.Router();

router.post('/User/Register', registerValidation(), validateRequestSchema, createUser);
router.post('/User/Login', loginUser);
router.get('/User', authorize, getUser)

module.exports = router

