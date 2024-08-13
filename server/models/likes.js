const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    video_id: {
        type: Number,
        required: true
    },
    action: {
        type: String,
        enum: ['like', 'dislike']
    },
});

// Define a static method to find likes by video_id
likesSchema.statics.findLikesByVideoId = async function(videoId) {
    try {
        // Search for all documents with the given video_id
        const likes = await this.find({ video_id: videoId, action: 'like'});
        return likes;
    } catch (error) {
        throw new Error('Error finding likes by video_id: ' + error.message);
    }
}

// Define a static method to find likes by video_id
likesSchema.statics.findDisLikesByVideoId = async function(videoId) {
    try {
        // Search for all documents with the given video_id
        const likes = await this.find({ video_id: videoId, action: 'dislike'});
        return likes;
    } catch (error) {
        throw new Error('Error finding likes by video_id: ' + error.message);
    }
}

const Like = mongoose.model('Like', likesSchema);

module.exports = Like;