const Url="http://localhost:3002/profil"; //url back

const token= localStorage.Token; //recup token


const User={ //creation objet avec token
    token:token
};
const UserJson=JSON.stringify(User); //conversion en string
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

fetch(Url,config) //instanciation
.then(response=>response.json().then(json => {
    document.getElementById('prenom').value=json.Prenom; //injection des données
    document.getElementById('name').value=json.Nom;
    document.getElementById('login').value=json.email;
    console.log(json.photoprofil);
    
}))