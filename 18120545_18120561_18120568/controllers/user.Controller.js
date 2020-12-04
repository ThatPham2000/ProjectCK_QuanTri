const userModel = require('../models/userModel');
const userServices = require('../models/userServices');

module.exports.index = async (req, res, next) => {
    const users = await userServices.listAllUsers();
    res.render('users', {title: 'Users', subtitle: 'List users', users});
}


