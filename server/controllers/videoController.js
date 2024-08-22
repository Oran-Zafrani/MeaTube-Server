const Video = require("../models/video");

// Import any necessary modules or dependencies

// Define the videoController object
const videoController = {};

// Define the GET /api/videos/:id route handler
videoController.getVideoById = (req, res) => {
    // Get the video ID from the request parameters
    const id = req.params.id;
    // Find the video by ID
    Video.findById(id)
        .then(video => {
            // If the video is not found
            if (!video) {
                // Return a 404 Not Found response
                return res.status(404).json({ message: 'Video not found' });
            }
            // Return the video as JSON
            res.json(video);
        })
        .catch(error => {
            // Return a 500 Internal Server Error response
            res.status(500).json({ message: error.message });
        });
};

// Define the POST /api/videos route handler
videoController.addVideo = async (req, res) => {
    // Create a new video object with the data from the request body
    try {
        await Video.addVideo(req.body).then((newVideo) => {
        res.status(201).json(newVideo)});
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

// Controller function to get the top 20 videos in random order
videoController.getTop20Videos = async (req, res) => {
    try {
        const videos = await Video.getTop20Videos();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Export the videoController object
module.exports = videoController;