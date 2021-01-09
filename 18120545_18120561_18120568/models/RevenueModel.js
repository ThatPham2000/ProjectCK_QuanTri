const CheckoutModel = require('./checkout.model');
module.exports.revenue = async() => {
    return await CheckoutModel.find();
}