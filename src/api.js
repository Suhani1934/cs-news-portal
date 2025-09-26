// frontend/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
});

// attach admin key if present
API.interceptors.request.use(config => {
  const key = localStorage.getItem('admin_key');
  if (key) config.headers['x-admin-key'] = key;
  return config;
});

export default API;
