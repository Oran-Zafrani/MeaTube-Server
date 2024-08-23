const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/auth');
const likesController = require('../controllers/likesController');
const commentsController = require('../controllers/commentsController');

/* USER ROUTES */
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);

router.post('/login', authController.login);

// Protected route
router.get('/profile/:id', authMiddleware, userController.getProfile);

/* VIDEO ROUTES */

router.get('/videos/:id',authMiddleware , videoController.getVideoById);
router.post('/videos',authMiddleware, videoController.addVideo);
router.delete('/videos/:id',authMiddleware, videoController.deleteVideoById);
router.put('/videos/:id',authMiddleware , videoController.updateVideo);

/* LIKES ROUTES */

router.get('/videos/:id/likes', authMiddleware, likesController.getLikesByVideoId);
router.get('/videos/:id/dislikes', authMiddleware, likesController.getDisLikesByVideoId);
router.post('/videos/:id/likes', authMiddleware, likesController.addLike);
router.post('/videos/:id/dislikes', authMiddleware, likesController.addDisLike);
router.delete('/videos/:id/likes', authMiddleware, likesController.deleteLike);
router.delete('/videos/:id/dislikes', authMiddleware, likesController.deleteDisLike);


/* COMMENTS ROUTES */

router.get('/videos/:id/comments', authMiddleware, commentsController.getCommentsByVideoId);
router.delete('/comments/:id', authMiddleware, commentsController.deleteComment);
router.post('/videos/:id/comments', authMiddleware, commentsController.AddComment);
router.put('/comments/:id', authMiddleware, commentsController.updateComment);

module.exports = router;