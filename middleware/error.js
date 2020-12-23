const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {

    // mongoose bad objectId
    if (err.name === 'CastError') {
        const message = `not found with id of ${err.value}`
        error = new ErrorResponse(message, 404)
        return next(error)
    }

}

module.exports = errorHandler