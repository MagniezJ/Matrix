const env = require('dotenv').config();
const User = require('../model/user-model');
const bodyParser = require('body-parser');
const data = require('../data/bd');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

module.exports = {

    Log(req, res) {
        console.log(req.body);
        User.findOne({ //rechercher user par mail
            email: req.body.email
        }).then((user) => {
            if (user !== null) { //si user 
                bcrypt.compare(req.body.Password, user.Password, (function (error, same) { //comparer son mdp 
                    if (same == true) {
                        console.log('good password');
                        const username = user;
                        const People = {
                            User: username
                        };
                        const accessToken = jwt.sign(People, process.env.ACCESS_TOKEN_SECRET);
                        console.log(accessToken);
                        res.json({text:"ok",
                            accessToken: accessToken
                        });
                        /* res.render("profil",{user:user}) */ // JWT dans ce coin ///JWT-> acces utilisateur depuis d'autres fonctions 
                    } else {
                        res.json("mauvais")
                    }
                }))

            } else {
                res.json("not found")
            }
        });
    },
    authenticateToken(req, res,next) {
        const token = req.body.token // token reçu
        if (token == null) { //si vide 
            return res.sendStatus(401) //erreur 401
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { // verif du token avec la clé secrete
            if (err) { //si ya une erreur erreur 403
                res.sendStatus(403)
            }
            req.user = user //variable interne req.user
            console.log(req.user) //back
            next() //va vers getuser
        }) 
    },
    GetUser(req, res) {
        User.findOne({ //chercher un user par email
            email:req.user.User.email // req.user => User => email de l'User
        }).then((user) => {
            res.json(user) // renvoie au front les donnéesde l user
        })
    },
    CreateUser(req, res) { // (reçoit, renvoie)
        console.log(req.body) //on recoit quelque chose dans le bon format
            User.findOne({ // cherche si ya un user avec le meme mail
                email: req.body.email
            }).then((us)=>{ //us= variable de la recherche
                if(us != null){ // si ya un user 
                    console.log(us)
                res.json("L'utilisateur existe déjà");
            } else { //si pas user
                const user = new User({ // creation user avec les données reçues
                    email: req.body.email,
                    Password: req.body.Password,
                    Nom: req.body.Nom,
                    Prenom: req.body.Prenom
                });
                console.log('user saved'); //affiche adans le back
                user.save(); //envoie a la bdd
                res.json("Ok"); //affiche dans front
            }
        })
    }
}