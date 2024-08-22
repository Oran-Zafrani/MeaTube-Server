// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username, displayName: user.displayName, image: user.image },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};