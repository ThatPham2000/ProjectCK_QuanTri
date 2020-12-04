const productServices = require('../models/productServices');

module.exports.index = async (req, res, next) => {
    // Get books from model
    const products = await productServices.listAllProduct();
    // Pass data to view to display list of books
    res.render('products', {title: 'Products', subtitle: 'List product', products});
};



module.exports.edit = async(req, res)  =>{

    const id = req.params.id;
    
    var data = await productServices.findProductbyID(id);
    
    res.render('edit', {
        _id : data._id,
        title : data.title, 
        description: data.description, 
        price: data.price
    });

}

module.exports.postEdit = async (req, res)=>{

    const {title, description, price} = req.body;
    const id = req.params.id;
    
    await productServices.editProductbyId(id, req.body);
    
    var data = await productServices.findProductbyID(id);
    res.render('edit', {
        _id : data._id,
        title : data.title, 
        description: data.description, 
        price: data.price
    });
}

