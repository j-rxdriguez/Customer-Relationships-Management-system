// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerID: String,
    firstName: String,
    lastName: String,
    email: String,
});

module.exports = mongoose.model('Customer', customerSchema);
