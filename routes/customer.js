// routes/customer.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = require("../models/Customer");

router.get('/customer-management', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.render('customer-management', { customers });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
