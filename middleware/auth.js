const ErrorResponse = require('../utils/errorResponse');


//protect routes
// only user login have access
exports.protect = (req, res, next) => {

    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}