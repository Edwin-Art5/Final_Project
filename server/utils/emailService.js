const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

const sendWelcomeEmail = async (email, username) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to Royalty Studioz - Faith Through Film!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eab308; border-radius: 10px;">
          <div style="text-align: center; background-color: #1f2937; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #eab308; margin: 0;">🎬 Royalty Studioz</h1>
            <p style="color: #f9fafb; margin: 5px 0 0 0;">Faith Through Film</p>
          </div>
          
          <div style="padding: 20px;">
            <h2 style="color: #1f2937;">Welcome, ${username}! 👋</h2>
            
            <p>We're thrilled to welcome you to the Royalty Studioz community! Your journey of faith through film begins now.</p>
            
            <div style="background-color: #fef9c3; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #713f12; margin-top: 0;">🌟 What's Next?</h3>
              <ul style="color: #713f12;">
                <li>Watch our inspiring film <strong>"The Hope"</strong></li>
                <li>Share your testimony and stories</li>
                <li>Connect with our faith community</li>
                <li>Participate in prayer requests</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="http://localhost:3000/films" style="background-color: #eab308; color: #1f2937; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Watch "The Hope" Now
              </a>
            </div>
            
            <p>We're praying that your experience with Royalty Studioz strengthens your faith and brings you closer to God's purpose for your life.</p>
            
            <p>Blessings in Christ,<br>
            <strong>The Royalty Studioz Team</strong></p>
          </div>
          
          <div style="text-align: center; padding: 20px; background-color: #f3f4f6; border-radius: 0 0 10px 10px; margin-top: 20px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              If you have any questions, simply reply to this email.<br>
              © 2024 Royalty Studioz. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', email);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};

module.exports = { sendWelcomeEmail };