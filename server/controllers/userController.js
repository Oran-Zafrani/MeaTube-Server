const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    let errorMessage = error.message;
      res.status(400).json({ message: error.message });
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

