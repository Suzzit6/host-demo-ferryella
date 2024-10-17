// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-url',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post('/refresh-token');
        return api(originalRequest);
      } catch (refreshError) {
           await api.get("/logout")
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;