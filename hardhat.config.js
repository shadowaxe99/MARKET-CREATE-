require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const { ALCHEMY_API_KEY, ROPSTEN_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // For local development
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    },
    arbitrum: {
      url: "https://arbitrum-rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
      gasPrice: 0,
      network_id: 421611
    },
    arbitrumNova: {
      url: "https://nova.arbitrum.io/rpc",
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
      gasPrice: 0,
      network_id: 42170
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD"
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};