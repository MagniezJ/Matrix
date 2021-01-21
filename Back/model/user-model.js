const mongoose = require('mongoose'); //appel de mongoose
const Schema = mongoose.Schema; //appel des schema mongo db
const bcrypt=require('bcrypt'); //appel de bcrypt

const UserSchema = new Schema({ //creation du schéma user 
    email:String,
    Password: String,
    Nom: String,
    Prenom: String,
    Pseudo:String,
    photoprofil:String
},{collection: "USER_COLLEC"}) //donnée un nom personnalisé

UserSchema.pre('save',async function(next){ //middleware a faire avant chaque sauvegare
    try{ 
        const Salt=await bcrypt.genSalt(10); //cryptage par 10
        const Hash=await bcrypt.hash(this.Password,Salt); //crypter le mdp de l user
        this.Password=Hash; 
        next();
    }catch(error){ 
        next(error);
    };
}); 

const User = mongoose.model('user',UserSchema); //dire que user est un schema mongoose 

module.exports = User;