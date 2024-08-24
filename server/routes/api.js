const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/auth');
const likesController = require('../controllers/likesController');
const commentsController = require('../controllers/commentsController');

/* USER ROUTES */
router.get('/users/:id', userController.getUserById);
router.get('/users/username/:username', userController.getUserByUsername);
router.post('/users', userController.createUser);
router.post('/login', authController.login);
router.delete('/users/:username', userController.deleteUser);


/* VIDEO ROUTES */
router.get('/videos/:id', videoController.getVideoById);
router.post('/videos', videoController.addVideo);

/* LIKES ROUTES */

router.get('/videos/:id/likes', likesController.getLikesByVideoId);
router.get('/videos/:id/dislikes', likesController.getDisLikesByVideoId);
router.post('/videos/:id/likes', likesController.addLike);
router.post('/videos/:id/dislikes', likesController.addDisLike);
router.delete('/videos/:id/likes', likesController.deleteLike);
router.delete('/videos/:id/dislikes', likesController.deleteDisLike);


/* COMMENTS ROUTES */

router.get('/videos/:id/comments', authMiddleware, commentsController.getCommentsByVideoId);
router.delete('/comments/:id', authMiddleware, commentsController.deleteComment);
router.post('/videos/:id/comments', authMiddleware, commentsController.AddComment);
router.put('/comments/:id', authMiddleware, commentsController.updateComment);

module.exports = router;