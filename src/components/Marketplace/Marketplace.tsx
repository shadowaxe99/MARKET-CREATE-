import React, { useState, useEffect, useContext } from 'react';
import { ElysiumContext } from '../../context/ElysiumContext';
import { AssetModel } from '../../types/index';
import DigitalAsset from '../DigitalAsset/DigitalAsset';
import './marketplace.scss';

const Marketplace: React.FC = () => {
  const { fetchAssets, blockchainStatus } = useContext(ElysiumContext);
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const fetchedAssets = await fetchAssets();
        setAssets(fetchedAssets);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch assets:', error);
        setLoading(false);
      }
    };

    if (blockchainStatus.connected) {
      loadAssets();
    }
  }, [fetchAssets, blockchainStatus.connected]);

  return (
    <div id="marketplace" className="marketplace-container">
      <h1>Elysium Marketplace</h1>
      {loading ? (
        <p>Loading assets...</p>
      ) : (
        <div className="assets-grid">
          {assets.map((asset) => (
            <DigitalAsset key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;