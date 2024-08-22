const { once } = require('events');
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

videoSchema.statics.getTop20Videos = async function() {
    try {
        const videos = await this.find({});

        // Sort videos by views in descending order
        videos.sort((a, b) => b.views - a.views);

        // Get the top 10 most viewed videos
        const top10MostViewed = videos.slice(0, 10);

        // Get the remaining videos
        const remainingVideos = videos.slice(10);

        // Shuffle the remaining videos to get 10 random videos
        const shuffledRemaining = remainingVideos.sort(() => 0.5 - Math.random());
        const top10Random = shuffledRemaining.slice(0, 10);

        // Combine the top 10 most viewed and top 10 random videos and shuffle them
        const top20Videos = [...top10MostViewed, ...top10Random];
        top20Videos.sort(() => 0.5 - Math.random());
        
        return top20Videos;
    } catch (error) {
        throw new Error('Error getting top 20 videos: ' + error.message);
    }
}

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;