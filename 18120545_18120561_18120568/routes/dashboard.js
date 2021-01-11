var express = require('express');
var router = express.Router();
const Revenue = require('../controllers/Revenue.Controller');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Authentication = require('../auth');

const initializePassport = require('../passport-config');
const UserService = require('../models/userServices')

initializePassport(passport)

/* GET home page. */
router.get('/', Authentication.checkAuthenticated, function(req, res, next) {
    res.render('dashboard', { title: 'TechShop', subtitle: 'Dashboard' });
});
router.get('/dashboard', Authentication.checkAuthenticated, function(req, res, next) {
    res.render('dashboard', { title: 'TechShop', subtitle: 'Dashboard' });
});
router.get('/activity', Authentication.checkAuthenticated, function(req, res, next) {
    res.render('activity', { title: 'Activity', subtitle: 'Icon' });
});
router.get('/charts', Authentication.checkAuthenticated, function(req, res, next) {
    res.render('charts', { title: 'Charts', subtitle: 'Charts' });
});
router.get('/form', Authentication.checkAuthenticated, function(req, res, next) {
    res.render('form', { title: 'Form', subtitle: 'Form' });
});
router.get('/message', Authentication.checkAuthenticated, function(req, res, next) {
    res.render('message', { title: 'Message', subtitle: 'Message' });
});
router.get('/other-user-listing', Authentication.checkAuthenticated, function(req, res, next) {
    res.render('other-user-listing', { title: 'Form', subtitle: 'Form' });
});

router.get('/task', Authentication.checkAuthenticated, function(req, res, next) {
    res.render('task', { title: 'Form', subtitle: 'Form' });
});
router.get('/ui-button-icon', Authentication.checkAuthenticated, function(req, res, next) {
    res.render('ui-button-icon', { title: 'Form', subtitle: 'Form' });
});
router.get('/ui-typography', Authentication.checkAuthenticated, function(req, res, next) {
    res.render('ui-typography', { title: 'Form', subtitle: 'Form' });
});
router.get('/revenue', Authentication.checkAuthenticated, Revenue.revenue);

router.get('/login', Authentication.checkNotAuthenticated, function(req, res, next) {
    res.render('other-login', { title: 'Login', layout: false });
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
})

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/')
//     }
//     next()
// }

module.exports = router;