const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userAuth = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log('Token:', token);
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const blacklistToken = await userModel.findOne({ token: token });
    if (blacklistToken) {
        return res.status(401).json({ message: 'Access denied. Token is blacklisted.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded._id).select('-password');

        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        next();
    } catch (ex) {
        return res.status(400).json({ message: 'Invalid token' });
    }   
}
