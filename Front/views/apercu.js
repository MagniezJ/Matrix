const inp=document.getElementById('image'); //recup de file image
const imgp=document.querySelector('.image-preview__image'); //recup de limg vide
const block=document.querySelector('#imagePreview'); //recup div gris

inp.addEventListener('change',()=>{ //event change sur le input file
    const file=document.getElementById('image').files[0]; //recuperation du fichier
    if (file){  //si pas vide
        const reader=new FileReader(); //instanciation du reader
        imgp.style.display="block"; //j affiche l image vide
        
        block.style.display="none"; //j enleve la div grise
        reader.addEventListener('load',()=>{  //quand mon reader est pret
            imgp.setAttribute("src",reader.result); //je met dans mon image l image uploader
        });
        reader.readAsDataURL(file);
    }
})