module.exports = function (req, res, next) {

    const isAdmin = req.user.isAdmin

    if (isAdmin === false ) {
        return res.status(403).json({ "message": "Unauthorized to perform this action."})
    }

    next()
}