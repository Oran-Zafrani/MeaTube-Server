const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: '' 
    },
    videoFile: {
        type: String,
        required: true
    },
    previewImage: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    uploadTime: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
});

videoSchema.statics.findVideoById = async function(id) {
    try {
        const video = await this.findById(id);
        return video;
    } catch (error) {
        throw new Error('Error finding video: ' + error.message);
    }
}

videoSchema.statics.addVideo = async function(videoData) {
    try {
        const video = new this(videoData);
        const savedVideo = await video.save();
        return savedVideo;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error('Validation Error: ' + error.message);
        } else if (error.code === 11000) {
            throw new Error('Duplicate Key Error: ' + error.message);
        } else {
            throw new Error('Error adding video: ' + error.message);
        }
    }
}

// Define a static method to delete a video by _id (videoId)
videoSchema.statics.deleteVideoById = async function(videoId) {
    try {
        const objectId = new mongoose.Types.ObjectId(videoId);
        const deletedVideo = await this.findOneAndDelete({ _id: objectId });

        if (!deletedVideo) {
            throw new Error('Video not found');
        }

        // Call the method to delete all comments associated with this videoId
        //await Comment.deleteAllCommentsByVideoId(videoId); //ADD AFTER ORAN ADD COMMENTS

        return deletedVideo;
    } catch (error) {
        throw new Error('Error deleting video: ' + error.message);
    }
};


// Define the static method for updating a video
videoSchema.statics.updateVideoById = async function(videoId, updatedData) {
    try {
        // Use findByIdAndUpdate to update the video by its ID
        const updatedVideo = await this.findByIdAndUpdate(
            videoId, 
            updatedData, 
            { new: true, runValidators: true } // Options: return the updated document, and run validation
        );

        // If no video is found with the given ID, throw an error
        if (!updatedVideo) {
            throw new Error('Video not found');
        }

        return updatedVideo;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error('Validation Error: ' + error.message);
        } else {
            throw new Error('Error updating video: ' + error.message);
        }
    }
};


const Video = mongoose.model('Video', videoSchema);

module.exports = Video;