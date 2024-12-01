import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_KEY;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined in the environment variables.');
}

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/notes`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
