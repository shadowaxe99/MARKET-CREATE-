import React, { useContext, useEffect, useState } from 'react';
import { BlockchainContext } from '../../context/BlockchainContext';
import { ElysiumApi } from '../../api/elysiumApi';
import { AssetModel, TransactionModel } from '../../types';
import './blockchainintegration.scss';

const BlockchainIntegration = () => {
  const { Arbitrum, deployContracts, interactWithContract } = useContext(BlockchainContext);
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await ElysiumApi.get('/assets');
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await ElysiumApi.get('/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchAssets();
    fetchTransactions();
  }, []);

  const handleDeployContracts = async () => {
    try {
      const result = await deployContracts();
      console.log('Contracts deployed:', result);
    } catch (error) {
      console.error('Error deploying contracts:', error);
    }
  };

  const handleInteractWithContract = async (assetId: string) => {
    try {
      const asset = assets.find(a => a.id === assetId);
      if (asset) {
        const result = await interactWithContract(asset);
        console.log('Contract interaction result:', result);
      }
    } catch (error) {
      console.error('Error interacting with contract:', error);
    }
  };

  return (
    <div id="blockchainIntegration">
      <h2>Blockchain Integration</h2>
      <button onClick={handleDeployContracts}>Deploy Contracts</button>
      <div className="assets">
        <h3>Assets</h3>
        {assets.map(asset => (
          <div key={asset.id} className="asset">
            <span>{asset.name}</span>
            <button onClick={() => handleInteractWithContract(asset.id)}>Interact</button>
          </div>
        ))}
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction">
            <span>{transaction.assetId}</span>
            <span>{transaction.userId}</span>
            <span>{transaction.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainIntegration;