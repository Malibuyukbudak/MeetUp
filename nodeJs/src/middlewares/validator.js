const { validationResult } = require('express-validator')

const validateRequestSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 422,
            message: errors.array().map(err => err.msg)[0]
        });
    }
    next();
};

module.exports = validateRequestSchema;
