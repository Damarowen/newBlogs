const Blogs = require('../models/blogs')


// @desc GET ALL BLOGS
// @route GET /blogs/
// @access Public

exports.AllBlogs = async (req, res, next) => {
    try {

        await Blogs.find({}, function (err, data) {
            if (err) {
                console.error(err)
            } else {
                res.render("./blogs/index", {
                    query: data
                })
            }
        })

    } catch (err) {
        console.error(err)
    }
}



// @desc EDIT BLOG
// @route GET  /blogs/:id/EDIT
// @access PRIVATE

exports.editBlog = async (req, res, next) => {
    try {
        await Blogs.findById(req.params.id, function (err, data) {
            if (err) {
                console.error(err)
            } else {
                res.render("./blogs/edit", {
                    query: data
                })
            }
        })
    } catch (err) {
        console.error(err)
    }
}


// @desc PUT BLOG
// @route PUT /blogs/:id
// @access PRIVATE

exports.updateBlog = async (req, res, next) => {
    try {

        await Blogs.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect('/blogs')
    } catch (err) {
        console.error(err)
    }
}

// @desc DELETE BLOG
// @route DELETE /blogs/:id
// @access PRIVATE

exports.deleteBlog = async (req, res, next) => {
    try {
     await Blogs.findByIdAndDelete(req.params.id)
     console.log("BLOG DELETED")
     res.redirect('/blogs')


    } catch (err) {
        console.error(err)
    }
}