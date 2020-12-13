const express = require('express');
const router = express.Router();


// call controllers
const { 
    AllBlogs
} = require('../controllers/blogs')


router.route('/').get(AllBlogs);


module.exports = router;