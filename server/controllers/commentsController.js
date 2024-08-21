// Import the Comment model
const Comment = require("../models/comments");

// Define the commentsController object
const commentsController = {};

// Define the GET /api/comments/:id route handler
commentsController.getCommentsByCommentId = (req, res) => {
    const commentId = req.params.id;

    Comment.findCommentsByCommentId(commentId)
        .then(comments => {
            if (comments.length === 0) {
                return res.status(404).json({ message: 'No comments found for this commentId' });
            }
            res.status(200).json(comments);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

// Define the DELETE /api/videos/:id/ route handler
commentsController.deleteComment = async (req, res) => {
    try {
        // Extract the _id from the URL parameters
        const commentId = req.params.id;

        // Call the static method to delete the comment
        const deletedComment = await Comment.deleteComment(commentId);
        
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Export the commentsController object
module.exports = commentsController;