require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    arbitrum: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
      },
      network_id: 42161,
      gasPrice: 0,
      skipDryRun: true
    },
    arbitrum_nova: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, `https://nova.arbitrum.io/rpc`);
      },
      network_id: "*",
      gasPrice: 0,
      skipDryRun: true
    }
  },
  contracts_directory: './blockchain/contracts/',
  contracts_build_directory: './blockchain/build/contracts/',
  migrations_directory: './blockchain/migrations/',
  test_directory: './tests/blockchain/__tests__/',
  compilers: {
    solc: {
      version: "0.8.4",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
};