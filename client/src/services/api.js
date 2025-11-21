import axios from 'axios';

const API = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const authAPI = {
  login: (userData) => API.post('/auth/login', userData),
  register: (userData) => API.post('/auth/register', userData),
};

export const filmsAPI = {
  getAll: () => API.get('/films'),
  getById: (id) => API.get(`/films/${id}`),
  create: (filmData) => API.post('/films', filmData),
};

export const storiesAPI = {
  submit: (storyData) => API.post('/stories', storyData),
  getAll: () => API.get('/stories'),
  getAllAdmin: () => API.get('/stories/all'),
  approve: (id) => API.patch(`/stories/${id}/approve`),
};

export default API;