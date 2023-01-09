const NoDataFound = class extends Error {
  constructor() {
      super('Row not found')
  }
}

const ErrorHandler = class extends Error {
  constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
      status: "error",
      //statusCode,
      message
  });
};

module.exports={
    handleError,ErrorHandler,NoDataFound
}