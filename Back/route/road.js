
const {CreateUser,GetUser,Log, authenticateToken,deleteUser}= require('../controller/controller-user');
const express=require('express');
const {route} = require('../app/app');
const router=express.Router();

router.route('/')
    .post(Log)
router.route('/profil')
    .post(authenticateToken,GetUser)
router.route('/New')
    .post(CreateUser)

    module.exports=router;