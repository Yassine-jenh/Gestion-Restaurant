const db = require('../models'); // Corrected path to models
const bcrypt = require('bcrypt'); // Corrected import
const Joi = require('joi');
const jwt = require('jsonwebtoken'); // Added missing import

const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

exports.register = (username, email, password) => {
    return new Promise((resolve, reject) => {
        let validation = schema.validate({ username, email, password }); // Corrected schema validation

        if (validation.error) {
            reject(validation.error.details[0].message);
        } else {
            db.User.count({ where: { email: email } }).then(doc => {
                if (doc != 0) {
                    reject("email already exists");
                } else {
                    bcrypt.hash(password, 10).then(hash => { // Corrected hash function
                        db.User.create({
                            username: username,
                            email: email,
                            password: hash,
                            category: 'User' // Default category
                        })
                        .then((response) => resolve(response))
                        .catch((err) => reject(err));
                    }).catch(err => reject(err)); // Added error handling for bcrypt.hash
                }
            }).catch(err => reject(err)); // Added error handling for db.User.count
        }
    });
};

const privatekey = "this is private key lkjsafkdfjeir83ro32lr,43436.45,6.,.,/we32";
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        db.User.findOne({ where: { email: email } }).then(user => {
            if (!user) {
                reject("invalid email or password"); // Corrected status
            } else {
                bcrypt.compare(password, user.password).then(same => { // Corrected compare function
                    if (same) {
                        let token = jwt.sign({ id: user.id, username: user.username, role: user.category }, privatekey, {
                            expiresIn: "1h"
                        });
                        resolve(token);
                    } else {
                        reject("invalid email or password");
                    }
                }).catch(err => reject(err)); // Added error handling for bcrypt.compare
            }
        }).catch(err => reject(err)); // Added error handling for db.User.findOne
    });
};