const express = require('express');
const router = express.Router();


// call controllers
const { 
    AllBlogs,
    editBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogs')


router.route('/').get(AllBlogs);
router.route('/:id').put(updateBlog).delete(deleteBlog)
router.route('/:id/edit').get(editBlog)



module.exports = router;