import React, { useState, useEffect } from 'react';
import { storiesAPI } from '../services/api';

const Community = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await storiesAPI.getAll();
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading stories...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Community Stories
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Read inspiring testimonies and stories from our community members. 
          Each story is a testament to God's grace and faithfulness.
        </p>
        
        {stories.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl">No stories available yet.</p>
            <p>Be the first to share your story!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story) => (
              <div key={story._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {story.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">{story.name}</h3>
                    <p className="text-sm text-gray-500">{new Date(story.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <h4 className="text-xl font-bold mb-3 text-gray-800">{story.title}</h4>
                <p className="text-gray-600 whitespace-pre-line">{story.story}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                    {story.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;