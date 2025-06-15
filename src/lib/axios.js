// lib/axios.js
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const NEXT_BASE_URL = process.env.NEXT_PUBLIC_URL;

// For client-side usage only
const userAxios = axios.create({
  baseURL: NEXT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const nodeAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default userAxios;

