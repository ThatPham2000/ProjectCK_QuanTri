const fs = require("fs");

const productModel = require('./productModel');
const cloudinary = require('../dal/cloudinary');
const { fields } = require('../dal/multer');
const { db } = require("./productModel");

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

module.exports.getTop10 = async() => {
    // const all = await productModel.find();
    // // const allDecrease = await all.sort((a, b) => {
    // //     parseInt(a.countSale) - parseInt(b.countSale);
    // // });
    // const allDecrease = all.sort(sort_by('countSale', true, parseInt));
    // const top10 = [];
    // for (let i = 0; i < 10; i++) {
    //     top10[i] = allDecrease[i];
    // }

    const all = await productModel.find({}, { 'name': 1, 'countSale': 1 }).sort({ 'countSale': -1 });
    const top10 = [];
    for (let i = 0; i < 10; i++) {
        top10[i] = all[i];
    }
    return top10;
}

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