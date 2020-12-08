const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.uploadSingleProduct = (file) => {
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload(file, {
          folder: "products",
        })
        .then((result) => {
          if (result) {
            resolve({
              url: result.secure_url,
              id: result.public_id,
            });
          }
        });
    });
  };


  module.exports.destroyMultiple = (IDs) => {
    return new Promise((resolve) => {
      cloudinary.api.delete_resources(IDs, (error, result) => {
        resolve(result);
      });
    });
  };