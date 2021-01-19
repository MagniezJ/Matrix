const multer=require('multer');//instanciation module multer
const path=require('path'); //instanciation des path
module.exports=multer({ 
    storage:multer.diskStorage({}), //option de stockagee
    fileFilter:(req,file,cb)=>{  //verification si fichieer eest un .jpg /.jpeg ou /.png
        let ext=path.extname(file.originalname);
        if(ext!==".jpg" && ext !==".jpeg" && ext !==".png"){
            cb(new Error("File type is not supported"), false); //si pas ok

        }
        cb(null,true) //si ok
        
    }
})