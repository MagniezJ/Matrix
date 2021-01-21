const url="http://localhost:3002/modification"; //Url du back utilisé

const btn=document.getElementById('btnmodif');
btn.addEventListener('click',()=>{
        let form = document.getElementById("myForm"); //je recupere mon formulaire
        console.log(form)
        let formData = new FormData(form); //je transforme mon formulaire en formData
        console.log(formData)
        const config = { //config fetch
            method: 'POST', //j envoie des données
            headers: {
            "Access-Control-Allow-Origin":"http://localhost:3002/modification" //j autorise l accès 
        },
        body: formData,// j envoie dans body mon formdata (sur post man je pas oublier de mettre formdata et pas raw)
        }
     fetch(url, config) //instannciation
    .then(response => response.json().then((response)=>{//quand je recois la reponse et que je la json
        if(response=="OK")//res.json("OK") //gestion erreur
        {
            document.location.href="/profil"//redirection
        }
        else{
            console.log(response)
        }
    }) 
    ) })