const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: [true, 'Please Add Title'],
        },
        image: {
            type: String,
            required: [true, 'Please Add Image'],
        },
        headline: {
            type: String,
            required: [true, 'Please Add Headline'],
        },
        description: {
            type: String,
            required: [true, 'Please Add Description'],
        },
        createdAt: {
            type: Date,
            default: Date.now
          }
    }
)

module.exports = mongoose.model('Blogs', BlogsSchema)