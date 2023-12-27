const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePicture: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes to improve the performance of searches and queries
userSchema.index({ username: 1, email: 1 });

// Pre-save hook to handle email verification, password hashing, etc.
userSchema.pre('save', async function(next) {
  // Logic for hashing password and other pre-save operations
  next();
});

// Instance methods for the User model
userSchema.methods = {
  // Method to compare hashed password with the provided password
  comparePassword: function(candidatePassword) {
    // Logic to compare password
  },
  // Method to generate JWT token for authentication
  generateAuthToken: function() {
    // Logic to generate auth token
  }
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;