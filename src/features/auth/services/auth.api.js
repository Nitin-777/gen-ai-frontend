import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

// 🔥 ADD THIS (IMPORTANT)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 📝 REGISTER
export async function register({ username, email, password }) {
  try {
    const response = await api.post('/api/auth/register', {
      username, email, password
    });
    return response.data;
  } catch (err) {
    console.error("Register error:", err.response?.data);
    return null;
  }
}

// 🔐 LOGIN
export async function login({ email, password }) {
  try {
    const response = await api.post('/api/auth/login', {
      email, password
    });
    return response.data;
  } catch (err) {
    console.error("Login error:", err.response?.data);
    return null;
  }
}

// 🚪 LOGOUT
export async function logout() {
  try {
    const response = await api.post('/api/auth/logout');
    return response.data;
  } catch (err) {
    return null;
  }
}

// 👤 GET CURRENT USER
export async function getMe() {
  try {
    const response = await api.get('/api/auth/get-me');
    return response.data;
  } catch (err) {
    console.error("GetMe error:", err.response?.status);
    return null;
  }
}