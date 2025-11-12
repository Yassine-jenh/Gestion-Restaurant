const express = require('express');
const route = express.Router();
const { Event } = require('../models');

// Create a new event
route.post('/event', async (req, res) => {
    const { title, description,image, date, time, price, isPublic } = req.body;

    try {
        const newEvent = await Event.create({
            title,
            description,
            image,
            date,
            time,
            price,
            isPublic
        });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create event.' });
    }
});

// Get all events
route.get('/events', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve events.' });
    }
});

// Get a single event by ID
route.get('/event/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve event.' });
    }
});

// Update an event by ID
route.put('/event/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description,image, date, time, price, isPublic } = req.body;

    try {
        const eventToUpdate = await Event.findByPk(id);

        if (!eventToUpdate) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        await eventToUpdate.update({
            title,
            description,
            image,
            date,
            time,
            price,
            isPublic
        });
        res.status(200).json(eventToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update event.' });
    }
});

// Delete an event by ID
route.delete('/event/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const eventToDelete = await Event.findByPk(id);

        if (!eventToDelete) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        await eventToDelete.destroy();
        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete event.' });
    }
});

module.exports = route;
