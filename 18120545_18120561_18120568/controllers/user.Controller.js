const userModel = require('../models/userModel');
const userServices = require('../models/userServices');

module.exports.index = async(req, res, next) => {
    const users = await userServices.listAllUsers();
    res.render('users', { title: 'Users', subtitle: 'List users', users });
}

const userPerPage = 12;
module.exports.listUserPagination = async(req, res, next) => {
    const page = +req.query.page || 1;
    const Category = req.query.category;
    const Name = req.query.name;
    const Query = {};
    if (Category) {
        Query.category = Category;
    }
    if (Name) {
        Query.name = Name;
    }
    const pagination = await userServices.listUsersPagination(Query,
        page, userPerPage);
    res.render('users', {
        title: 'Users',
        subtitle: 'List users',
        users: pagination.docs,
        hasNextPage: pagination.hasNextPage,
        hasPrevPage: pagination.hasPrevPage,
        nextPage: pagination.nextPage,
        prevPage: pagination.prevPage,
        lastPage: pagination.totalPages,
        currentPage: pagination.page,

        //index page
        hasPrevPage1: (pagination.page - 2 > 0 ? true : false),
        prevPage1: pagination.page - 2,
        hasPrevPage2: (pagination.page - 1 > 0 ? true : false),
        prevPage2: pagination.page - 1,
        hasNextPage1: (pagination.page + 1 < pagination.totalPages ? true : false),
        nextPage1: pagination.page + 1,
        hasNextPage2: (pagination.page + 2 < pagination.totalPages ? true : false),
        nextPage2: pagination.page + 2,

        //category
        Category: Category,

    })
}

module.exports.detailuser = async(req, res, next) => {
    const id = req.params.id;
    const currentID = req.session.passport.user;
    const checkDifferentID = (id !== currentID)
    const user = await userModel.findById(id);
    res.render('userdetail', {
        _id: id,
        image: user.image,
        roles: user.roles,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isBlock: user.isBlock,
        address: user.address,
        CheckDifferentID: checkDifferentID
    });
}

module.exports.editProfile = async(req, res, next) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.render('editProfile', {
        _id: id,
        image: user.image,
        roles: user.roles,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isBlock: user.isBlock,
        address: user.address,
    });
}

module.exports.editProfilePost = async(req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const user = {
        name: body.name,
        address: body.address,
        email: body.email,
        phone: body.phone,
        roles: body.roles
    }
    await userServices.editUserbyId(id, user);

    await res.redirect(`/users/${id}`);
}

module.exports.lockuser = async(req, res, next) => {
    const id = req.params.id;

    const user = await userModel.findById(id);
    const status = user.isBlock;
    await userModel.updateOne({ _id: id }, { isBlock: !status });

    res.redirect('/users');
}