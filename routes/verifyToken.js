const JWT = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).json({ "message": "Unauthenticated." })
    }

    try {
        const verified = JWT.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ "message": "Invalid User" })
    }
}