// src/types/index.d.ts

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Asset {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  assetType: 'image' | 'video' | 'audio' | '3DModel' | 'ARAsset';
  price: number;
  currency: string;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  assetId: string;
  buyerId: string;
  sellerId: string;
  price: number;
  currency: string;
  transactionHash: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ElysiumApi {
  fetchAssets: () => Promise<Asset[]>;
  fetchTransactions: () => Promise<Transaction[]>;
  createUser: (userData: User) => Promise<User>;
  createAsset: (assetData: Asset) => Promise<Asset>;
  executeTransaction: (transactionData: Transaction) => Promise<Transaction>;
}

export interface AIIntegration {
  predictText: (inputText: string) => Promise<string>;
  formatContent: (content: string) => Promise<string>;
  moderateContent: (content: string) => Promise<boolean>;
  personalizeContent: (userId: string, content: string) => Promise<string>;
  analyzeContent: (content: string) => Promise<any>; // Replace 'any' with a more specific type as needed
  convertVoiceToText: (audioStream: Blob) => Promise<string>;
}

export interface BlockchainContextValue {
  createAssetOnBlockchain: (assetData: Asset) => Promise<string>;
  executeTransactionOnBlockchain: (transactionData: Transaction) => Promise<string>;
  fetchBlockchainTransactions: (userId: string) => Promise<Transaction[]>;
}

export interface AIContextValue {
  getPredictiveText: (inputText: string) => Promise<string>;
  getFormattedContent: (content: string) => Promise<string>;
  getContentModeration: (content: string) => Promise<boolean>;
  getContentPersonalization: (userId: string, content: string) => Promise<string>;
  getContentAnalytics: (content: string) => Promise<any>; // Replace 'any' with a more specific type as needed
  getVoiceToText: (audioStream: Blob) => Promise<string>;
}

export interface ElysiumContextValue {
  user: User | null;
  assets: Asset[];
  transactions: Transaction[];
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: User) => Promise<void>;
  fetchUserAssets: (userId: string) => Promise<Asset[]>;
  fetchUserTransactions: (userId: string) => Promise<Transaction[]>;
}