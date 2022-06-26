const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const verify = require('./routes/verifyToken')
const multer = require('multer')
const upload = multer()
require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION, () => console.log('Mongo DB Atlas Connected.'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

// Requests using raw JSON
app.use(bodyParser.json())

// Requests Using form-urlencoded requests
app.use(bodyParser.urlencoded({ extended: true }))

// Requests Using form-data in Postman
app.use(upload.array())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('TRAINING MANAGEMENT SYSTEM')
})

// API Routes
const authRoutes = require('./routes/auth')
const subjectRoutes = require('./routes/subjects')
const courseRoutes = require('./routes/courses')
app.use('/api/auth', authRoutes)
app.use('/api/subjects', verify, subjectRoutes)
app.use('/api/courses', verify, courseRoutes)

app.listen(5000, () => {
    console.log('Server running on PORT 5000.')
})