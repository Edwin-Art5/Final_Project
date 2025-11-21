import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-yellow-400">
            Royalty Studioz
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className={`hover:text-yellow-400 transition duration-300 ${
                isActive('/') ? 'text-yellow-400 border-b-2 border-yellow-400' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/films" 
              className={`hover:text-yellow-400 transition duration-300 ${
                isActive('/films') ? 'text-yellow-400 border-b-2 border-yellow-400' : ''
              }`}
            >
              Films
            </Link>
            <Link 
              to="/share-story" 
              className={`hover:text-yellow-400 transition duration-300 ${
                isActive('/share-story') ? 'text-yellow-400 border-b-2 border-yellow-400' : ''
              }`}
            >
              Share Story
            </Link>
            <Link 
              to="/community" 
              className={`hover:text-yellow-400 transition duration-300 ${
                isActive('/community') ? 'text-yellow-400 border-b-2 border-yellow-400' : ''
              }`}
            >
              Community
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-yellow-400 transition duration-300 ${
                isActive('/about') ? 'text-yellow-400 border-b-2 border-yellow-400' : ''
              }`}
            >
              About
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-yellow-300">Welcome, {user.username}</span>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
                  >
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link 
                  to="/login" 
                  className="border-2 border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;