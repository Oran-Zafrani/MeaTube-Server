const Like = require("../models/likes");

// Import any necessary modules or dependencies

// Define the videoController object
const likesController = {};

// Define the GET /api/videos/:id/likes route handler
likesController.getLikesByVideoId = (req, res) => {
    // Get the video ID from the request parameters
    const videoId = req.params.id;
    
    // Find the likes by video_id
    Like.findLikesByVideoId(videoId)
        .then(likes => {
            // If no likes are found
            if (likes.length === 0) {
                return res.status(404).json({ message: 'No likes found for this video' });
            }
            // Return the likes as JSON
            res.status(200).json(likes);
        })
        .catch(error => {
            // Return a 500 Internal Server Error response
            res.status(500).json({ message: error.message });
        });
};

// Define the GET /api/videos/:id/dislikes route handler
likesController.getDisLikesByVideoId = (req, res) => {
    // Get the video ID from the request parameters
    const videoId = req.params.id;
    
    // Find the dislikes by video_id
    Like.findDisLikesByVideoId(videoId)
        .then(dislikes => {
            // If no dislikes are found
            if (dislikes.length === 0) {
                return res.status(404).json({ message: 'No dislikes found for this video' });
            }
            // Return the dislikes as JSON
            res.status(200).json(dislikes);
        })
        .catch(error => {
            // Return a 500 Internal Server Error response
            res.status(500).json({ message: error.message });
        });
};

// Define the POST /api/videos/:id/likes route handler
likesController.addLike = async (req, res) => {
    // Create a new Like object with the data from the request body
    try {
        // Extract the video_id from the URL parameters
        const videoId = req.params.id;

        // Call the static method to add the like
        const newLike = await Like.addLike(req.body, videoId);
        res.status(201).json(newLike);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

// Define the POST /api/videos/:id/dislikes route handler
likesController.addDisLike = async (req, res) => {
    // Create a new DisLike object with the data from the request body
    try {
        // Extract the video_id from the URL parameters
        const videoId = req.params.id;

        // Call the static method to add the like
        const newLike = await Like.addDisLike(req.body, videoId);
        res.status(201).json(newLike);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};



// Export the videoController object
module.exports = likesController;