const express = require('express');
const app = express();
const UsersRoutes = require('../route/road'); //routes 
const bodyParser = require('body-parser');

const cors= require('cors');
var corsOptions={
  origin:"http://localhost:3020" //URL front
}
app.use(cors(corsOptions))
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/',UsersRoutes);
app.set("json spaces",2)

module.exports = app;