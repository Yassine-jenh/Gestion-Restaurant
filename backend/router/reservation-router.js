const express = require('express');
const route = express.Router();
const reservationController = require('../controllers/reservationController');

// Create a new reservation
route.post('/reservation', (req, res) => reservationController.createReservation(req, res));

// Get all reservations
route.get('/reservations', (req, res) => reservationController.getAllReservations(req, res));

// Get a single reservation by ID
route.get('/reservation/:id', (req, res) => reservationController.getReservationById(req, res));

// Update a reservation by ID
route.put('/reservation/:id', (req, res) => reservationController.updateReservation(req, res));

// Delete a reservation by ID
route.delete('/reservation/:id', (req, res) => reservationController.deleteReservation(req, res));

module.exports = route;