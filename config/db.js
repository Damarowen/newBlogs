const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);//* supaya ga error untuk findByidAndUpdate nya
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env'});
require('dotenv').config()

const dbUrl = 'mongodb://localhost:/newblogs';

const connectDB = async () => {
    const conn = await mongoose.connect(dbUrl, {
		useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    
    console.log(`MongoDB Connected : ${conn.connection.host}`)
}

module.exports = connectDB;