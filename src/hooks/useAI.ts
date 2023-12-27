import { useState, useEffect, useContext } from 'react';
import { AIContext } from '../context/AIContext';
import { ElysiumApi } from '../api/elysiumApi';

interface AIState {
  predictiveText: string[];
  contentModeration: boolean;
  personalizedContent: string[];
  realTimeAnalytics: any;
}

const useAI = () => {
  const [aiState, setAIState] = useState<AIState>({
    predictiveText: [],
    contentModeration: false,
    personalizedContent: [],
    realTimeAnalytics: null,
  });

  const { aiServiceEnabled } = useContext(AIContext);

  useEffect(() => {
    if (aiServiceEnabled) {
      // Fetch AI predictive text suggestions
      ElysiumApi.getPredictiveText()
        .then((data) => {
          setAIState((prevState) => ({
            ...prevState,
            predictiveText: data,
          }));
        })
        .catch((error) => console.error('Error fetching predictive text:', error));

      // Fetch AI personalized content
      ElysiumApi.getPersonalizedContent()
        .then((data) => {
          setAIState((prevState) => ({
            ...prevState,
            personalizedContent: data,
          }));
        })
        .catch((error) => console.error('Error fetching personalized content:', error));

      // Fetch real-time analytics
      ElysiumApi.getRealTimeAnalytics()
        .then((data) => {
          setAIState((prevState) => ({
            ...prevState,
            realTimeAnalytics: data,
          }));
        })
        .catch((error) => console.error('Error fetching real-time analytics:', error));

      // Check content moderation status
      ElysiumApi.getContentModerationStatus()
        .then((status) => {
          setAIState((prevState) => ({
            ...prevState,
            contentModeration: status,
          }));
        })
        .catch((error) => console.error('Error checking content moderation status:', error));
    }
  }, [aiServiceEnabled]);

  return aiState;
};

export default useAI;