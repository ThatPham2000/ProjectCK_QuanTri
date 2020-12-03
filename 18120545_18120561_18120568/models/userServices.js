const userModel = require('./userModel');

module.exports.listAllUsers = async () => {
    return await userModel.find();
};