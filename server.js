const express = require('express');
const app = express();
const connectDB = require('./config/db');
const blogsRouter = require('./router/index.');
const PORT = 5000;

// connect to database
connectDB();



app.set("view engine", "ejs")


app.use('/blogs' , blogsRouter)

app.get('/', (req,res) => {
    res.render('index')
})


app.listen(
    PORT, console.log(`server runnin on ${PORT}`)
)
