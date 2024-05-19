const express = require('express');
const router = express.Router();
const passport = require('passport');

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
    const { companyName, companyAddress, companyType } = req.body;

    if (!companyName || !companyAddress || !companyType) {
      req.flash('error_msg', 'Please provide all required fields');
      return res.redirect('/admin/register');
    }

    // Saves company data to the database
    const newCompany = new Company({
      name: companyName,
      address: companyAddress,
      type: companyType
    });
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

// Admin logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
