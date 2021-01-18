const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email:String,
    Password: String,
    Nom: String,
    Prenom: String
},{collection: "USER_COLLEC"})

UserSchema.pre('save',async function(next){
    try{
        const Salt=await bcrypt.genSalt(10);
        const Hash=await bcrypt.hash(this.Password,Salt);
        this.Password=Hash;
        next();
    }catch(error){
        next(error);
    };
}); 

const User = mongoose.model('user',UserSchema);

module.exports = User;