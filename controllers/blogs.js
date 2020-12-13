const Blogs = require('../models/blogs')


// @desc GET ALL BLOGS
// @route GET /blogs/
// @access Public

exports.AllBlogs = async (req, res, next) => {
    try {
    await Blogs.find()
     } catch (err){
        console.error(err)
     }
}