const fs = require("fs");

const productModel = require('./productModel');
const cloudinary = require('../dal/cloudinary');
const { fields } = require('../dal/multer');

module.exports.listAllProduct = async() => {
    return await productModel.find({});
};

module.exports.addANewProduct = async(product, cloud) => {



    const newProduct = new productModel({
        code: product.code,
        name: product.name,
        images: cloud.avatar,
        category: product.category,
        producer: product.producer,
        price: product.price,
        oldPrice: product.oldPrice,
        cloudinary_id: cloud.cloudId,
    });
    console.log(newProduct);
    newProduct.save();

};

module.exports.findProductbyID = async(id) => {
    return await productModel.findById(id);
}

module.exports.editProductbyId = async(id, newProduct) => {
    await productModel.findById(id)
        .then(products => {

            products.code = newProduct.code;
            products.name = newProduct.name;
            products.producer = newProduct.producer;
            products.category = newProduct.category;
            products.price = newProduct.price;
            products.oldPrice = newProduct.oldPrice;

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