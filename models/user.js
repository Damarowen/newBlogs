//crypto is core module
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'please add password']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


// ecnrpty pass using bcrypt

userSchema.pre('save', async function (next) {
    // below is for forgot password
    //if password not modified
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})


// match user entered pass to hash pass in database

userSchema.methods.matchPassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
}

module.exports = mongoose.model('User', userSchema);