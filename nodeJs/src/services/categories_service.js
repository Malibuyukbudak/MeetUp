const Categories = require('../models/categories');

const getAllCategoriesService = async (req, res, next) => {
    return await Categories.find();
}

module.exports = {
    getAllCategoriesService
}