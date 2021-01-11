var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.Controller');
const Authentication = require('../auth');

const upload = require("../dal/multer")

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('products', {title: 'Products', subtitle: 'List product'});
// });

router.get('/', Authentication.checkAuthenticated, productController.listProductPagination);
router.get('/add', Authentication.checkAuthenticated, productController.add);
router.post('/add', upload.array("image", 100), productController.addProduct);

router.get('/edit/:id', Authentication.checkAuthenticated, productController.edit);
router.post('/edit/:id', upload.array("image", 100), productController.postEdit);


router.get('/delete/:id', Authentication.checkAuthenticated, productController.remove);

router.get('/top10', Authentication.checkAuthenticated, productController.top10);

router.get('/orders', Authentication.checkAuthenticated, productController.order);
router.get('/toTransferring/:id', Authentication.checkAuthenticated, productController.toTransferring);
router.get('/toDelivered/:id', Authentication.checkAuthenticated, productController.toDelivered);

module.exports = router;