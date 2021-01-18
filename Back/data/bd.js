const mongoose=require('mongoose');
const env=require('dotenv').config();
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
.once('open',() => console.log("Connexion à MongoDB établie !"))
.on('error',(error) => {
    console.warn('Warning',error);
});

