const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../Controllers/user.controller');

const authMiddleware = require('../middleware/auth.middleware');      

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], userController.loginUser);

router.get('/profile', authMiddleware.userAuth, userController.getUserProfile);

router.get('/logout', authMiddleware.userAuth, userController.logoutUser);

module.exports = router;
