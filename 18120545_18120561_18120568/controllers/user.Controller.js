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