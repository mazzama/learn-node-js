const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to mongoDB', err));

const courseModel = new mongoose.Schema({
    name : String,
    author : String,
    tags : [String],
    date : {
        type : Date,
        default : Date.now
    },
    isPublished : Boolean,
    price : Number
});

const Course = mongoose.model('Course', courseModel);

async function getCourses(){
    return await Course
        .find({isPublished : true, tags : 'backend'})
        .sort({name : 1})
        .select({name : 1, author : 1});
}

async function getCourses2(){
    return await Course
        .find({isPublished : true, tags : { $in : ['backend', 'frontend']}})
        .sort('-price')
        .select('name author price');
}

async function getCourses3(){
    return await Course
        .find({isPublished : true})
        .or([
            { price : {$gte : 15}},
            { name : /.*by.*/ }
        ])
        .sort('-price')
        .select('name author price');
}

async function run(){
    const courses = await getCourses3();
    console.log(courses);
}

run();