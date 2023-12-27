import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ElysiumContextProvider } from './context/ElysiumContext';
import { AIContextProvider } from './context/AIContext';
import { BlockchainContextProvider } from './context/BlockchainContext';

ReactDOM.render(
  <React.StrictMode>
    <ElysiumContextProvider>
      <AIContextProvider>
        <BlockchainContextProvider>
          <App />
        </BlockchainContextProvider>
      </AIContextProvider>
    </ElysiumContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();