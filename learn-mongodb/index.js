const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to mongoDB', err));

const courseSchema = new mongoose.Schema({
    name : String,
    author: String,
    tags : [String],
    date : {
        type : Date,
        default : Date.now
    },
    isPublished : Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name : 'Spring Framework',
        author : 'Azzam',
        tags : ['Web Programming', 'Java'],
        isPublished : true
    });    

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
        .find()
        // .or([{author : 'Azzam'},{isPublished : true}])
        // .limit(10)
        // .select({name:1, tags:1})
        // .sort({'name' : -1});
    console.log(courses);
}

// MongoDB query operators
// eq (equal)
// ne (not equal)
// gt
// gte
// lt
// lte
// in
// nin

getCourses();