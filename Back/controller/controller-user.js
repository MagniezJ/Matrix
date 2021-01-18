const env = require('dotenv').config();
const User = require('../models/model-user');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const data = require('../data/bd');
const jwt = require('jsonwebtoken');


module.exports = {
    Log(req, res) {
        User.findOne({
            email: req.body.email
        }).then((user) => {
            if (user !== null) {
                bcrypt.compare(req.body.Password, user.Password, (function (error, same) {
                    if (same == true) {
                        console.log('good password');
                        const username = user;
                        const People = {
                            User: username
                        };
                        const accessToken = jwt.sign(People, process.env.ACCESS_TOKEN_SECRET);
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
        const token = req.body.token
        if (token == null) {
            return res.sendStatus(401)
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.sendStatus(403)
            }
            req.user = user
            console.log(req.user)
            next()
        }) 

    },
    GetUser(req, res) {
        User.findOne({
            email:req.user.User.email
        }).then((user) => {
            res.json(user)
        })
    },
    async CreateUser(req, res) {
        console.log(req.body)
            User.findOne({
                email: req.body.email
            }).then((us)=>{
                if(us != null){
                    console.log(us)
                res.json("L'utilisateur existe déjà");
            } else {
                const user = new User({
                    email: req.body.email,
                    Password: req.body.Password,
                    Nom: req.body.Nom,
                    Prenom: req.body.Prenom,
                    Pseudo: req.body.Pseudo,
                    PhotoProfil: req.body.PhotoProfil,
                    Annonces: req.body.Annonces
                });
                console.log('user saved');
                user.save();
                res.json("Ok");
            }
        })
    }
}