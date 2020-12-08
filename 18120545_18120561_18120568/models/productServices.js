const productModel = require('./productModel');

module.exports.listAllProduct = async() => {
    return await productModel.find({});
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