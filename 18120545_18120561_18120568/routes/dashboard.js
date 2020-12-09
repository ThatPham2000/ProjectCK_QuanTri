var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dashboard', { title: 'TechShop', subtitle: 'Dashboard' });
});
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'TechShop', subtitle: 'Dashboard' });
});
router.get('/activity', function(req, res, next) {
    res.render('activity', { title: 'Activity', subtitle: 'Icon' });
});
router.get('/charts', function(req, res, next) {
    res.render('charts', { title: 'Charts', subtitle: 'Charts' });
});
router.get('/form', function(req, res, next) {
    res.render('form', { title: 'Form', subtitle: 'Form' });
});
router.get('/message', function(req, res, next) {
    res.render('message', { title: 'Form', subtitle: 'Form' });
});
router.get('/other-login', function(req, res, next) {
    res.render('other-login', { title: 'Form', subtitle: 'Form' });
});
router.get('/other-user-listing', function(req, res, next) {
    res.render('other-user-listing', { title: 'Form', subtitle: 'Form' });
});

router.get('/task', function(req, res, next) {
    res.render('task', { title: 'Form', subtitle: 'Form' });
});
router.get('/ui-button-icon', function(req, res, next) {
    res.render('ui-button-icon', { title: 'Form', subtitle: 'Form' });
});
router.get('/ui-typography', function(req, res, next) {
    res.render('ui-typography', { title: 'Form', subtitle: 'Form' });
});

module.exports = router;