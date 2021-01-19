const {home,inscription,profil} = require('../controller/us_controller');

const express=require('express');
const { route } = require('../app/app');
const router=express.Router();


router.route('/')
.get(home)

router.route('/inscription')
.get(inscription)

router.route('/profil')
.get(profil)
    module.exports=router;