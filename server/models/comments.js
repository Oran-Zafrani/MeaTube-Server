const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    videoId: {
        type: Number,
        required: true
    },
    commentId: {
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

const Comment = mongoose.model('Comment', commentsSchema);

module.exports = Comment;
