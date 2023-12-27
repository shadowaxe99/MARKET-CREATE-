#!/bin/bash

# Exit script on any error
set -e

# Navigate to the frontend directory
cd "$(dirname "$0")/../"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the frontend..."
npm run build

# Check for build success
if [ -d "build" ]; then
  echo "Frontend built successfully."
else
  echo "Build failed. Please check the output for errors."
  exit 1
fi

# Optional: Deploy the build to a server or a hosting service
# Uncomment and modify the following lines according to your deployment strategy
# echo "Deploying the build..."
# scp -r build/* your-server:path/to/deployment/directory

echo "Build and deployment script executed successfully."