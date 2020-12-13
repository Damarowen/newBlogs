const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = 5000;


// connect to database
connectDB();



app.set("view engine", "ejs")

//router
const blogsRouter = require('./router/index');
app.use('/blogs' , blogsRouter)




app.listen(
    PORT, console.log(`server runnin on ${PORT}`)
)
