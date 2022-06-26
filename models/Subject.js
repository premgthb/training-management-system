const mongoose = require('mongoose')
const User = require('./User')

const SubjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stream: {
        type: String,
        required: true
    },
    modified_by: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Subjects', SubjectSchema)