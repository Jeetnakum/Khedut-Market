import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('km_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const sendOtp = (mobile) => API.post('/auth/send-otp', { mobile });
export const verifyOtp = (mobile, otp) => API.post('/auth/verify-otp', { mobile, otp });
export const register = (data) => API.post('/auth/register', data);
export const getMe = () => API.get('/auth/me');

// Crops
export const getCrops = (params) => API.get('/crops', { params });
export const getCropById = (id) => API.get(`/crops/${id}`);
export const createCrop = (data) => API.post('/crops', data);
export const updateCrop = (id, data) => API.put(`/crops/${id}`, data);
export const deleteCrop = (id) => API.delete(`/crops/${id}`);

// Prices
export const getPrices = (params) => API.get('/prices', { params });
export const addPrice = (data) => API.post('/prices', data);
export const updatePrice = (id, data) => API.put(`/prices/${id}`, data);

// Messages
export const getConversations = () => API.get('/messages/conversations');
export const createConversation = (data) => API.post('/messages/conversations', data);
export const getMessages = (id) => API.get(`/messages/conversations/${id}/messages`);
export const sendMessage = (id, data) => API.post(`/messages/conversations/${id}/send`, data);

// Users
export const getUserProfile = () => API.get('/users/profile');
export const updateProfile = (data) => API.put('/users/profile', data);
export const getAllUsers = (params) => API.get('/users', { params });
export const verifyUser = (id, data) => API.put(`/users/${id}/verify`, data);

// Demands
export const getDemands = () => API.get('/demands');
export const createDemand = (data) => API.post('/demands', data);

export default API;
