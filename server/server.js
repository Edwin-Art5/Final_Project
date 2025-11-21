const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: '🎬 Royalty Studioz API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    database: 'MongoDB connection status would be here',
    timestamp: new Date().toISOString()
  });
});

// Simple film route (without database for now)
app.get('/api/films', (req, res) => {
  res.json([
    {
      _id: '1',
      title: "The Hope - Royalty Studioz",
      description: "An inspiring film about finding hope in challenging times through faith and community.",
      embedUrl: "https://www.youtube.com/embed/x0SfNn0kzMo?si=qqPFi898idPjfoxn",
      category: "featured",
      duration: "20:15",
      isPublic: true
    }
  ]);
});

// MongoDB connection (optional for now)
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.log('❌ MongoDB connection error:', err.message));
} else {
  console.log('ℹ️  MongoDB URI not set, running without database');
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Royalty Studioz Server Started`);
  console.log(`📍 Running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`🎬 Films: http://localhost:${PORT}/api/films`);
});