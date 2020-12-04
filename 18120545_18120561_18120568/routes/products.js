var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.Controller');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('products', {title: 'Products', subtitle: 'List product'});
// });

router.get('/', productController.index);
router.get('/edit/:id', productController.edit);
router.post('/edit/:id', productController.postEdit);
module.exports = router;
