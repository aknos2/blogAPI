import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
  timeout: 10000, // 10 second timeout
})

// Add JWT token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('API Request:', config.method?.toUpperCase(), config.url); // Debug log
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url); // Debug log
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.config?.url, error.message); // Debug log
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('accessToken');
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;