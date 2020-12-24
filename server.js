

const express = require('express');
const path = require('path')
const app = express();
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const PORT = 5000;
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const session = require('express-session');
const errorHandler = require('./middleware/error');





// * Moment JS
app.locals.moment = require('moment')

// * Express Session

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig))

// * Set Global Variabel
app.use((req, res, next) => {
    res.locals.currentUser = req.session.username;
    next();
})


app.use(express.static(path.join(__dirname, 'public')))
mongoose.set('useFindAndModify', false);//supaya ga error untuk findByidAndUpdate nya

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(methodOverride("_method"))
app.set("view engine", "ejs")


// * connect to database
connectDB();



// * Mount Router
const blogsRouter = require('./router/index');
app.use('/blogs' , blogsRouter)

const authRouter = require('./router/auth');
app.use('/' , authRouter)

// ** important to use this below router
app.use(errorHandler)


// ** 404 not found page
app.all('*', (req, res, next) => {
    res.status('404').render('404')
})

app.listen(
    PORT, console.log(`server runnin on ${PORT}`)
)
