import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ElysiumContextProps {
  children: ReactNode;
}

interface ElysiumState {
  // Define the state structure for Elysium Marketplace here
  // This is a placeholder structure and should be replaced with actual state properties
  isAuthenticated: boolean;
  user: any;
  assets: any[];
  transactions: any[];
  // Add more state properties as needed
}

const initialState: ElysiumState = {
  isAuthenticated: false,
  user: null,
  assets: [],
  transactions: [],
  // Initialize with default values as needed
};

interface ContextProps {
  state: ElysiumState;
  setState: React.Dispatch<React.SetStateAction<ElysiumState>>;
}

const ElysiumContext = createContext<ContextProps>({
  state: initialState,
  setState: () => null, // Placeholder function
});

export const ElysiumProvider = ({ children }: ElysiumContextProps) => {
  const [state, setState] = useState<ElysiumState>(initialState);

  return (
    <ElysiumContext.Provider value={{ state, setState }}>
      {children}
    </ElysiumContext.Provider>
  );
};

export const useElysium = () => {
  const context = useContext(ElysiumContext);
  if (!context) {
    throw new Error('useElysium must be used within a ElysiumProvider');
  }
  return context;
};