const productServices = require('../models/productServices');
const cloudinary = require('../dal/cloudinary')
const CheckoutService = require('../models/checkout.service');
const productModel = require('../models/productModel');


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

        await productServices.addANewProduct(body, { avatar, cloudId });

        res.redirect('/products');
    } catch (err) {
        console.log(err);
        res.render("error", {
            message: "Fail to add a product",
            status: 500
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

module.exports.top10 = async(req, res) => {
    const product10 = await productServices.getTop10();
    res.render('top10', {
        products: product10
    });
}

module.exports.order = async(req, res) => {
    const productwaiting = await CheckoutService.findCheckoutBystatus('waiting');
    const productTransferring = await CheckoutService.findCheckoutBystatus('transferring');
    const productDelivered = await CheckoutService.findCheckoutBystatus('delivered');
    res.render('manageOrder', {
        products1: productwaiting,
        products2: productTransferring,
        products3: productDelivered
    })
}

module.exports.toTransferring = async(req, res) => {
    const id = req.params.id;
    await CheckoutService.ChangeStatus(id, 'transferring');
    res.redirect('/products/orders');
}
module.exports.toDelivered = async(req, res) => {
    const id = req.params.id;
    await CheckoutService.ChangeStatus(id, 'delivered');
    res.redirect('/products/orders');
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
        const regex = new RegExp(escapeRegex(Name), 'gi');
        Query.name = regex;
        // productModel.find({ name: regex }, function(err, all) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             res.render('products', {
        //                 products: all,
        //                 nothaveName: false
        //             })
        //         }
        //     })

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
            haveName: true,
            Name: Name
        })

        // var options = {
        //     project: '-created', // do not include the `created` property
        //     filter: { likes: { $gt: 1000000 } }, // casts queries based on schema
        //     limit: 100,
        //     language: 'english',
        //     lean: true
        // }
        // res.send('Hello');
        // productModel.textSearch(Name, options, (err, output) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         const inspect = require('util').inspect;
        //         console.log(inspect(output, { depth: null }));
        //         res.send('Hello');
        //     }
        // }
    } else {
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
            haveName: false
        })
    }

}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};