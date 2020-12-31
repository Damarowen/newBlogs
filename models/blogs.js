const mongoose = require('mongoose');

//** sanitize with dom purify and markdown html with JSDOM */
const marked = require('marked')
const createDomPurify = require('dompurify');
const {
    JSDOM
} = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window)

const BlogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please Add Title'],
    },
    image: {
        url: String,
        filename: String
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
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

BlogsSchema.pre('validate', function (next) {


    if (this.description) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.description))
    }

    next()
})


module.exports = mongoose.model('Blogs', BlogsSchema)