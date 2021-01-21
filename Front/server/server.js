const http = require("http"); //appel de htpp
const port = process.env.PORT||3020; //definition du port
const app = require("../app/app"); //appel de app

const server = http.createServer(app); //creation serveur http avec parametres de app

server.listen(port,()=>{ //si connexion ok
    console.log("connection serveur")
});