const { ErrorHandler, NoDataFound, handleError } = require("../utils/error");


const serverError = (err, req, res, next) => {
  if (err.constructor === ErrorHandler) {
    handleError(err, res);
  }
  else if (err.constructor === NoDataFound) {
    handleError(new ErrorHandler(400, 'Not found'), res);
  }
  else {
    res.sendStatus(500);
  }
};

const pageNotFound = function (req, res, next) {
  next(new ErrorHandler(404, "page not found"));
};

module.exports = {
  serverError, pageNotFound
}