const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/royalty_studios');
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@royaltystudios.com' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      console.log('Email: admin@royaltystudios.com');
      console.log('You can use this account to login');
      process.exit();
    }
    
    console.log('👤 Creating admin user...');
    const admin = new User({
      username: 'admin',
      email: 'admin@royaltystudios.com',
      password: 'admin123',
      role: 'admin'
    });
    
    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@royaltystudios.com');
    console.log('🔑 Password: admin123');
    console.log('\n💡 You can now login to the admin dashboard at: http://localhost:3000/admin/login');
    process.exit();
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();