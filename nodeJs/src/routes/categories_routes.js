const express = require('express');
const { getAllCategories } = require("../controllers/categories_controller");
const { authorize } = require("../middlewares/auth");
const router = express.Router();

router.get('/Categories', authorize, getAllCategories);
module.exports = router
