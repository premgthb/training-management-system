const router = require('express').Router()
const verify = require('../routes/verifyToken')
const Subject = require('../models/Subject')
const roleAccess = require('../routes/roleAccess')

router.get('/', async (req, res) => {

    try {
        const subject = await Subject.find()

        if (subject.length) {
            return res.status(200).json({ "message": "Subjects retrieved successfully.", "subjects": subject })
        }

        return res.status(404).json({ "message": "There are no subjects found." })
    } catch (error) {
        res.json({ message: error })
    }
})

router.post('/', roleAccess, async (req, res) => {

    console.log(req.body)

    const subject = new Subject({
        name: req.body.name,
        stream: req.body.stream,
        modified_by: req.user._id
    })

    try {
        const savedSubject = await subject.save()
        return res.status(200).send({ "message": "Subject saved successully." })
    } catch (error) {
        res.json({ message: error })
    }
})

module.exports = router