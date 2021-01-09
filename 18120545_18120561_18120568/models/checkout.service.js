const Checkout = require("./checkout.model");



module.exports.saveNewCheckout = async(checkoutOfuser) => {

    const checkout = new Checkout(checkoutOfuser);

    return await checkout.save();
}

module.exports.find1checkout = async(userId) => {


    return await Checkout.find({ userId: userId });
}


module.exports.findCheckoutByID = async(_id) => {

    return await Checkout.findById(_id);
}

module.exports.findCheckoutBystatus = async(status) => {
    return await Checkout.find({ 'status': status });
}

module.exports.ChangeStatus = async(id, status) => {
    await Checkout.updateOne({ '_id': id }, { 'status': status });
}