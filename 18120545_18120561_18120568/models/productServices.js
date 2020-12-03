const productModel = require('./productModel');

module.exports.listAllProduct = async() => {
    return await productModel.find({});
};