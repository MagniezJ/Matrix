const multer=require('multer');//instanciation module multer
const path=require('path'); //instanciation des path
module.exports=multer({ 
    storage:multer.diskStorage({}), //option de stockage
    fileFilter:(req,file,cb)=>{  //verification si fichieer est un .jpg /.jpeg ou /.png
        let ext=path.extname(file.originalname);
        if(ext!==".jpg" && ext !==".jpeg" && ext !==".png"){
            cb(new Error("File type is not supported"), false); //si pas ok

        }
        cb(null,true) //si ok
        
    }
})