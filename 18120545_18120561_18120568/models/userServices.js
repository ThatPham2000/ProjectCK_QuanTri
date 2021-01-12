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

module.exports.getUserbyID = async(id) => {
    return await userModel.findById(id);
}
module.exports.getUserbyEmail = async(email) => {
    return await userModel.findOne({ 'email': email });
}

module.exports.editUserbyId = async(id, newUser) => {
    if (newUser.email !== undefined) {
        await userModel.findById(id)
            .then(user => {
                user.name = newUser.name;
                user.address = newUser.address;
                user.email = newUser.email;
                user.phone = newUser.phone;
                user.roles = newUser.roles;

                user.save();
            })
    }
}