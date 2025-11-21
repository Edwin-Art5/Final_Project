const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  embedUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['short-film', 'trailer', 'featured'],
    default: 'short-film'
  },
  thumbnail: {
    type: String
  },
  duration: {
    type: String
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Film', filmSchema);