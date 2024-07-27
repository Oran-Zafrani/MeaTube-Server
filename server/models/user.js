// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    type: String, 
    default: '' // You might want to set a default image URL
  },
  subscribers: { 
    type: Number, 
    default: 0 
  },
  likedVideos: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Video' 
  }],
  dislikedVideos: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Video' 
  }]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method to find user by ID
userSchema.statics.findUserById = async function(id) {
  try {
    const user = await this.findById(id)
      .select('-password')
      .populate('likedVideos', 'title') // Populate with just the title of liked videos
      .populate('dislikedVideos', 'title'); // Populate with just the title of disliked videos
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Error finding user: ' + error.message);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;