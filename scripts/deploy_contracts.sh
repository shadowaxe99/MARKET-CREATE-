#!/bin/bash

# Navigate to the blockchain directory where the smart contracts are located
cd blockchain

# Compile the smart contracts using truffle
echo "Compiling smart contracts..."
truffle compile

# Deploy the smart contracts to the Arbitrum network
echo "Deploying smart contracts to the Arbitrum network..."
truffle migrate --network arbitrum

# Navigate back to the root directory
cd ..

echo "Smart contracts deployed successfully."