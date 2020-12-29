const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);//* supaya ga error untuk findByidAndUpdate nya


const db = process.env.DATABASE || 'mongodb://localhost:/newblogs';

const connectDB = async () => {
    const conn = await mongoose.connect(db, {
		useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    
    console.log(`MongoDB Connected : ${conn.connection.host}`)
}

module.exports = connectDB;