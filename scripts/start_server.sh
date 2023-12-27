#!/bin/bash

# Start the Elysium Marketplace server

echo "Starting Elysium Marketplace server..."

# Navigate to the server directory
cd server

# Install server dependencies
echo "Installing server dependencies..."
npm install

# Check if .env exists
if [ ! -f ".env" ]; then
    echo ".env file not found. Please configure your environment variables."
    exit 1
fi

# Start the server using Node.js
echo "Launching server..."
node index.js

echo "Elysium Marketplace server is running."