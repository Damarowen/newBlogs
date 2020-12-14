const express = require('express');
const router = express.Router();


// call controllers
const { 
    AllBlogs,
    showBlog,
    renderNewBlog,
    renderEditBlog,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogs')


router.route('/').get(AllBlogs).post(newBlog);
router.route('/new').get(renderNewBlog);

router.route('/:id').get(showBlog).put(updateBlog).delete(deleteBlog);
router.route('/:id/edit').get(renderEditBlog);




module.exports = router;