const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  story: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['testimony', 'prayer-request', 'story-idea'],
    default: 'testimony'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Story', storySchema);