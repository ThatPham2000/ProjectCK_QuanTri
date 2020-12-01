var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.Controller');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('products', {title: 'Products', subtitle: 'List product'});
// });

router.get('/', productController.index);

module.exports = router;
