const { ErrorHandler } = require("../utils/error");

const getAllCategories = async (req, res, next) => {
    try {
        var data = await req.service.getAllCategoriesService(req, res, next);
        res.json({
            data: data,
            isSuccess: true,
        })
    } catch (err) {
        next(new ErrorHandler(err.statusCode || 404, err.message));
    }
}

module.exports = {
    getAllCategories
}

