const express = require('express'); //appel de express
const app = express(); //appel de la fonction express
const UsersRoutes = require('../route/route')//appel des routes
const bodyParser = require('body-parser') //apel de body parser

app.set('view engine','ejs'); //dire qu'on utilise de l'ejs
app.use(bodyParser.json()); //instanciation de bodyparser
app.use(bodyParser.urlencoded({ extended: true }));  //instanciation 2
app.use(express.static('views')); //definir le dossier public ( qui sera afficher)
app.use('/',UsersRoutes) //utilisation des routes
app.set("json spaces",2)


module.exports = app;