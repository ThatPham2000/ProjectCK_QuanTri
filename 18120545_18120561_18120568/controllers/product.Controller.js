const productServices = require('../models/productServices');

module.exports.index = async (req, res, next) => {
    // Get books from model
    const products = await productServices.listAllProduct();
    // Pass data to view to display list of books
    res.render('products', {title: 'Products', subtitle: 'List product', products});
};