// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  displayName: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String
  },
  subscribers: {
    type: Number,
    default: 0
  }
}, { timestamps: true });
userSchema.index({ username: 1 }, { unique: true });


userSchema.statics.addUser = async function(userData) {
  const { username, password, passwordConfirmation, displayName, image } = userData;

  // Check if all fields are filled out
  if (!username || !password || !passwordConfirmation || !displayName || !image) {
    throw new Error("All fields must be filled out!");
  }

  // Check if passwords match
  if (password !== passwordConfirmation) {
    throw new Error("Passwords do not match!");
  }

  // Check password complexity
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error("Password is not complex enough! Please choose another password according to password details.");
  }

  try {

    const newUser = new this(userData);
    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new Error('Validation Error: ' + error.message);
    } else if (error.code === 11000) { // Handle duplicate key error
      throw new Error('Duplicate key error: A user with this identifier already exists.');
    } else {
      throw new Error('Error adding user: ' + error.message);
    }
  }
};


// Static method to find user by ID
userSchema.statics.findUserById = async function(userId) {
  try {
    const user = await this.findOne({_id:userId});
    return user;
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new Error('Validation Error: ' + error.message);
    } else {
        throw new Error('Error adding user: ' + error.message);
    }
  }
};

userSchema.statics.findUserByUsername = async function(username) {
  try {
    const user = await this.findOne({username: username });
    return user;
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new Error('Validation Error: ' + error.message);
    } else {
      throw new Error('Error finding user by username: ' + error.message);
    }
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;