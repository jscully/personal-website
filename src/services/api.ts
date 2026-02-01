import axios from 'axios';
import { store } from '../store/store';
import { logout, setCredentials } from '../store/slices/authSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // In a real app, this would call a refresh token endpoint
        // const response = await axios.post('/auth/refresh');
        // const { token } = response.data;
        // store.dispatch(setCredentials({ token }));
        // return api(originalRequest);
        
        // For now, if 401 occurs, we logout
        store.dispatch(logout());
        return Promise.reject(error);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
