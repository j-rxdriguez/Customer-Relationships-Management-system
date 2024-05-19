const express = require('express');
const router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.redirect('/choose-login');
});

// Define the route for /choose-login
router.get('/choose-login', (req, res) => {
  res.render('login', { title: 'CRM' });
});

// GET admin dashboard page
router.get('/admin/register', function(req, res, next) {
  res.render('admin-dashboard', { title: 'Admin Login' });
});

// GET admin login page
router.get('/admin/login', function(req, res, next) {
  res.render('admin-login', { title: 'Admin Login' });
});

// GET customer login page
router.get('/customer/login', function(req, res, next) {
  res.render('customer-login', { title: 'Customer Login' });
});

// GET customer registration page
router.get('/customer/register', function(req, res, next) {
  res.render('customer-register', { title: 'Customer Registration' });
});

// GET products page
router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Products' });
});

// GET reports page
router.get('/reports', async function (req, res, next){
  res.render('reports', { title: 'Reports' });
});

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/choose-login'); // Redirect to the choose-login page after logout
  });
});

module.exports = router;
