import api from './index';

export const fetchPosts = () => api.get('/posts');

export const getPostsByCategory = () => api.get('/category/:category');