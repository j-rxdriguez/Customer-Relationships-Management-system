const express = require('express');
const router = express.Router();

// GET reports page
router.get('admin/customers', async function(req, res, next){
  res.render('report', { title: 'Reports' }); 
});

// POST reports
router.post('/', async function (req, res, next){
  // Your reports submission logic here
});

module.exports = router;
