const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());

// Configuration


if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}

// Routes
app.use('/', home);
app.use('/api/courses/', courses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));  