// routes/crud.js
const express = require('express');
const router = express.Router();
const crudController = require('../src/crudController');

// Routes for CRUD operations
router.get('/:model', crudController.getAll);
router.post('/:model', crudController.create);
router.get('/:model/:id', crudController.getOne);
router.put('/:model/:id', crudController.update);
router.delete('/:model/:id', crudController.delete);

module.exports = router;
