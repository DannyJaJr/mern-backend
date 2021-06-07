const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
    name: {
        tyoe: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        minlength: 8
    },
    timesLoggedIn: {
        type: Number,
        default: 0
    }, 
    date: {
        type: date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User
