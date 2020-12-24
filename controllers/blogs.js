const Blogs = require('../models/blogs')
const ErrorResponse = require('../utils/errorResponse');



//* @desc GET ALL BLOGS
//* @route GET /blogs/
//* @access Public

exports.AllBlogs = async (req, res, next) => {
    try {

        //*pagination
        const page = req.query.page;
        const limitPost = 2;
        const startIndex = (page - 1) * limitPost;
        const endIndex = page * limitPost;


        const totalPost = await Blogs.countDocuments();

        const data = await Blogs.find({}).skip(startIndex).limit(limitPost).sort({
            createdAt: "desc"
        })


        res.render("./blogs/index", {
            data,
            totalPost,
            page,
            endIndex
        })

    } catch (err) {
        next(err)
    }
}


//* @desc GET SINGLE BLOG
//* @route GET /blogs/:id
//* @access PUBLIC

exports.showBlog = async (req, res, next) => {
    try {
        const query = await Blogs.findById(req.params.id)
        if (!query) {
            return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404))
        }

        res.render('./blogs/show', {
            query
        })

    } catch (err) {
        next(err)

    }
}


//* @desc render form create blog
//* @access PRIVATE

exports.renderNewBlog = async (req, res, next) => {
    res.render('./blogs/new')
}


//* @desc NEW BLOG
//* @route POST  /blogs/
//* @access PRIVATE

exports.newBlog = async (req, res, next) => {
    try {
        if (req.file) {
            const file = `uploads/${req.file.filename}`
            const blog = new Blogs(req.body)
            blog.image = file
            await blog.save();
            res.redirect('/blogs')
        } else {
            const blog = new Blogs(req.body)
            blog.image = "img/no-image-default.png"
            await blog.save();
            res.redirect('/blogs')
        }
    } catch (err) {
        next(err)
    }

}


//* @desc Render EDIT BLOG
//* @route GET  /blogs/:id/EDIT
//* @access PRIVATE

exports.renderEditBlog = async (req, res, next) => {
    try {
        const query = await Blogs.findById(req.params.id)
        if (!query) {
            return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404))
        }
        await res.render("./blogs/edit", {
            query
        })
    } catch (err) {
        next(err)
    }
}


//* @desc PUT BLOG
//* @route PUT /blogs/:id
//* @access PRIVATE

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
            const blog = await Blogs.findById(req.params.id);
            const {
                title,
                headline,
                description
            } = req.body
            blog.title = title
            blog.headline = headline
            blog.description = description
            await blog.save();
            res.redirect('/blogs')
        }

    } catch (err) {
        next(err)
    }
}

//* @desc DELETE BLOG
//* @route DELETE /blogs/:id
//* @access PRIVATE

exports.deleteBlog = async (req, res, next) => {
    try {
        await Blogs.findByIdAndDelete(req.params.id)
        res.redirect('/blogs')
    } catch (err) {
        next(err)
    }
}