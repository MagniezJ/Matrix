const {CreateUser,GetUser,Log, authenticateToken,deleteUser}= require('../controller/controller-user'); //recup fonction utile controller
const express=require('express');
const {route} = require('../app/app'); // recup app
const router=express.Router(); // simplication des route

router.route('/') //route
    .post(Log) //post /get/delete  (fonction controller)
router.route('/profil')
    .post(authenticateToken,GetUser) // middleware fonction faite avant get user
router.route('/New')
    .post(CreateUser)

module.exports=router; //PAS OUBLIER EXPORT