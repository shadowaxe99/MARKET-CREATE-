import React from 'react';
import './footer.scss';
import { constants } from '../../utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Elysium Marketplace</h4>
          <p>
            Elysium Marketplace is a leading platform in the creator economy, leveraging blockchain and AI technologies to empower creators and developers.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/marketplace">Marketplace</a></li>
            <li><a href="/collaboration">Collaboration Tools</a></li>
            <li><a href="/ai-tools">AI Integration</a></li>
            <li><a href="/blockchain">Blockchain Integration</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@elysiummarketplace.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Elysium Marketplace. All rights reserved.</p>
        <p>Terms & Conditions | Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;