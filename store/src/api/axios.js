import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://e-commerce-api-3wara.vercel.app', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {return Promise.reject(error);}
);

const api = {
  get: (url, config = {}) => apiInstance.get(url, config).then(res => res.data),
  post: (url, data, config = {}) => apiInstance.post(url, data, config).then(res => res.data),
  patch: (url, data, config = {}) => apiInstance.patch(url, data, config).then(res => res.data),
  delete: (url, config = {}) => apiInstance.delete(url, config).then(res => res.data),
};

export default api;