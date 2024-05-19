const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); //  User model

// Registration route for customer
router.post('/register', async (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        try {
            const userExists = await User.findOne({ email: email });
            if (userExists) {
                errors.push({ msg: 'Email already exists' });
                return res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name, 
                email, 
                password: hashedPassword
            });
            await newUser.save();
            req.flash('success_msg', 'You are now registered and can log in');
            return res.redirect('/users/login');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
});

module.exports = router;
