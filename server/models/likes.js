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

// Create a unique index on the combination of user_id and video_id
likesSchema.index({ user_id: 1, video_id: 1 }, { unique: true });


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

likesSchema.statics.addLike = async function(likeData, videoId) {
    // Extract the user_id from likeData
    const userId = likeData.user_id;

    try {
        // Combine the video_id with the data from the request body
        const completeLikeData = {
            ...likeData,
            video_id: videoId,
            action: 'like'
        };

        const Like = new this(completeLikeData);
        const savedLike = await Like.save();
        return savedLike;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error('Validation Error: ' + error.message);
        } else if (error.code === 11000) {
            this.deleteLike(userId, videoId)
            throw new Error('Delete the like');
        } else {
            throw new Error('Error adding video: ' + error.message);
        }
    }
}


likesSchema.statics.addDisLike = async function(likeData, videoId) {
    // Extract the user_id from likeData
    const userId = likeData.user_id;

    try {
        // Combine the video_id with the data from the request body
        const completeLikeData = {
            ...likeData,
            video_id: videoId,
            action: 'dislike'
        };

        const DisLike = new this(completeLikeData);
        const savedLike = await DisLike.save();
        return savedLike;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error('Validation Error: ' + error.message);
        } else if (error.code === 11000) {
            this.deleteDisLike(userId, videoId)
            throw new Error('Delete the dislike');
        } else {
            throw new Error('Error adding video: ' + error.message);
        }
    }
}

likesSchema.statics.deleteLike = async function(userId, videoId) {
    try {
        const deletedLike = await this.findOneAndDelete({ user_id: userId, video_id: videoId, action: 'like' });

        if (!deletedLike) {
            throw new Error('Like not found');
        }

        return deletedLike;
    } catch (error) {
        throw new Error('Error deleting like: ' + error.message);
    }
};


likesSchema.statics.deleteDisLike = async function(userId, videoId) {
    try {
        const deletedLike = await this.findOneAndDelete({ user_id: userId, video_id: videoId, action: 'dislike' });

        if (!deletedLike) {
            throw new Error('DisLike not found');
        }

        return deletedLike;
    } catch (error) {
        throw new Error('Error deleting like: ' + error.message);
    }
};


// Delete all likes for a specific video
likesSchema.statics.deleteAllLikes = async function(videoId) {
    try {
        const result = await this.deleteMany({ video_id: videoId, action: 'like' });

        if (result.deletedCount === 0) {
            throw new Error('No likes found for this video');
        }

        return result;
    } catch (error) {
        throw new Error('Error deleting likes: ' + error.message);
    }
};

// Delete all Dislikes for a specific video
likesSchema.statics.deleteAllDisLikes = async function(videoId) {
    try {
        const result = await this.deleteMany({ video_id: videoId, action: 'dislike' });

        if (result.deletedCount === 0) {
            throw new Error('No dislikes found for this video');
        }

        return result;
    } catch (error) {
        throw new Error('Error deleting dislikes: ' + error.message);
    }
};


const Like = mongoose.model('Like', likesSchema);

module.exports = Like;