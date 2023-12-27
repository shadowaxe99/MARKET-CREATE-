import { useContext, createContext, useState, useEffect } from 'react';
import { ElysiumApi } from '../api/elysiumApi';
import { AssetModel, TransactionModel } from '../types/index';

interface BlockchainContextType {
  assets: AssetModel[];
  transactions: TransactionModel[];
  fetchAssets: () => void;
  createTransaction: (assetId: string, userId: string) => void;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};

export const BlockchainProvider: React.FC = ({ children }) => {
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);

  const fetchAssets = async () => {
    try {
      const response = await ElysiumApi.get('/assets');
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const createTransaction = async (assetId: string, userId: string) => {
    try {
      const response = await ElysiumApi.post('/transactions', { assetId, userId });
      setTransactions([...transactions, response.data]);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <BlockchainContext.Provider value={{ assets, transactions, fetchAssets, createTransaction }}>
      {children}
    </BlockchainContext.Provider>
  );
};