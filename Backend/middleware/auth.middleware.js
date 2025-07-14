const userModel = require('../models/user.model');
const captainModel= require('../models/captain.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.userAuth = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log('Token:', token);
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const blacklistToken = await blacklistTokenModel.findOne({ token: token });
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

module.exports.captainAuth = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }


    const isblacklistToken = await blacklistTokenModel.findOne({ token: token });
    if (isblacklistToken) {
        return res.status(401).json({ message: 'Access denied. Token is blacklisted.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.captain = await captainModel.findById(decoded._id).select('-password');

        if (!req.captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }
        next();
    } catch (ex) {
        return res.status(400).json({ message: 'Invalid token' });
    }
}
