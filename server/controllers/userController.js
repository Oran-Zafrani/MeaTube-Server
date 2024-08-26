const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    let errorMessage = error.message;
    if (errorMessage.includes("All fields must be filled out!")) {
      res.status(400).json({ message: "All fields must be filled out!" });
    } else if (errorMessage.includes("Passwords do not match!")) {
      res.status(400).json({ message: "Passwords do not match!" });
    } else if (errorMessage.includes("Password is not complex enough!")) {
      res.status(400).json({ message: "Password is not complex enough! Please choose another password according to password details." });
    } else if (errorMessage.includes("Validation Error")) {
      res.status(400).json({ message: "Validation Error: " + error.message });
    } else if (errorMessage.includes("E11000 duplicate key error")) {
      res.status(400).json({ message: "Duplicate key error: A user with this identifier already exists." });
    } else {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findUserByUsername(req.params.username); // Use the User model and findUserByUsername method
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(`Error fetching user by username: ${error.message}`); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findUserById(req.params.id ); // Use the User model and findOne method
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(`Error fetching user by ID: ${error.message}`); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserByChannelName = async (req, res) => {
  try {
    const user = await User.findUserByChannelName(req.params.channelname);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(`Error fetching user by channel name: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};


// Define the DELETE /api/users/:id route handler
exports.deleteUser = async (req, res) => {
  try {
      // Extract the _id from the URL parameters
      const userId = req.params.username;

      // Call the static method to delete the user
      const deletedUser = await User.deleteUser(userId);
      
      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
      // Extract the username from the URL parameters
      const username = req.params.username;

      // Call the updateUser method from the User model
      const updatedUser = await User.updateUser(username , req.body);

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

