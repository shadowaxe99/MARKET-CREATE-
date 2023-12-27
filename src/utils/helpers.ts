// src/utils/helpers.ts

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const truncateString = (str: string, num: number): string => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getBlockchainEventName = (eventName: string): string => {
  switch (eventName) {
    case 'AssetCreated':
      return 'assetCreated';
    case 'TransactionCompleted':
      return 'transactionCompleted';
    case 'UserRegistered':
      return 'userRegistered';
    default:
      return 'event';
  }
};

export const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// This function is a placeholder and should be implemented with actual logic for interacting with smart contracts
export const interactWithContract = async (contractFunction: string, ...args: any[]): Promise<any> => {
  console.warn('interactWithContract function is not implemented yet');
  // Logic to interact with blockchain smart contracts would go here
  return Promise.resolve();
};

// This function is a placeholder and should be implemented with actual logic for AI integration
export const useAIIntegration = (aiModel: string, inputData: any): any => {
  console.warn('useAIIntegration function is not implemented yet');
  // Logic to integrate with AI models would go here
  return null;
};