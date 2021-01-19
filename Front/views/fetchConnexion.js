const Url="http://localhost:3002";

const btn=document.getElementById('btncon');
btn.addEventListener('click',()=>{
    console.log('OK')
    const User={
        email: document.getElementById('login').value,
        Password:document.getElementById('password').value
    };
    const UserJson=JSON.stringify(User);
console.log(UserJson)
    const config = { //configuration fetch
        method: 'POST', //envoyer
        headers: {  //autorisation
          "Accept": "application/json", //j'accepte de recevoir du json
          "Content-Type": "application/json", //j'envoie du json
          "Access-Control-Allow-Origin":"http://localhost:3002", //j autorise a aller sur mon back
        },
        body: UserJson// j'envoie dans le back body ==req.body
    } 
    
  fetch(Url,config)
    .then(response=>response.json().then(json => {
        if (json==="mauvais"){ //gestion erreur
            console.log("wrong password")
            document.getElementById("erreur").innerHTML="Erreur Mot de passe"
        }else
        if (json==="not found"){
            console.log("User not found")
            document.getElementById("erreur").innerHTML="User not found"
        }else
        if(json===undefined)
        {console.log('pb')
            document.getElementById("erreur").innerHTML="pb"
        }
          else{
        const token=json.accessToken;
        console.log(token)
        localStorage.setItem("Token",json.accessToken)
        console.log(localStorage.Token)
        document.location.href="/profil"
          }
    }) ) 
})

window.addEventListener("keydown", (eve)=> {//evenement A  la touche entrer
    
    if (eve.key=="Enter" ){
        console.log('OK')
        const User={
            email: document.getElementById('login').value,
            Password:document.getElementById('password').value
        };
        const UserJson=JSON.stringify(User);
    console.log(UserJson)
        const config = { //configuration fetch
            method: 'POST', //envoyer
            headers: {  //autorisation
              "Accept": "application/json", //j'accepte de recevoir du json
              "Content-Type": "application/json", //j'envoie du json
              "Access-Control-Allow-Origin":"http://localhost:3002", //j autorise a aller sur mon back
            },
            body: UserJson// j'envoie dans le back body ==req.body
        } 
        
      fetch(Url,config)
        .then(response=>response.json().then(json => {
            if (json==="mauvais"){ //gestion erreur
                console.log("wrong password")
                document.getElementById("erreur").innerHTML="Erreur Mot de passe"
            }else
            if (json==="not found"){
                console.log("User not found")
                document.getElementById("erreur").innerHTML="User not found"
            }else
            if(json===undefined)
            {console.log('pb')
                document.getElementById("erreur").innerHTML="pb"
            }
              else{
            const token=json.accessToken;
            console.log(token)
            localStorage.setItem("Token",json.accessToken)
            console.log(localStorage.Token)
            document.location.href="/profil"
              }
        }) ) 
    }
})