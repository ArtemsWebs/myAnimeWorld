import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.FRONTEND_BASE_URL,
});
