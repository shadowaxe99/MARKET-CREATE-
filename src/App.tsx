import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Marketplace from './components/Marketplace/Marketplace';
import ScriptPad from './components/ScriptPad/ScriptPad';
import DigitalAsset from './components/DigitalAsset/DigitalAsset';
import CollaborationTools from './components/CollaborationTools/CollaborationTools';
import SecurityFeatures from './components/SecurityFeatures/SecurityFeatures';
import AIIntegration from './components/AIIntegration/AIIntegration';
import BlockchainIntegration from './components/BlockchainIntegration/BlockchainIntegration';
import { ElysiumContextProvider } from './context/ElysiumContext';
import { AIContextProvider } from './context/AIContext';
import { BlockchainContextProvider } from './context/BlockchainContext';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <Router>
      <ElysiumContextProvider>
        <AIContextProvider>
          <BlockchainContextProvider>
            <div className="App">
              <Navbar />
              <Switch>
                <Route exact path="/" component={Marketplace} />
                <Route path="/script-pad" component={ScriptPad} />
                <Route path="/digital-assets" component={DigitalAsset} />
                <Route path="/collaboration-tools" component={CollaborationTools} />
                <Route path="/security-features" component={SecurityFeatures} />
                <Route path="/ai-integration" component={AIIntegration} />
                <Route path="/blockchain-integration" component={BlockchainIntegration} />
                {/* Additional routes can be added here as the platform expands */}
              </Switch>
              <Footer />
            </div>
          </BlockchainContextProvider>
        </AIContextProvider>
      </ElysiumContextProvider>
    </Router>
  );
};

export default App;