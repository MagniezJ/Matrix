const mongoose=require('mongoose'); //appel de mongoose
const env=require('dotenv').config(); //appel de dotenv
mongoose.Promise = global.Promise; //utilisation des promesses mongodb

mongoose.connect(process.env.MONGO_URI,{ //connection a la bdd
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection 
.once('open',() => console.log("Connexion à MongoDB établie !")) //quand bdd connecter faire:
.on('error',(error) => { //sinon afficher warning+error
    console.warn('Warning',error);
});

