import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getInventoryList = async () => {
  try {
    const response = await api.get('/inventory');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getInventoryItem = async (itemId) => {
  try {
    const response = await api.get(`/inventory/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addInventoryItem = async (item) => {
  try {
    const response = await api.post('/inventory', item);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateInventoryItem = async (itemId, item) => {
  try {
    const response = await api.put(`/inventory/${itemId}`, item);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteInventoryItem = async (itemId) => {
  try {
    const response = await api.delete(`/inventory/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getRestockingAlerts = async () => {
  try {
    const response = await api.get('/alerts');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const acknowledgeRestockingAlert = async (alertId) => {
  try {
    const response = await api.put(`/alerts/${alertId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSalesTrends = async () => {
  try {
    const response = await api.get('/sales/trends');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
