const express = require('express');
const path = require('path')
const app = express();
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const PORT = 5000;
const methodOverride = require("method-override")
const bodyParser = require("body-parser");


app.use(express.static(path.join(__dirname, 'public')))

mongoose.set('useFindAndModify', false);//supaya ga error untuk findByidAndUpdate nya

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(methodOverride("_method"))
app.set("view engine", "ejs")

// connect to database
connectDB();



//router
const blogsRouter = require('./router/index');
app.use('/blogs' , blogsRouter)


app.listen(
    PORT, console.log(`server runnin on ${PORT}`)
)
