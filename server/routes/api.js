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
router.put('/users/:username' , userController.updateUser);


/* VIDEO ROUTES */
router.get('/videos/:id', videoController.getVideoById);
router.post('/videos', videoController.addVideo);
// Define the route for getting the top 20 videos in random order
router.get('/videos', videoController.getTop20Videos);
router.get('/videos/username/:username', videoController.getVideosByUsername);



module.exports = router;