const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const verify = require('./routes/verifyToken')
require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION, () => console.log('Mongo DB Atlas Connected.'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use(bodyParser.json())

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