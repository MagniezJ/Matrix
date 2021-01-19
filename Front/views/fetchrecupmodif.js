const Url="http://localhost:3002/profil";

const token= localStorage.Token;


const User={
    token:token
};
const UserJson=JSON.stringify(User);
console.log(UserJson);
const config = { //configuration fetch
    method: 'POST', //envoyer
    headers: {  //autorisation
      "Accept": "application/json", //j'accepte de recevoir du json
      "Content-Type": "application/json", //j'envoie du json
      "Access-Control-Allow-Origin":"http://localhost:3002/profil", //j autorise a aller sur mon back
    },
    body: UserJson// j'envoie dans le back body ==req.body
} ;

fetch(Url,config)
.then(response=>response.json().then(json => {
    console.log(json)
    document.getElementById('prenom').value=json.Prenom;
    document.getElementById('name').value=json.Nom;
    document.getElementById('login').value=json.email;
}))