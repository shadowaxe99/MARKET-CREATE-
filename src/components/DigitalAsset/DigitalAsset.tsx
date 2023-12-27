import React, { useState, useContext } from 'react';
import { ElysiumContext } from '../../context/ElysiumContext';
import { AssetModel } from '../../types/index.d';
import './digitalasset.scss';

interface DigitalAssetProps {
  asset: AssetModel;
}

const DigitalAsset: React.FC<DigitalAssetProps> = ({ asset }) => {
  const { useBlockchain } = useContext(ElysiumContext);
  const [isOwned, setIsOwned] = useState<boolean>(false);

  const handlePurchase = async () => {
    const { createAsset, executeTransaction } = useBlockchain();
    try {
      await createAsset(asset);
      await executeTransaction(asset.price);
      setIsOwned(true);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div className="digitalAsset" id={`digitalAsset-${asset.id}`}>
      <img src={asset.image} alt={asset.name} />
      <div className="assetDetails">
        <h3>{asset.name}</h3>
        <p>{asset.description}</p>
        <div className="assetActions">
          {isOwned ? (
            <button disabled>Owned</button>
          ) : (
            <button onClick={handlePurchase}>Buy for {asset.price} ETH</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalAsset;