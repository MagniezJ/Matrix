
const bodyParser = require('body-parser');
module.exports = {

    home(req,res){
        res.render('form_connexion')
    },
    inscription(req,res){
        res.render('form_register')
    },
    profil(req,res){
        res.render('profil_page')
    }
}