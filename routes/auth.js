const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ensure this path is correct
const Company = require('../models/Company'); // Adjust the path as needed

// Admin registration
router.post('/admin/register', async (req, res) => {
    try {
        const { companyName, companyAddress, companyType } = req.body;

        // Check if all required fields are provided
        if (!companyName || !companyAddress || !companyType) {
            req.flash('error_msg', 'Please provide all required fields');
            return res.redirect('/admin/register');
        }

        // Save company data to the database
        const newCompany = new Company({
            name: companyName,
            address: companyAddress,
            type: companyType
        });
        await newCompany.save();

        req.flash('success_msg', 'Company setup completed successfully');
        res.redirect('/admin/dashboard'); // Redirect to admin dashboard
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error setting up company');
        res.redirect('/admin/register');
    }
});

// Admin login
router.post('/admin/login', (req, res, next) => {
    passport.authenticate('admin-local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);
});

// Customer registration
router.post('/customer/register', async (req, res) => {
    try {
        const { firstName, middleName, surname, email, dob, address, postcode, phone, password } = req.body;
        
        // Check if the email is already registered
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            req.flash('error_msg', 'Email is already registered');
            return res.redirect('/customer/register');
        }

        // Create a new user
        const newUser = new User({
            firstName,
            middleName,
            surname,
            email,
            dob,
            address,
            postcode,
            phone,
            password,
            role: 'customer'
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        newUser.password = hashedPassword;

        // Save the user to the database
        await newUser.save();
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/customer/login'); // Redirect to customer login
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Customer login
router.post('/customer/login', (req, res, next) => {
    passport.authenticate('customer-local', {
        successRedirect: '/customer/dashboard',
        failureRedirect: '/customer/login',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;
