var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.Controller');

const upload = require("../dal/multer")

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('products', {title: 'Products', subtitle: 'List product'});
// });

router.get('/', productController.listProductPagination);
router.get('/add', productController.add);
router.post('/add', upload.array("image", 100), productController.addProduct);

router.get('/edit/:id', productController.edit);
router.post('/edit/:id', productController.postEdit);


router.get('/delete/:id', productController.remove);
module.exports = router;