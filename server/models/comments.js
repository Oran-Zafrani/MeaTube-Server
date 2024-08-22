const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    videoId: {
        type: Number,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    likesNum: {
        type: Number,
        default: 0,
        required: true
    },
    dislikesNum: {
        type: Number,
        default: 0,
        required: true
    }
});

// Static method to find comments by commentId
commentsSchema.statics.findCommentsByCommentId = async function(videoId) {
    try {
        const comments = await this.find({ videoId: videoId });
        return comments;
    } catch (error) {
        throw new Error('Error finding comments by commentId: ' + error.message);
    }
}

// Define a static method to delete a comment by _id
commentsSchema.statics.deleteComment = async function(commentId) {
    try {
        const objectId = new mongoose.Types.ObjectId(commentId);
        const deletedComment = await this.findOneAndDelete({ _id: objectId});

        if (!deletedComment) {
            throw new Error('Comment not found');
        }

        return deletedComment;
    } catch (error) {
        throw new Error('Error deleting comment: ' + error.message);
    }
};


// Define the static method for adding a comment
commentsSchema.statics.addComment = async function(commentData, videoId) {
    try {
        // Combine the video_id with the data from the request body
        const completeCommentData = {
            ...commentData,
            videoId: videoId
        };

        const comment = new this(completeCommentData);
        const savedComment = await comment.save();
        return savedComment;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error('Validation Error: ' + error.message);
        } else {
            throw new Error('Error adding comment: ' + error.message);
        }
    }
};


const Comment = mongoose.model('Comment', commentsSchema);

module.exports = Comment;
