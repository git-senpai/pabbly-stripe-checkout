import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createCheckoutSession = async (email, items) => {
  const response = await api.post('/payment/create-checkout-session', {
    email,
    items,
  });
  return response.data;
};

export const getOrderBySessionId = async (sessionId) => {
  const response = await api.get(`/payment/order/${sessionId}`);
  return response.data;
};

export const getCancelledOrder = async (sessionId) => {
  const response = await api.get(`/payment/cancel/${sessionId}`);
  return response.data;
};

export default api;