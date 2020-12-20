const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer')

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage
})


// call controllers
const { 
    Login,
    AllBlogs,
    showBlog,
    renderNewBlog,
    renderEditBlog,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogs')

router.route('/login').get(Login)
router.route('/').get(AllBlogs).post(upload.single('image'), newBlog);
router.route('/new').get(renderNewBlog);

router.route('/:id').get(showBlog).put(upload.single('image'), updateBlog).delete(deleteBlog);
router.route('/:id/edit').get(renderEditBlog);




module.exports = router;