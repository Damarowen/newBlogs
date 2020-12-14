const express = require('express');
const router = express.Router();


// call controllers
const { 
    AllBlogs,
    showBlog,
    newBlog,
    editBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogs')


router.route('/').get(AllBlogs).post(newBlog);
router.route('/:id').get(showBlog).put(updateBlog).delete(deleteBlog);
router.route('/:id/edit').get(editBlog);



module.exports = router;