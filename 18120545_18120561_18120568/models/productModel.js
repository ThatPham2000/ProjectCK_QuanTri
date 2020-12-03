const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pathImages: String,
    title: String,
    description: String,
    price: Number,
    Category: String,
    soldQuantity: Number,
    detailImages: Array,
    slugName: String
});

const productModel = mongoose.model('Products', productSchema,'Products');

module.exports = productModel;