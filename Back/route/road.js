const {CreateUser,GetUser,Log, authenticateToken,ModifUser,reinit,modifmdp}= require('../controller/controller-user'); //recup fonction utile controller
const express=require('express');
const {route} = require('../app/app'); // recup app
const router=express.Router(); // simplication des route
const cloudinary = require("../image/upload");  
const upload=require('../image/multer')


router.route('/') //route
    .post(Log) //post /get/delete  (fonction controller)
router.route('/profil')
    .post(authenticateToken,GetUser) // middleware fonction faite avant get user
router.route('/New')
    .post(CreateUser)
    router.route('/modification')
    .post(upload.single('image'), ModifUser) 
    router.route('/modifmdp')
    .post(modifmdp)
   
    router.route('/reinitialisation')
    .post(reinit) 
module.exports=router; //PAS OUBLIER EXPORT