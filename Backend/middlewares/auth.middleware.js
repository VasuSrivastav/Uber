const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token ||  req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        // console.log(decoded.userId);
        const user = await User.findById(decoded._id); // decoded._id is the user id that mongo db auto generated that was encoded in the token when the user logged in or registered successfully returned by the generateAuthToken method in the user.model.js file 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        // console.log("authUser", req.user);
        return next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token ||  req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        // console.log(decoded.userId);
        const captain = await captainModel.findById(decoded._id); // decoded._id is the user id that mongo db auto generated that was encoded in the token when the user logged in or registered successfully returned by the generateAuthToken method in the user.model.js file 
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }
        req.captain = captain;
        // console.log("authUser", req.user);
        return next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}