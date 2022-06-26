const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')

router.get('/', (req, res) => {
    res.send('Auth GET')
})

router.post('/register', async (req, res) => {  //async - route needs to wait till data is saved in DB

    // User input validation
    const { error } = registerValidation(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // Check if Username exists
    const userExist = await User.findOne({ username: req.body.username })

    if (userExist) {
        return res.status(400).send('Username already exists.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    const user = new User({
        username: req.body.username,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save() //await - returns a promise to the async to continue the execution of the route
        return res.status(200).send({ "message": "User registered successfully", "username": savedUser.username, "userId": savedUser._id })
    } catch (error) {
        return res.status(400).send({ status: "Failed", msg: error })
    }
})

router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // Check if User Exists
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
        return res.status(400).send('Username not found.')
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(400).send('Invalid password.')
    }

    if (user && validPassword) {
        //Create token for the user
        const token = JWT.sign({_id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)
        // res.header('auth-token', token).send(token)
        return res.status(200).send({ "message": "User login successful.", "token": token })
    }
})

module.exports = router