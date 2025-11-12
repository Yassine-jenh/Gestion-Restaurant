const express = require('express');
const route = express.Router();
const { Menu } = require('../models');

// Create a new menu item
route.post('/create', async (req, res) => {
    const { category, name, description,image, price, isAvailable } = req.body;

    try {
        const newMenu = await Menu.create({
            category,
            name,
            description,
            image,
            price,
            isAvailable
        });
        res.status(201).json(newMenu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create menu item.' });
    }
});

// Get all menu items
route.get('/', async (req, res) => {
    try {
        const menu= await Menu.findAll();
        res.status(200).json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve menu items.' });
    }
});

// Get menu items by category
route.get('/category/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const itemsByCategory = await Menu.findAll({
            where: { category }
        });
        res.status(200).json(itemsByCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve menu items by category.' });
    }
});

// Update a menu item by ID
route.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { category, name, description,image, price, isAvailable } = req.body;

    try {
        const menuToUpdate = await Menu.findByPk(id);

        if (!menuToUpdate) {
            return res.status(404).json({ error: 'Menu item not found.' });
        }

        await menuToUpdate.update({
            category,
            name,
            description,
            image,
            price,
            isAvailable
        });
        res.status(200).json(menuToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update menu item.' });
    }
});

// Delete a menu item by ID
route.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const menuToDelete = await Menu.findByPk(id);

        if (!menuToDelete) {
            return res.status(404).json({ error: 'Menu item not found.' });
        }

        await menuToDelete.destroy();
        res.status(200).json({ message: 'Menu item deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete menu item.' });
    }
});

module.exports = route;
