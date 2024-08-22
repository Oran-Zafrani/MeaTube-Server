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

// Define the DELETE /api/videos/:id route handler
videoController.deleteVideoById = async (req, res) => {
        try {    
        // Extract the videoId from the URL parameters
        const videoId = req.params.id; 

        // Call the static method to delete the video and associated comments
        const deletedVideo = await Video.deleteVideoById(videoId);

        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json({ message: 'Video and associated comments deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Define the UPDATE /api/videos/:id route handler
videoController.updateVideo = async (req, res) => {
    try {
        // Extract the video ID from the URL parameters
        const videoId = req.params.id;

        // Find the video by _id and update it with the data from the request body
        const updatedVideo = await Video.updateVideoById(videoId, req.body)

        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// Export the videoController object
module.exports = videoController;