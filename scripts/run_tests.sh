#!/bin/bash

# Navigate to the root directory of the project
cd "$(dirname "$0")/.."

# Run frontend tests
echo "Running frontend tests..."
npm run test:frontend

# Run backend tests
echo "Running backend tests..."
npm run test:backend

# Run AI integration tests
echo "Running AI integration tests..."
python -m pytest tests/ai/__tests__

# Run blockchain smart contract tests
echo "Running blockchain smart contract tests..."
truffle test tests/blockchain/__tests__

# Check if all tests passed and exit with the appropriate status
if [ $? -eq 0 ]; then
  echo "All tests passed successfully."
  exit 0
else
  echo "Some tests failed. Check the logs above for more details."
  exit 1
fi