const productServices = require('../models/productServices');
const cloudinary = require('../dal/cloudinary')


module.exports.index = async(req, res, next) => {
    // Get books from model
    const products = await productServices.listAllProduct();
    // Pass data to view to display list of books
    res.render('products', { title: 'Products', subtitle: 'List product', products });
};

module.exports.add = (req, res, next) => {
    res.render('addANewProduct', { title: 'Products', subtitle: 'List product' });
};

module.exports.addProduct = async(req, res, next) => {


    try {
        const { body } = req;


        var avatar = [];
        var cloudId = [];
        console.log(req.files.length);
        for (const file of req.files) {

            console.log(file);
            const ret = await cloudinary.uploadSingleProduct(file.path);
            console.log(ret);

            avatar.push(ret.url);
            cloudId.push(ret.id);

        }

        productServices.addANewProduct(body, { avatar, cloudId });

        res.redirect('/products');
    } catch (err) {
        res.render("error", {
            message: "Fail to add a product"
        })
    }

}

module.exports.edit = async(req, res) => {

    const id = req.params.id;
    const data = await productServices.findProductbyID(id);
    const listAllCategory = [{ name: "PC" }, {
            name: "Laptop"
        },
        {
            name: "Mobile"
        },
        {
            name: "Components"
        },
        {
            name: "Network equipment - Security"
        }
    ];
    const List = listAllCategory.filter(item => item.name !== data.category);

    res.render('editProduct', {
        _id: data._id,
        code: data.code,
        name: data.name,
        producer: data.producer,
        category: data.category,
        listCategoty: List,
        descriptions: data.descriptions,
        price: data.price,
        oldPrice: data.oldPrice,
        details: data.details,
        images: data.images,
        video: data.video
    });

}

module.exports.postEdit = async(req, res) => {

    try {
        const { body } = req;


        var avatar = [];
        var cloudId = [];

        for (const file of req.files) {

            //console.log(file);
            const ret = await cloudinary.uploadSingleProduct(file.path);
            //console.log(ret);

            avatar.push(ret.url);
            cloudId.push(ret.id);

        }

        const newProduct = {
            code: body.code,
            name: body.name,
            producer: body.producer,
            category: body.category,
            price: body.price,
            oldPrice: body.oldPrice,
            images: avatar,
            cloudinary_id: cloudId,
        };
        const id = req.params.id;

        //console.log(id);
        //console.log(newProduct);
        await productServices.editProductbyId(id, newProduct);

        res.redirect('/products');
    } catch (err) {
        res.status(404)
            .send(err);
    }
}


module.exports.remove = async(req, res) => {

    const id = req.params.id;
    console.log(id);
    await productServices.removebyId(id);
    res.redirect('/products')
}

const productPerPage = 12;
module.exports.listProductPagination = async(req, res, next) => {
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
    const pagination = await productServices.listProductPagination(Query,
        page, productPerPage);
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