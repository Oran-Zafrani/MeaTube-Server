const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/auth');

/* USER ROUTES */
router.get('/users/:id', userController.getUserById);
router.get('/users/username/:username', userController.getUserByUsername);
router.post('/users', userController.createUser);
router.post('/login', authController.login);


/* VIDEO ROUTES */
router.get('/videos/:id', videoController.getVideoById);
router.post('/videos', videoController.addVideo);
module.exports = router;