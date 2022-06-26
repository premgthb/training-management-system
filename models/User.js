const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Users', UserSchema)