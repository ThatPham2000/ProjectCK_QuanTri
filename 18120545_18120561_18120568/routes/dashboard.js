var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', {title: 'TechShop', subtitle: 'Dashboard'});
});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {title: 'TechShop', subtitle: 'Dashboard'});
});
router.get('/fontawesome', function(req, res, next) {
  res.render('fontawesome', {title: 'Icon', subtitle: 'Icon'});
});
router.get('/blank', function(req, res, next) {
  res.render('blank', {title: 'Blank page', subtitle: 'Blank page'});
});
router.get('/404', function(req, res, next) {
  res.render('404', {title: 'Lỗi trang', subtitle: '404', layout: false});
});
module.exports = router;
