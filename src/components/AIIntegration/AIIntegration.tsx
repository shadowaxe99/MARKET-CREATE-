import React, { useContext, useEffect, useState } from 'react';
import { AIContext } from '../../context/AIContext';
import { useElysium } from '../../hooks/useElysium';
import './AIIntegration.scss';

interface AIIntegrationProps {
  documentType: string;
}

const AIIntegration: React.FC<AIIntegrationProps> = ({ documentType }) => {
  const { AIIntegration } = useContext(AIContext);
  const { fetchAnalytics, moderateContent, personalizeContent, convertVoiceToText } = useElysium();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [moderatedContent, setModeratedContent] = useState('');
  const [personalizedContent, setPersonalizedContent] = useState('');
  const [transcribedText, setTranscribedText] = useState('');

  useEffect(() => {
    if (documentType) {
      AIIntegration(documentType).then((aiResponse) => {
        // Handle AI response for the specific document type
      });
    }
  }, [documentType, AIIntegration]);

  const handleAnalytics = async () => {
    const data = await fetchAnalytics();
    setAnalyticsData(data);
  };

  const handleModeration = async (content: string) => {
    const moderated = await moderateContent(content);
    setModeratedContent(moderated);
  };

  const handlePersonalization = async (userId: string) => {
    const content = await personalizeContent(userId);
    setPersonalizedContent(content);
  };

  const handleVoiceToText = async (audio: Blob) => {
    const text = await convertVoiceToText(audio);
    setTranscribedText(text);
  };

  return (
    <div className="ai-integration">
      <h2>AI Integration</h2>
      <div>
        <button onClick={handleAnalytics}>Get Analytics</button>
        {analyticsData && <div>{JSON.stringify(analyticsData)}</div>}
      </div>
      <div>
        <button onClick={() => handleModeration('Sample content to moderate')}>Moderate Content</button>
        <p>{moderatedContent}</p>
      </div>
      <div>
        <button onClick={() => handlePersonalization('user-id')}>Personalize Content</button>
        <p>{personalizedContent}</p>
      </div>
      <div>
        <button onClick={() => handleVoiceToText(new Blob())}>Convert Voice to Text</button>
        <p>{transcribedText}</p>
      </div>
    </div>
  );
};

export default AIIntegration;