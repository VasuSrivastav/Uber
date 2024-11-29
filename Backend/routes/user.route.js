const express = require('express');
const router = express.Router();
const { body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// here body only checks if the email is in the correct format as error or action is handled in the controller
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    // body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.loginUser);

router.get('/profile', authMiddleware.authUser ,  userController.getUserProfile);

router.get('/logout', authMiddleware.authUser ,  userController.logoutUser);


module.exports = router;