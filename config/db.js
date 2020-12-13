const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);//supaya ga error untuk findByidAndUpdate nya

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb://localhost:/newblogs', {
		useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    
    console.log(`MongoDB Connected : ${conn.connection.host}`)
}

module.exports = connectDB;