import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
            About Royalty Studioz
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At Royalty Studioz, we believe in the transformative power of storytelling through film. 
              Our mission is to create and share Christian films that inspire faith, hope, and love, 
              bringing the message of God's kingdom to audiences worldwide.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We are committed to producing high-quality content that not only entertains but also 
              strengthens believers in their walk with Christ and introduces others to the love of Jesus.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Our Vision</h3>
              <p className="text-gray-600">
                To become a leading platform for Christian cinematic content, creating a global community 
                united by faith and inspired by powerful stories of God's work in people's lives.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Our Values</h3>
              <ul className="text-gray-600 list-disc list-inside space-y-2">
                <li>Faithfulness to Biblical truth</li>
                <li>Excellence in storytelling</li>
                <li>Community building</li>
                <li>Creative innovation</li>
                <li>Kingdom impact</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Join Our Journey</h2>
            <p className="text-gray-600 mb-6">
              Whether you're a filmmaker, a story enthusiast, or someone looking for inspiration, 
              there's a place for you in the Royalty Studioz community.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-yellow-700">
                <strong>Get involved:</strong> Share your story, watch our films, pray with our community, 
                and be part of what God is doing through faith-based cinema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;