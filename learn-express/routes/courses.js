const express = require('express');
const router = express.Router();

const courses = [
    { id : 1, name: 'courses 1'},
    { id : 2, name: 'courses 2'},
    { id : 3, name: 'courses 3'}
];

router.get('/', (req, res) => {
    res.send(courses);

});

router.post('/', (req, res) => {
    // const schema = Joi.object.keys({
    //     name = Joi.string().min(3).required()
    // });
    // Validate
    const {error} = validateCourse(req.body);

    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course);
    res.send(course);
})

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

router.put('/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found')

    // Validate
    const {error} = validateCourse(req.body);
    
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    // Update the course
    course.name = req.body.name;
    res.send(course);
});

router.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course); 
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const schema ={
        name : Joi.string().min(3).required()
    }
     
    return Joi.validate(course, schema);
}

module.exports = router;