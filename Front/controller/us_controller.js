
const bodyParser = require('body-parser'); //appel body parser
module.exports = {

    home(req,res){
        res.render('form_connexion') //renvoie le fichier ejs 
    },
    inscription(req,res){
        res.render('form_register')
    },
    profil(req,res){
        res.render('profil_page')
    },
    modif(req,res){
        res.render('form_modif')
    },
    reinit(req,res){
        res.render('Reinit_form')
    }
}