const { ethers } = require("ethers");

// Arbitrum RPC URLs for connecting to the network
const ARBITRUM_MAINNET_RPC_URL = "https://arb1.arbitrum.io/rpc";
const ARBITRUM_TESTNET_RPC_URL = "https://rinkeby.arbitrum.io/rpc";

// Set up provider for Arbitrum Mainnet and Testnet
const arbitrumMainnetProvider = new ethers.providers.JsonRpcProvider(ARBITRUM_MAINNET_RPC_URL);
const arbitrumTestnetProvider = new ethers.providers.JsonRpcProvider(ARBITRUM_TESTNET_RPC_URL);

// Function to get a signer from a private key for transactions
const getSigner = (privateKey, provider) => {
  return new ethers.Wallet(privateKey, provider);
};

// Function to connect to the Arbitrum network and return a provider
const connectToArbitrum = async (network = "mainnet") => {
  try {
    const provider = network === "mainnet" ? arbitrumMainnetProvider : arbitrumTestnetProvider;
    console.log(`Connected to Arbitrum ${network} network`);
    return provider;
  } catch (error) {
    console.error(`Error connecting to Arbitrum ${network} network:`, error);
    throw error;
  }
};

module.exports = {
  connectToArbitrum,
  getSigner,
  arbitrumMainnetProvider,
  arbitrumTestnetProvider
};