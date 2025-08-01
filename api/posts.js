import api from './index';

export const fetchPosts = () => api.get('/posts');

export const getPostsByCategory = () => api.get('/category/:category');

export const fetchCommentsByPostId = (postId) => api.get(`/posts/${postId}/comments`);

export const createComment = (content, postId) => api.post('/comments', { content, postId });