const productServices = require('../models/productServices');

module.exports.index = async(req, res, next) => {
    // Get books from model
    const products = await productServices.listAllProduct();
    // Pass data to view to display list of books
    res.render('products', { title: 'Products', subtitle: 'List product', products });
};



module.exports.edit = async(req, res) => {

    const id = req.params.id;

    var data = await productServices.findProductbyID(id);

    res.render('edit', {
        _id: data._id,
        name: data.name,
        description: data.description,
        price: data.price
    });

}

module.exports.postEdit = async(req, res) => {

    const { title, description, price } = req.body;
    const id = req.params.id;

    await productServices.editProductbyId(id, req.body);

    res.redirect('/products');
}

module.exports.remove = async(req, res) => {

    const id = req.params.id;

    await productServices.removebyId(id);

}

const productPerPage = 10;
module.exports.listProductPagination = async(req, res, next) => {
    const page = +req.query.page || 1;
    const Category = req.query.category;
    console.log("abc", Category)
    const pagination = await productServices.listProductPagination(Category ? { category: Category } : {}, page, productPerPage);
    res.render('products', {
        title: 'Products',
        subtitle: 'List product',
        products: pagination.docs,
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