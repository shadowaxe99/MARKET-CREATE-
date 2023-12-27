import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../../src/components/Navbar/Navbar';
import Footer from '../../src/components/Footer/Footer';
import Marketplace from '../../src/components/Marketplace/Marketplace';
import ScriptPad from '../../src/components/ScriptPad/ScriptPad';
import DigitalAsset from '../../src/components/DigitalAsset/DigitalAsset';
import CollaborationTools from '../../src/components/CollaborationTools/CollaborationTools';
import SecurityFeatures from '../../src/components/SecurityFeatures/SecurityFeatures';
import AIIntegration from '../../src/components/AIIntegration/AIIntegration';
import BlockchainIntegration from '../../src/components/BlockchainIntegration/BlockchainIntegration';

describe('Component Rendering', () => {
  test('Navbar renders correctly', () => {
    render(<Navbar />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('Footer renders correctly', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('Marketplace renders correctly', () => {
    render(<Marketplace />);
    expect(screen.getByTestId('marketplace')).toBeInTheDocument();
  });

  test('ScriptPad renders correctly', () => {
    render(<ScriptPad />);
    expect(screen.getByTestId('scriptPad')).toBeInTheDocument();
  });

  test('DigitalAsset renders correctly', () => {
    render(<DigitalAsset />);
    expect(screen.getByTestId('digitalAsset')).toBeInTheDocument();
  });

  test('CollaborationTools renders correctly', () => {
    render(<CollaborationTools />);
    expect(screen.getByTestId('collaborationTools')).toBeInTheDocument();
  });

  test('SecurityFeatures renders correctly', () => {
    render(<SecurityFeatures />);
    expect(screen.getByTestId('securityFeatures')).toBeInTheDocument();
  });

  test('AIIntegration renders correctly', () => {
    render(<AIIntegration />);
    expect(screen.getByTestId('aiIntegration')).toBeInTheDocument();
  });

  test('BlockchainIntegration renders correctly', () => {
    render(<BlockchainIntegration />);
    expect(screen.getByTestId('blockchainIntegration')).toBeInTheDocument();
  });
});

describe('Component Functionality', () => {
  test('Navbar contains links to all main sections', () => {
    render(<Navbar />);
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
    expect(screen.getByText('Script Pad')).toBeInTheDocument();
    expect(screen.getByText('Digital Assets')).toBeInTheDocument();
    expect(screen.getByText('Collaboration')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('AI Integration')).toBeInTheDocument();
    expect(screen.getByText('Blockchain')).toBeInTheDocument();
  });

  // Add more functionality tests as needed
});