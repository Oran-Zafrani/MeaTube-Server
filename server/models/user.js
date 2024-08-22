// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true, 
    unique: true 
  },
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
    type: String, 
    default: '' // You might want to set a default image URL
  },
  subscribers: { 
    type: Number, 
    default: 0 
  },
  likedVideos: { 
    type: [String], 
    default: [] 
  },
  dislikedVideos: { 
    type: [String], 
    default: [] 
  }
}, { timestamps: true });

// Method to add a new user
userSchema.statics.addUser = async function(userData) {
  try {
    const newUser = new this(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new Error('Validation Error: ' + error.message);
    } else {
      throw new Error('Error adding user: ' + error.message);
    }
  }
};

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method to find user by ID
userSchema.statics.findUserById = async function(userId) {
  try {
    const user = await this.find({id:userId});
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
    const user = await this.find({username: username });
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