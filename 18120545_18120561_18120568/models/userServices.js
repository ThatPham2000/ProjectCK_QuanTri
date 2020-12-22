const userModel = require('./userModel');

module.exports.listAllUsers = async() => {
    return await userModel.find();
};

module.exports.listUsersPagination = async(filter, currentPage, usersPerPage) => {
    let list = await userModel.paginate(filter, {
        page: currentPage,
        limit: usersPerPage
    });
    return list;
};