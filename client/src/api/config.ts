import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // leave `/api/v1` here, configure vite proxy
  headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.response.use((response) => response.data, (error) => Promise.reject(error));

  export default instance;
