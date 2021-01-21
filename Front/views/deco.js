const btndeco = document.getElementById('deco');

btndeco.addEventListener('click',()=>{ //au click 
    localStorage.removeItem('Token') //je supprime le token du localstorage
    document.location.href='/'; //redirection
})