import axios from 'axios';
import { AssetModel, TransactionModel, UserModel } from '../types/index';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

const elysiumApi = {
  // User-related API calls
  registerUser: async (userData: UserModel) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  loginUser: async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logoutUser: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/logout`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Asset-related API calls
  createAsset: async (assetData: AssetModel) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/assets`, assetData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchAssets: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/assets`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Transaction-related API calls
  executeTransaction: async (transactionData: TransactionModel) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions`, transactionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchTransactions: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // AI-related API calls
  fetchAnalytics: async (assetId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ai/analytics/${assetId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  moderateContent: async (content: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/moderate`, { content });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  personalizeContent: async (userId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ai/personalize/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  convertVoiceToText: async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
      const response = await axios.post(`${API_BASE_URL}/ai/voice-to-text`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default elysiumApi;