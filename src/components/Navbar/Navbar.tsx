import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { ElysiumMarketplace } from '../../utils/constants';

const Navbar: React.FC = () => {
  return (
    <nav id="navbar" className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          {ElysiumMarketplace}
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/marketplace" className="navbar-item">
            Marketplace
          </Link>
          <Link to="/scriptpad" className="navbar-item">
            Script Pad
          </Link>
          <Link to="/collaboration" className="navbar-item">
            Collaboration Tools
          </Link>
          <Link to="/ai-tools" className="navbar-item">
            AI Integration
          </Link>
          <Link to="/blockchain" className="navbar-item">
            Blockchain Integration
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/login" className="button is-primary">
                <strong>Sign in</strong>
              </Link>
              <Link to="/register" className="button is-light">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;