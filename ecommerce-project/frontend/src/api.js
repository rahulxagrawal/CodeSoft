export const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });
