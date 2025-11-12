const express = require('express')
const route = express.Router()
const db = require('../models') // Corrected path to models
const userController = require('../controllers/userController') // Corrected import path
const { error } = require('console')

// Corrected typo in route definition
route.post('/register', (req, res, next) => {
    userController.register(req.body.username, req.body.email, req.body.password)
        .then(response => res.status(200).send(response))
        .catch(err => res.status(400).json(err))
})

route.post('/login', (req, res, next) => {
    userController.login(req.body.email, req.body.password) // Corrected req.body.email
        .then(token => res.status(200).send(token))
        .catch(err => res.status(400).json({ error: err }))
})

route.get('/user/:id', (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id }, include: [db.Reservation, db.Reclamation] })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send({ error: err.message }))
})

route.get('/users', (req, res, next) => {
    db.User.findAll({ include: [db.Reservation, db.Reclamation] })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send({ error: err.message }))
})

route.patch('/user/:id', (req, res, next) => { // Corrected route path
    db.User.update(req.body, { where: { id: req.params.id } })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send({ error: err.message }))
})

route.delete('/user/:id', (req, res, next) => { // Corrected method name and route path
    db.User.destroy({ where: { id: req.params.id } }) // Corrected destroy method parameters
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send({ error: err.message }))
})

module.exports = route // Added module export