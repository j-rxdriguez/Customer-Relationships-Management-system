const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Customer = require("../models/Customer");
const Company = require("../models/Company");


// Admin dashboard route
router.get('/dashboard', (req, res) => {
  res.render('admin-dashboard', { title: 'Admin Dashboard' });
});

// Admin registration page
router.get('/register', (req, res) => {
  res.render('admin-register', { title: 'Admin Registration' });
});

// Admin login page
router.get('/login', (req, res) => {
  res.render('admin-login', { title: 'Admin Login' });
});

// Admin registration process
router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    // const { companyName, companyAddress, companyType } = req.body;

    if (!companyName || !companyAddress || !companyType) {
      req.flash('error_msg', 'Please provide all required fields');
      return res.redirect('/admin/register');
    }

    // Saves company data to the database
    const newCompany = new Company(req.body);
    await newCompany.save();

    req.flash('success_msg', 'Company setup completed successfully');
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error setting up company');
    res.redirect('/admin/register');
  }
});

// Admin login process
router.post('/login', (req, res, next) => {
  passport.authenticate('admin-local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
  })(req, res, next);
});


// Add the customers route
router.get('/customers', async (req, res) => {
  const customers = await Customer.find();

  res.render('customers', { title: 'Customers Management', customers: customers });
});

// Add the products route
router.get('/products', (req, res) => {
  res.render('products', { title: 'Products Management' });
});

// Add the search route
router.get('/advanced-search', (req, res) => {
  res.render('advanced-search', { title: 'Products Management' });
});


// Add the orders route
router.get('/orders', (req, res) => {
  res.render('orders', { title: 'Products Management' });
});

// Route to display all customers
router.get('/customers', async (req, res) => {
  try {
      const customers = await Customer.find();
      res.render('admin/customers', { customers });
  } catch (error) {
      res.status(500).send(error.message);
  }
});



// Add the enquiries route
router.get('/enquiries', (req, res) => {
  res.render('enquiry', { title: 'Products Management' });
});


// Admin logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
