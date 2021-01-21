const Url="http://localhost:3002/profil"; //url du back utile

const token= localStorage.Token; //recup du token en cours


const User={ //creation d objet user avec token dedans
    token:token  //1ere partie nom de la données reçu en back et 2e la donnée en elle meme
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

fetch(Url,config) //instanciation fetch
.then(response=>response.json().then(json => {
    console.log(json)
    document.getElementById('prenom').innerHTML=json.Prenom; //injection de la donnée dans le front
    document.getElementById('nom').innerHTML=json.Nom;
    document.getElementById('email').innerHTML=json.email;
    document.getElementById('pseudo').innerHTML=json.Pseudo;
    console.log(json.photoprofil);
    if(json.photoprofil !=""){ //si imageinjection
        console.log(json.photoprofil);
        const img=document.getElementById('photoprofil');
        img.setAttribute("src",json.photoprofil);
    }
}))