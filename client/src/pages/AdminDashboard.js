import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { filmsAPI, storiesAPI } from '../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('films');
  const [films, setFilms] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filmsResponse, storiesResponse] = await Promise.all([
          filmsAPI.getAll(),
          storiesAPI.getAllAdmin()
        ]);
        setFilms(filmsResponse.data);
        setStories(storiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user]);

  const handleApproveStory = async (storyId) => {
    try {
      await storiesAPI.approve(storyId);
      setStories(stories.map(story => 
        story._id === storyId ? { ...story, isApproved: true } : story
      ));
    } catch (error) {
      console.error('Error approving story:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Admin Dashboard
        </h1>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('films')}
            className={`py-2 px-4 font-semibold ${
              activeTab === 'films'
                ? 'border-b-2 border-yellow-500 text-yellow-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Films ({films.length})
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`py-2 px-4 font-semibold ${
              activeTab === 'stories'
                ? 'border-b-2 border-yellow-500 text-yellow-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Stories ({stories.length})
          </button>
        </div>

        {/* Films Tab */}
        {activeTab === 'films' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Film Management</h2>
              <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300">
                Add New Film
              </button>
            </div>
            
            {films.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-600">No films available.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {films.map((film) => (
                  <div key={film._id} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">{film.title}</h3>
                    <p className="text-gray-600 mb-4">{film.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Category: {film.category}</span>
                      <span>Created: {new Date(film.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Story Management</h2>
            
            {stories.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-600">No stories submitted yet.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {stories.map((story) => (
                  <div key={story._id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{story.title}</h3>
                        <p className="text-gray-600">By {story.name} ({story.email})</p>
                      </div>
                      <div className="flex space-x-2">
                        {!story.isApproved && (
                          <button
                            onClick={() => handleApproveStory(story._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition duration-300"
                          >
                            Approve
                          </button>
                        )}
                        <span className={`px-3 py-1 rounded text-sm ${
                          story.isApproved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {story.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line mb-4">{story.story}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Category: {story.category}</span>
                      <span>Submitted: {new Date(story.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;