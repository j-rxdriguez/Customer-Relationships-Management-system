// crudController.js
const mongoose = require('mongoose');

// Generic CRUD functions
exports.getAll = async (req, res) => {
    const modelName = req.params.model;
    try {
        const Model = mongoose.model(modelName);
        const items = await Model.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    const modelName = req.params.model;
    try {
        const Model = mongoose.model(modelName);
        const newItem = new Model(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOne = async (req, res) => {
    const modelName = req.params.model;
    try {
        const Model = mongoose.model(modelName);
        const item = await Model.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: `${modelName} not found` });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    const modelName = req.params.model;
    try {
        const Model = mongoose.model(modelName);
        const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: `${modelName} not found` });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    const modelName = req.params.model;
    try {
        const Model = mongoose.model(modelName);
        const deletedItem = await Model.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: `${modelName} not found` });
        }
        res.json({ message: `${modelName} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
