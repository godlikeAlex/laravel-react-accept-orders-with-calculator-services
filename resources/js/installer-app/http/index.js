import axios from 'axios';

export const API_URL = '/api/installer/dashboard';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('installer-token')}`;
  return config;
});

export default api;