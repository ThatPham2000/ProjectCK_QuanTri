var express = require('express');
var router = express.Router();
const usersController = require('../controllers/user.Controller');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('users', {title: 'Users', subtitle: 'List users'});
// });
router.get('/', usersController.listUserPagination);
router.get('/:id', usersController.detailuser);
router.get('/:id/lock', usersController.lockuser);


module.exports = router;