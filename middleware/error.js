const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  
  //* Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    err = new ErrorResponse(message, 404);
  }

  //* Mongoose duplicate key
  //* this will invoke when user create post  that have duplicate field
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    err = new ErrorResponse(message, 400);
  }

  // *Mongoose validation error
  //* this will invoke when user create post 
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    err = new ErrorResponse(message, 400);
  }

  res.status(err.statusCode || 500).send(err.message)

  //* Log to console for dev
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  console.log(err);
};

module.exports = errorHandler;