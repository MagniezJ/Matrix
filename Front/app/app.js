const express = require('express');
const app = express();
const UsersRoutes = require('../route/route')
/* const CoursesRoutes = require('./routes/Courses_routes') */
const bodyParser = require('body-parser')

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('views'));
app.use('/',UsersRoutes)
app.set("json spaces",2)


module.exports = app;