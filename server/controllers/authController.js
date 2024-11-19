// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {

/*ADDITION TO AWS_PROD */
res.status(400).json({ message: "Login is disabled for this environment." });


  try {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'User is not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username, displayName: user.displayName },
      process.env.JWT_SECRET,
      { expiresIn: '3y' } // Token expires in 24 hours
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};