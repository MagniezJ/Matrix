const Url="http://localhost:3002/modifmdp"
const web=window.location.pathname;
const tab=web.split("/");
console.log(tab)
console.log(tab[2])
const ide=tab[2];
const btn=document.getElementById('btnmod');
btn.addEventListener('click',()=>{
const id={
    id:ide,
    password:document.getElementById('pass').value
};

const idstring=JSON.stringify(id);

const config = { //configuration fetch
    method: 'POST', //envoyer
    headers: {  //autorisation
      "Accept": "application/json", //j'accepte de recevoir du json
      "Content-Type": "application/json", //j'envoie du json
      "Access-Control-Allow-Origin":"http://localhost:3002/modifmdp", //j autorise a aller sur mon back(url)
    },
    body: idstring// j'envoie dans le back body ==req.body
} 

fetch(Url,config) //instanciation de la fetch
.then(response=>response.json().then(json => {
    console.log(json)
}))
})