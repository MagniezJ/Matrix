const multer = require("multer"); //appel de multer
const cloudinary = require("cloudinary").v2; //instanciation de cloudinary
const { CloudinaryStorage } = require("multer-storage-cloudinary"); //instanciation de cloudinary stockage
cloudinary.config({ //configuration de cloudinary
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const storage = new CloudinaryStorage({ //creation de la const storage 
  cloudinary: cloudinary,
  folder: "app",
  allowedFormats: ["jpg", "png", "jpeg"],
}); 

exports.uploads = (file, folder) => {  
  return new Promise(resolve => {
      cloudinary.uploader.upload(file, (result) => {
          resolve({
              url: result.url,
              id: result.public_id
          })
      }, {
          resource_type: "auto",
          folder: folder
      })
  })
}
module.exports = cloudinary/* upload */;