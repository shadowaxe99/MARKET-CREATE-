import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Arbitrum } from '../utils/constants';
import { useElysium } from '../hooks/useElysium';

interface BlockchainContextProps {
  children: ReactNode;
}

interface BlockchainState {
  arbitrumStatus: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  currentAccount: string | null;
}

const initialState: BlockchainState = {
  arbitrumStatus: 'disconnected',
  connectWallet: () => {},
  disconnectWallet: () => {},
  currentAccount: null,
};

const BlockchainContext = createContext<BlockchainState>(initialState);

export const BlockchainProvider = ({ children }: BlockchainContextProps) => {
  const [arbitrumStatus, setArbitrumStatus] = useState<string>('disconnected');
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const { elysiumApi } = useElysium();

  useEffect(() => {
    // Check if Arbitrum is connected
    const checkArbitrumConnection = async () => {
      const status = await elysiumApi.getArbitrumStatus();
      setArbitrumStatus(status);
    };

    checkArbitrumConnection();
  }, [elysiumApi]);

  const connectWallet = async () => {
    try {
      const account = await elysiumApi.connectWallet();
      setCurrentAccount(account);
      setArbitrumStatus('connected');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    elysiumApi.disconnectWallet();
    setCurrentAccount(null);
    setArbitrumStatus('disconnected');
  };

  return (
    <BlockchainContext.Provider
      value={{
        arbitrumStatus,
        connectWallet,
        disconnectWallet,
        currentAccount,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => useContext(BlockchainContext);