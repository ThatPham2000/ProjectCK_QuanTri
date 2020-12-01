const productModel = require('../models/productModel');

exports.index = (req, res, next) => {
    // Get books from model
    const shop = productModel.list();
    // Pass data to view to display list of books
    res.render('products', {title: 'Products', subtitle: 'List product', shop});
};