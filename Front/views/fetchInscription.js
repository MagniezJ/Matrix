const Url="http://localhost:3002/New";

const btn=document.getElementById('btnins');
btn.addEventListener('click',()=>{
    console.log('OK')
    const User={
        email: document.getElementById('login').value,
        Password:document.getElementById('password').value,
        Nom:document.getElementById('name').value,
        Prenom:document.getElementById('prenom').value
    };
    const UserJson=JSON.stringify(User);
console.log(UserJson)
    const config = { //configuration fetch
        method: 'POST', //envoyer
        headers: {  //autorisation
          "Accept": "application/json", //j'accepte de recevoir du json
          "Content-Type": "application/json", //j'envoie du json
          "Access-Control-Allow-Origin":"http://localhost:3002/New", //j autorise a aller sur mon back
        },
        body: UserJson// j'envoie dans le back body ==req.body
    } 
    
  fetch(Url,config)
    .then(response=>response.json().then(json => {
        if (response == 404){
           console;log('error')}
            else{
              console.log(json)
              document.location.href="/"
            }
          
    }) ) 
})


window.addEventListener("keydown", (eve)=> {//evenement A  la touche entrer
    
      if (eve.key=="Enter" ){
        console.log('OK')
        const User={
            email: document.getElementById('login').value,
            Password:document.getElementById('password').value,
            Nom:document.getElementById('name').value,
            Prenom:document.getElementById('prenom').value
        };
        const UserJson=JSON.stringify(User);
    console.log(UserJson)
        const config = { //configuration fetch
            method: 'POST', //envoyer
            headers: {  //autorisation
              "Accept": "application/json", //j'accepte de recevoir du json
              "Content-Type": "application/json", //j'envoie du json
              "Access-Control-Allow-Origin":"http://localhost:3002/New", //j autorise a aller sur mon back
            },
            body: UserJson// j'envoie dans le back body ==req.body
        } 
        
      fetch(Url,config)
        .then(response=>response.json().then(json => {
            if (response == 404){
               console;log('error')}
                else{
                  console.log(json)
                  document.location.href="/"
                }
              
        }) ) 
      }
    })