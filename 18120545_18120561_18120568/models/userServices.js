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

module.exports.getUserAdminbyID = async(id) => {
    const users = await userModel.findById(id);
    if (users.roles === 'Admin') {
        return users;
    } else {
        return null;
    }
}
module.exports.getUserAdminbyEmail = async(email) => {
    const users = await userModel.findOne({ 'email': email });
    if (users.roles === 'Admin') {
        return users;
    } else {
        return null;
    }
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