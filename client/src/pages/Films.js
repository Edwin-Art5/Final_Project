import React, { useState, useEffect } from 'react';
import { filmsAPI } from '../services/api';

const Films = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await filmsAPI.getAll();
        setFilms(response.data);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading films...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Our Film Collection
        </h1>
        
        {films.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl">No films available at the moment.</p>
            <p>Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {films.map((film) => (
              <div key={film._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
                  <iframe
                    src={film.embedUrl}
                    title={film.title}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{film.title}</h3>
                  <p className="text-gray-600 mb-4">{film.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="capitalize">{film.category}</span>
                    <span>{new Date(film.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Films;