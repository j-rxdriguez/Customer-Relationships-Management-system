const express = require('express');
const router = express.Router();

// GET products page
router.get('/', function(req, res, next) {
  // Render the products page
  res.render('products', { title: 'Products' });
});

module.exports = router;
