const express = require('express'); //appel d'express
const app = express(); //appel de la fonction express
const UsersRoutes = require('../route/road'); //appel des routes 
const bodyParser = require('body-parser');//appel de body paser ( permet recup des données du body en front)

const cors= require('cors'); //appel de cors
var corsOptions={ // dire qu'on accepte 
  origin:"http://localhost:3020" //URL front
}
app.use(cors(corsOptions)) //utilisation de l option du dessus
//app.use(cors()); 

app.use(function(req, res, next) { //autorisation pour recevoir et envoyer
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });  
  app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
  })
app.use(bodyParser.json()); //instanciation du bodyparser
app.use(bodyParser.urlencoded({ extended: true })); //instanciation 2
app.use('/',UsersRoutes); // utilisation des routes
app.set("json spaces",2) 

module.exports = app; //exportation importante pour communications du back