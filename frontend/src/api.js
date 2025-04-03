import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getInventory = async () => {
    try {
        const response = await axios.get(`${API_URL}/inventory`);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw error;
    }
};

export const updateInventory = async (item) => {
    try {
        const response = await axios.put(`${API_URL}/inventory`, item);
        return response.data;
    } catch (error) {
        console.error('Error updating inventory:', error);
        throw error;
    }
};

export const createInventoryItem = async (item) => {
    try {
        const response = await axios.post(`${API_URL}/inventory`, item);
        return response.data;
    } catch (error) {
        console.error('Error creating inventory item:', error);
        throw error;
    }
};

export const deleteInventoryItem = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/inventory/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        throw error;
    }
};

export const getRestockingAlerts = async () => {
    try {
        const response = await axios.get(`${API_URL}/alerts/restocking`);
        return response.data;
    } catch (error) {
        console.error('Error fetching restocking alerts:', error);
        throw error;
    }
};

export const createRestockingAlert = async (alert) => {
    try {
        const response = await axios.post(`${API_URL}/alerts/restocking`, alert);
        return response.data;
    } catch (error) {
        console.error('Error creating restocking alert:', error);
        throw error;
    }
};

export const deleteRestockingAlert = async (alertId) => {
    try {
        const response = await axios.delete(`${API_URL}/alerts/restocking/${alertId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting restocking alert:', error);
        throw error;
    }
};

export const getSalesTrends = async () => {
    try {
        const response = await axios.get(`${API_URL}/sales/trends`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sales trends:', error);
        throw error;
    }
};

export const createSalesRecord = async (record) => {
    try {
        const response = await axios.post(`${API_URL}/sales`, record);
        return response.data;
    } catch (error) {
        console.error('Error creating sales record:', error);
        throw error;
    }
};

export const deleteSalesRecord = async (salesId) => {
    try {
        const response = await axios.delete(`${API_URL}/sales/${salesId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting sales record:', error);
        throw error;
    }
};
