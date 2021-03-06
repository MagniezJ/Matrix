const env = require('dotenv').config();
const User = require('../model/user-model');
const bodyParser = require('body-parser');
const upload = require('../image/multer');
const cloudinary = require('../image/upload');
const data = require('../data/bd');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
const nodemailer = require("nodemailer");
module.exports = {

    Log(req, res) { // fonction de connexion
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
                    } else {
                        res.json("mauvais")
                    }
                }))

            } else {
                User.findOne({ //rechercher user par pseudo
                    Pseudo: req.body.email
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
                        }))}
        else{
                res.json("not found")
            }
        })
    }
        });
    },
    authenticateToken(req, res,next) { // recherche si user avec bon token
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
    GetUser(req, res) { //cherche info de l user par son token
        User.findOne({ //chercher un user par email
            email:req.user.User.email // req.user => User => email de l'User
        }).then((user) => {
            res.json(user) // renvoie au front les donnéesde l user
        })
    },
    CreateUser(req, res) { // (reçoit, renvoie) fonction de creation d'user (inscription)
        console.log(req.body) //on recoit quelque chose dans le bon format
            User.findOne({ // cherche si ya un user avec le meme mail
                email: req.body.email
            }).then((us)=>{ //us= variable de la recherche
                if(us != null){ // si ya un user 
                    console.log(us)
                res.json("L'utilisateur existe déjà");
            } else { //si pas user
                User.findOne({ // cherche si ya un user avec le meme pseudo
                    Pseudo: req.body.Pseudo
                }).then((us)=>{ //us= variable de la recherche
                    if(us != null){ // si ya un user 
                        console.log(us)
                    res.json("L'utilisateur existe déjà");
                } else { //si pas user
    

                const user = new User({ // creation user avec les données reçues
                    email: req.body.email,
                    Password: req.body.Password,
                    Nom: req.body.Nom,
                    Prenom: req.body.Prenom,
                    Pseudo:req.body.Pseudo,
                    photoprofil:""
                });
                console.log('user saved'); //affiche adans le back
                user.save(); //envoie a la bdd
                res.json("Ok"); //affiche dans front
            }
                })
            }
        })
    },
    async ModifUser(req,res){ //modification de profil &/ou ajout de photo de profil
        
        console.log(req.body);
        if(req.file != null){ //si on a une image 
            const result = await cloudinary.uploader.upload(req.file.path,{
                width: 150,height: 150}); //envoie d image a cloudinary
            User.findOne({email: req.body.email})
            .then((user)=>{ //cherche user
            User.updateOne( //update de l user 
                { email: req.body.email },
                {
                $set: {
                    email: req.body.email,
                    Password: user.Password, // permet de garder le mdp
                    Nom: req.body.Nom,
                    Prenom: req.body.Prenom,
                    photoprofil:result.secure_url //insertion nouvelle photo
                }
                }
            )
                .then((user)=>{
                    console.log(user)
                    res.json('OK')
                })
            })} else{
            User.findOne({email: req.body.email})
            .then((user)=>{
            User.updateOne(
                { email: req.body.email },
                {
                $set: {
                    email: req.body.email,
                    Password: user.Password,//permet garder mdp
                    Nom: req.body.Nom,
                    Prenom: req.body.Prenom,
                    photoprofil:user.photoprofil //permet garder image presente ou non
                }
                }
            )
                .then((user)=>{
                    console.log(user)
                    res.json('OK')
                })
            })
    }
},
    async reinit(req,res){
        
         User.findOne({
            email:req.body.email
        }).then(async (user)=>{
        // create reusable transporter object using the default SMTP transport
        if (user!=null){
            let transporter = nodemailer.createTransport({
                host: "smtp-mail.outlook.com", // hostname
                secureConnection: false, // TLS requires secureConnection to be false
                port: 587, // port for secure SMTP
                tls: {
                    ciphers:'SSLv3'
                },
                auth: {
                    user: 'justinem62@hotmail.fr', // generated ethereal user
                    pass: 'Diego.155', // generated ethereal password
                },
            });
        // send mail with defined transport object
            let info = {
                from: '"Booh! 👻" <justinem62@hotmail.fr>', // sender address
                to: user.email, // list of receivers
                subject: "Reinitialisation de mdp", // Subject line
                text: "Pour réinitialiser votre mot de passe suivre le lien suivant : http://localhost:3020/mdp/"+user._id +"", // plain text body
                html: "<b>Pour réinitialiser votre mot de passe suivre le lien suivant : <a href=http://localhost:3020/mdp/"+user._id +"> Suivre ce lien</a></b>", // html body
            };
            await transporter.sendMail(info,function(error, info){
                if(error){
                    return console.log(error);
                }
        
            console.log('Message sent: ' + info.response);
        })
        
        
      res.send("email envoyé ?")
    }else{
        res.send("not found")
    }
    })
      },
      modifmdp(req,res){
        console.log("wtf dude")
          console.log(req.body)
        User.findOne({_id: req.body.id})
        .then(async (user)=>{
            const Salt=await bcrypt.genSalt(10); //cryptage par 10
            const Hash=await bcrypt.hash(req.body.password,Salt); //crypter le mdp de l user
            const Password=Hash; 
            console.log(Password)
        User.updateOne(
            { _id: req.body.id },
            {
            $set: {
                _id: req.body.id,
                email: user.email,
                Password: Password,//permet mdofier password
                Nom: user.Nom,
                Prenom: user.Prenom,
                photoprofil:user.photoprofil 
            }
            }
        )
            .then((user)=>{
                console.log(user)
                res.json('OK')
            })
      })
    }
}