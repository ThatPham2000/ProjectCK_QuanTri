var express = require('express');
var router = express.Router();
const usersController = require('../controllers/user.Controller');
const Authentication = require('../auth');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('users', {title: 'Users', subtitle: 'List users'});
// });
router.get('/', Authentication.checkAuthenticated, usersController.listUserPagination);
router.get('/:id', Authentication.checkAuthenticated, usersController.detailuser);
router.get('/:id/lock', Authentication.checkAuthenticated, usersController.lockuser);
router.get('/editProfile/:id', Authentication.checkAuthenticated, usersController.editProfile)
router.post('/editProfile/:id', Authentication.checkAuthenticated, usersController.editProfilePost)


module.exports = router;