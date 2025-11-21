const mongoose = require('mongoose');
const Film = require('./models/Film');
require('dotenv').config();

const hopeFilm = {
  title: "The Hope - Royalty Studioz",
  description: "An inspiring film about finding hope in challenging times through faith and community. A powerful story that reminds us of God's unwavering love and promises.",
  embedUrl: "https://www.youtube.com/embed/x0SfNn0kzMo?si=qqPFi898idPjfoxn",
  category: "featured",
  duration: "3:29", // You can adjust this to your actual film duration
  isPublic: true
};

const addHopeFilm = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/royalty_studios');
    
    // Clear existing films and add "The Hope"
    await Film.deleteMany({});
    console.log('🎬 Adding "The Hope" film...');
    await Film.create(hopeFilm);
    
    console.log('✅ "The Hope" film added successfully!');
    console.log(`🎥 Title: ${hopeFilm.title}`);
    console.log(`📺 Embed URL: ${hopeFilm.embedUrl}`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Error adding film:', error.message);
    process.exit(1);
  }
};

addHopeFilm();