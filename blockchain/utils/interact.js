const Web3 = require('web3');
const AssetContract = require('../contracts/AssetContract.sol');
const RoyaltyContract = require('../contracts/RoyaltyContract.sol');
const MarketplaceContract = require('../contracts/MarketplaceContract.sol');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const assetContractAddress = '0x...'; // Replace with actual contract address
const royaltyContractAddress = '0x...'; // Replace with actual contract address
const marketplaceContractAddress = '0x...'; // Replace with actual contract address

const assetContract = new web3.eth.Contract(AssetContract.abi, assetContractAddress);
const royaltyContract = new web3.eth.Contract(RoyaltyContract.abi, royaltyContractAddress);
const marketplaceContract = new web3.eth.Contract(MarketplaceContract.abi, marketplaceContractAddress);

const interact = {
  createAsset: async (name, description, price, fromAddress) => {
    const gas = await assetContract.methods.createAsset(name, description, price).estimateGas({ from: fromAddress });
    return assetContract.methods.createAsset(name, description, price).send({ from: fromAddress, gas });
  },

  executeTransaction: async (assetId, fromAddress) => {
    const gas = await marketplaceContract.methods.purchaseAsset(assetId).estimateGas({ from: fromAddress });
    return marketplaceContract.methods.purchaseAsset(assetId).send({ from: fromAddress, gas });
  },

  registerRoyalty: async (assetId, percentage, fromAddress) => {
    const gas = await royaltyContract.methods.registerRoyalty(assetId, percentage).estimateGas({ from: fromAddress });
    return royaltyContract.methods.registerRoyalty(assetId, percentage).send({ from: fromAddress, gas });
  },

  fetchAssetDetails: async (assetId) => {
    return assetContract.methods.getAssetDetails(assetId).call();
  },

  listenToAssetCreated: () => {
    assetContract.events.AssetCreated({
      fromBlock: 0
    }, (error, event) => {
      if (error) {
        console.error('Error on event', error);
      } else {
        console.log('Asset Created Event:', event.returnValues);
      }
    });
  },

  listenToTransactionCompleted: () => {
    marketplaceContract.events.TransactionCompleted({
      fromBlock: 0
    }, (error, event) => {
      if (error) {
        console.error('Error on event', error);
      } else {
        console.log('Transaction Completed Event:', event.returnValues);
      }
    });
  }
};

module.exports = interact;