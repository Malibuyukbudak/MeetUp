const iocMiddleware = (service) => {
    return (req, res, next) => {
        req.service = service
        next();
    }
}

module.exports = iocMiddleware;