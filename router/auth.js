const express = require('express');
const router = express.Router();


// call controllers
const { 
    RenderLogin,
    Login,
    Logout,

} = require('../controllers/auth')

router.route('/login').get(RenderLogin).post(Login)
router.route('/logout').get(Logout)


module.exports = router;