const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../Controllers/user.controller');


router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], userController.registerUser);

module.exports = router;
