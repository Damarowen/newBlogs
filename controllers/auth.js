const User = require('../models/user')
const ErrorResponse = require('../utils/errorResponse');


//* @desc GET LOGIN
//* @route GET /blogs/login
//* @access PRIVATE

exports.RenderLogin = async (req, res, next) => {
    try {
        res.render('./auth/login')
    } catch (err) {
        next(err)
    }
}


//* @desc POST LOGIN
//* @route POST /blogs/login
//* @access PRIVATE

exports.Login = async (req, res, next) => {
    try {
        const {
            name,
            password
        } = req.body;
        const user = await User.findOne({
            name
        })

        //* Validate emil & password
        if (!name || !password) {
            return next(new ErrorResponse('Please provide an name and password', 400));
        }
        if (!user) {
            return next(new ErrorResponse('User Not Found', 401))
        };

        //* PASSING TO REQ.SESSION
        req.session.user_id = user._id
        req.session.username = user.name

        //* Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse('pass tidak sama', 401))
        }

        res.redirect("/blogs")

    } catch (err) {
        next(err)
    }
}

//* @desc GET LOGOUT
//* @route GET /blogs/
//* @access PRIVATE

exports.Logout = async (req, res, next) => {
    try {
        //** destroy session */
        req.session.destroy();
        res.redirect("/blogs")
    } catch (err) {
        next(err)
    }
}