var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', {title: 'TechShop', subtitle: 'TechShop'});
});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {title: 'TechShop', subtitle: 'TechShop'});
});

module.exports = router;
