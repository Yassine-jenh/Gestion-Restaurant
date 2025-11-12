const express = require('express');
const route = express.Router();
const reclamationController = require('../controllers/reclamationController');

// Middleware to validate required fields
const validateReclamationFields = (req, res, next) => {
    const { firstName, lastName, userId } = req.body;
    if (!firstName || !lastName || !userId) {
        return res.status(400).json({ error: 'First name, last name, and user ID are required' });
    }
    next();
};

// Create a new reclamation
route.post('/reclamation', validateReclamationFields, (req, res) => reclamationController.createReclamation(req, res));

// Get all reclamations
route.get('/reclamations', (req, res) => reclamationController.getAllReclamations(req, res));

// Get a single reclamation by ID
route.get('/reclamation/:id', (req, res) => reclamationController.getReclamationById(req, res));

// Update a reclamation by ID
route.put('/reclamation/:id', validateReclamationFields, (req, res) => reclamationController.updateReclamation(req, res));

// Delete a reclamation by ID
route.delete('/reclamation/:id', (req, res) => reclamationController.deleteReclamation(req, res));

module.exports = route;