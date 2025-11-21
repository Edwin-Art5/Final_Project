import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Royalty Studioz
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-yellow-300">
            Faith Through Film
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Discover inspiring Christian films, share your stories of faith, and join our community of believers.
          </p>
          <div className="space-x-4">
            <Link 
              to="/films" 
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition duration-300"
            >
              Watch Films
            </Link>
            <Link 
              to="/share-story" 
              className="border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Inspirational Films</h3>
              <p className="text-gray-600">
                Watch carefully curated Christian films that spread hope, faith, and love through powerful storytelling.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Share Stories</h3>
              <p className="text-gray-600">
                Share your personal testimonies and experiences of God's grace to inspire others in their faith journey.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Build Community</h3>
              <p className="text-gray-600">
                Connect with fellow believers, share prayer requests, and grow together in faith and fellowship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Be Inspired?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community today and experience the power of faith through film and fellowship.
          </p>
          <Link 
            to="/films" 
            className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;