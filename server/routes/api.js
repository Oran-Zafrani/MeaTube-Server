const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/auth');
const likesController = require('../controllers/likesController');

/* USER ROUTES */
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);

router.post('/login', authController.login);

// Protected route
router.get('/profile/:id', authMiddleware, userController.getProfile);

/* VIDEO ROUTES */

router.get('/videos/:id', videoController.getVideoById);
router.post('/videos', videoController.addVideo);

/* LIKES OUTES */

router.get('/videos/:id/likes', likesController.getLikesByVideoId);
router.get('/videos/:id/dislikes', likesController.getDisLikesByVideoId);
router.post('/videos/:id/likes', likesController.addLike);
router.post('/videos/:id/dislikes', likesController.addDisLike);
router.delete('/videos/:id/likes', likesController.deleteLike);
router.delete('/videos/:id/dislikes', likesController.deleteDisLike);

module.exports = router;