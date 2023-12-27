import React, { useState, useContext, useEffect } from 'react';
import { AIContext } from '../../context/AIContext';
import './scriptpad.scss';

interface ScriptPadProps {
  onSave: (content: string) => void;
}

const ScriptPad: React.FC<ScriptPadProps> = ({ onSave }) => {
  const [content, setContent] = useState<string>('');
  const { AIIntegration } = useContext(AIContext);

  useEffect(() => {
    // Initialize AI-powered features on component mount
    AIIntegration.initialize();
  }, [AIIntegration]);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSave = () => {
    onSave(content);
    // Reset content after save
    setContent('');
  };

  const handlePredictiveText = () => {
    const prediction = AIIntegration.predictText(content);
    setContent(content + prediction);
  };

  const handleFormatting = () => {
    const formattedContent = AIIntegration.autoFormat(content);
    setContent(formattedContent);
  };

  return (
    <div id="scriptPad" className="script-pad">
      <h2>AI-Powered Script Pad</h2>
      <textarea
        className="script-pad__textarea"
        value={content}
        onChange={handleContentChange}
        placeholder="Start typing your script here..."
      />
      <div className="script-pad__buttons">
        <button onClick={handlePredictiveText}>Predictive Text</button>
        <button onClick={handleFormatting}>Auto-Format</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ScriptPad;