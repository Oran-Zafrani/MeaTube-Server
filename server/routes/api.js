const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);

router.post('/login', authController.login);

// Protected route
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;