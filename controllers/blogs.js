const Blogs = require('../models/blogs')
const User = require('../models/user')


// @desc GET LOGIN
// @route GET /blogs/login
// @access PRIVATE

exports.GetLogin = async (req, res, next) => {
    try {
     res.render('./blogs/login')
     console.log(req.session)
    } catch (err) {
        console.error(err)
    }
}


// @desc POST LOGIN
// @route POST /blogs/login
// @access PRIVATE

exports.Login = async (req, res, next) => {
    try {
    const { name,password} = req.body;
    const user = await User.findOne({name})
    req.session.user_id = user._id
    console.log(req.session.user_id)
    // res.redirect("/blogs")
    } catch (err) {
        console.error(err)
    }
}



// @desc GET ALL BLOGS
// @route GET /blogs/
// @access Public

exports.AllBlogs = async (req, res, next) => {
    try {

        await Blogs.find({})
        .sort({ createdAt: "desc"})
        .limit(2)
        .exec(function (err, data) {
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


// @desc GET SINGLE BLOG
// @route GET /blogs/:id
// @access PUBLIC

exports.showBlog = async (req, res, next) => {
    try {
        await Blogs.findById(req.params.id, function (err, data) {
            if (err) {
                console.error(err)
            } else {
                res.render('./blogs/show', {
                    query: data
                })
            }
        })

    } catch (err) {
        console.error(err)
    }
}


// @desc render form create blog
// @access PRIVATE

exports.renderNewBlog = async (req, res, next) => {
    res.render('./blogs/new')
}


// @desc NEW BLOG
// @route POST  /blogs/
// @access PRIVATE

exports.newBlog = async (req, res, next) => {
    try {
        const file = `uploads/${req.file.filename}`
        const blog = new Blogs(req.body)
        blog.image = file
        await blog.save();
        res.redirect('/blogs')
    } catch (err) {
        console.error(err)
    }

}


// @desc Render EDIT BLOG
// @route GET  /blogs/:id/EDIT
// @access PRIVATE

exports.renderEditBlog = async (req, res, next) => {
    try {
        const query = await Blogs.findById(req.params.id)
        await res.render("./blogs/edit", {
            query
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

        if (req.file) {
            const file = `uploads/${req.file.filename}`
            const blog = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            blog.image = file
            await blog.save();
            res.redirect('/blogs')
        } else {
            await Blogs.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            res.redirect('/blogs')
        }


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