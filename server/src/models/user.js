const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl: String
})

const User = mongoose.model('User', schema)
module.exports = User