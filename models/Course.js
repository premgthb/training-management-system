const mongoose = require('mongoose')
const User = require('./User')

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    subject: {
        type: [String],
        required: true
    },
    modified_by: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    }
},{ timestamps: true })

module.exports = mongoose.model('Courses', CourseSchema)