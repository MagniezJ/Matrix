const {home,inscription,profil,modif} = require('../controller/us_controller');

const express=require('express');
const { route } = require('../app/app');
const router=express.Router();


router.route('/')
.get(home)

router.route('/inscription')
.get(inscription)
router.route('/modif')
.get(modif)
router.route('/profil')
.get(profil)
    module.exports=router;