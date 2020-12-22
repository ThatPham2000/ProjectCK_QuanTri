const fs = require("fs");

const productModel = require('./productModel');
const cloudinary = require('../dal/cloudinary');
const { fields } = require('../dal/multer');

module.exports.listAllProduct = async() => {
    return await productModel.find({});
};

module.exports.addANewProduct = async(product, files) => {

    const urls = []


    for (const file in files.image) {

        const fileUpload = files.image[file];

        // console.log("o day ne", fileUpload.path)
        if (fileUpload && fileUpload.size > 0) {

            const filepath = fileUpload.path.split('\\').pop() + '.' + fileUpload.name.split('.').pop();

            fs.renameSync(fileUpload.path, __dirname + '/../public/uploads/' + filepath)
            pathHost = __dirname + '/../public/uploads/' + filepath;
            newImage = "/uploads/" + filepath;

            ret = await cloudinary.uploadSingleProduct(pathHost);

            console.log(ret);
            urls.push(ret.url);
        }
    }

    const newProduct = new productModel({
        code: product.code,
        name: product.name,
        images: urls,
        category: product.category,
        producer: product.producer,
        price: product.price,
        oldPrice: product.oldPrice,

    });
    console.log(newProduct);
    newProduct.save();

};

module.exports.findProductbyID = async(id) => {
    return await productModel.findById(id);
}

module.exports.editProductbyId = async(id, newProduct) => {
    productModel.findById(id)
        .then(products => {

            products.title = newProduct.title;
            products.description = newProduct.description;
            products.price = newProduct.price;


            products.save();
        })

}


module.exports.removebyId = async(id) => {
    productModel.findById(id)
        .remove()
        .exec();

}


module.exports.listProductPagination = async(filter, currentPage, productsPerPage) => {
    let list = await productModel.paginate(filter, {
        page: currentPage,
        limit: productsPerPage
    });
    return list;
};