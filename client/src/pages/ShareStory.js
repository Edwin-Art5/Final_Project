import React, { useState } from 'react';
import { storiesAPI } from '../services/api';

const ShareStory = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    story: '',
    category: 'testimony'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await storiesAPI.submit(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        title: '',
        story: '',
        category: 'testimony'
      });
    } catch (error) {
      console.error('Error submitting story:', error);
      alert('Error submitting story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">✓</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your story has been submitted successfully. It will be reviewed by our team before being published on the community page.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
            >
              Share Another Story
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Share Your Story
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Your testimony can inspire others. Share how God has worked in your life.
          </p>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
                Story Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Give your story a title"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="testimony">Personal Testimony</option>
                <option value="prayer-request">Prayer Request</option>
                <option value="story-idea">Story Idea</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="story">
                Your Story *
              </label>
              <textarea
                id="story"
                name="story"
                value={formData.story}
                onChange={handleChange}
                required
                rows="8"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Share your story, testimony, or prayer request..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Share Your Story'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareStory;
