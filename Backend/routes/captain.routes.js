const express = require('express');
const routes = express.Router();
const { body } = require('express-validator');
const captainModel = require('../models/captain.model');
const captianController = require('../Controllers/captain.controller');

routes.post('/register',[
    body('fullName.firstName').notEmpty().withMessage('First name is required'),
    body('fullName.lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('vehicles.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicles.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicles.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicles.vehicleType').notEmpty().withMessage('Vehicle type is required'),
    body('vehicles.location').notEmpty().withMessage('Vehicle location is required')
], captianController.registerCaptain);
module.exports = routes;