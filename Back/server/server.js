const http = require("http"); //appel du modul http
const port = process.env.PORT||3002; //definition du port 
const app = require("../app/app"); //appel de l'app
const server = http.createServer(app);//creation du serveur htpp avec fonction de l app

server.listen(port,()=>{ // ecoute du port definit
    console.log("connection serveur") //Affiche si connection ok
});