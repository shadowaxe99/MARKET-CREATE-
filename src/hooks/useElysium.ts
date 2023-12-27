import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ElysiumApi } from '../api/elysiumApi';

interface ElysiumContextProps {
  assets: Asset[];
  transactions: Transaction[];
  fetchAssets: () => void;
  fetchTransactions: () => void;
  createAsset: (assetData: Asset) => void;
  executeTransaction: (transactionData: Transaction) => void;
}

const ElysiumContext = createContext<ElysiumContextProps | null>(null);

export const useElysium = () => {
  const context = useContext(ElysiumContext);
  if (!context) {
    throw new Error('useElysium must be used within a ElysiumProvider');
  }
  return context;
};

export const ElysiumProvider: React.FC = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchAssets = useCallback(async () => {
    try {
      const response = await ElysiumApi.get('/assets');
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await ElysiumApi.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, []);

  const createAsset = useCallback(async (assetData: Asset) => {
    try {
      const response = await ElysiumApi.post('/assets', assetData);
      setAssets(prevAssets => [...prevAssets, response.data]);
    } catch (error) {
      console.error('Error creating asset:', error);
    }
  }, []);

  const executeTransaction = useCallback(async (transactionData: Transaction) => {
    try {
      const response = await ElysiumApi.post('/transactions', transactionData);
      setTransactions(prevTransactions => [...prevTransactions, response.data]);
    } catch (error) {
      console.error('Error executing transaction:', error);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
    fetchTransactions();
  }, [fetchAssets, fetchTransactions]);

  return (
    <ElysiumContext.Provider value={{ assets, transactions, fetchAssets, fetchTransactions, createAsset, executeTransaction }}>
      {children}
    </ElysiumContext.Provider>
  );
};