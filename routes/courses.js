const router = require('express').Router()
const Course = require('../models/Course')
const roleAccess = require('../routes/roleAccess')

router.get('/', async (req, res) => {
    
    const type = req.query.type

    try {
        if (type) {
            const course = await Course.find({ type: type })

            if (course.length) {
                return res.status(200).json({ "message": "Courses retrieved successfully.", "courses": course})
            }
    
            return res.status(404).json({ "message": "There are no courses found."})
        }

        const course = await Course.find()

        if (course.length) {
            return res.status(200).json({ "message": "Courses retrieved successfully.", "courses": course})
        }

        return res.status(404).json({ "message": "There are no courses found."})
    } catch (error) {
        return res.json({ message: err })
    }
})

router.post('/', roleAccess, async (req, res) => {

    const course = new Course({
        name: req.body.name,
        type: req.body.type,
        subject: req.body.subject,
        modified_by: req.user._id
    })

    try {
        const savedCourse = await course.save()
        return res.status(200).send({ "message": "Course saved successfully."})
    } catch (error) {
        return res.json({ message: error })
    }
})

module.exports = router