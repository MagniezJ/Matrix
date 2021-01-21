const {home,inscription,profil,modif,reinit,mdp} = require('../controller/us_controller'); //appel des fonctions du controller

const express=require('express');//utilisation d express
const { route } = require('../app/app'); //appel de route de l app
const router=express.Router(); //utilisation du router (+ simple)


router.route('/') //definition de la route
.get(home) //definition du type de fonction ( nom de la fonction)

router.route('/inscription')
.get(inscription)
router.route('/modif')
.get(modif)
router.route('/profil')
.get(profil)
router.route('/reinit')
.get(reinit)
router.route('/mdp/:id')
.get(mdp)
    module.exports=router;