import React from 'react';
import RiskGauge from './RiskGauge';
import { themes } from '../constants';

const ReportDisplay = ({ analysis, cyberMode, resultsRef, handleCopy, handleDownload }) => {
  
  // --- THEME-AWARE FORMATTER ---
  // This logic highlights "Red Flags" in red
  const formatAnalysis = (text) => {
    if (!text) return null;
    
    return text.split("\n").map((line, index) => {
      // Clean up stars ** from Markdown
      const cleanLine = line.replace(/\*\*/g, "").replace(/\*/g, "");

      // 1. Highlight "Red Flags" or "Risks" in RED
      if (cleanLine.match(/Red Flag/i) || cleanLine.match(/Risk/i)) {
        return (
          <p key={index} style={{ 
            color: "#ff4444", 
            fontWeight: "bold", 
            marginTop: "15px",
            textShadow: cyberMode ? "0 0 5px rgba(255, 0, 0, 0.5)" : "none"
          }}>
            {cleanLine}
          </p>
        );
      }
      // 2. Normal Text
      return (
        <p key={index} style={{ 
          marginBottom: "8px", 
          lineHeight: "1.6", 
          opacity: 0.9 
        }}>
          {cleanLine}
        </p>
      );
    });
  };

  // We'll calculate the score for the RiskGauge here
  const score = parseInt(analysis.match(/Risk Score[:*]*\s*(\d+)/i)?.[1] || 0);

  if (!analysis) return null;
  return (
    <div 
      className="result-box" 
      ref={resultsRef}
      style={{
        backgroundColor: cyberMode ? "rgba(0, 0, 0, 0.8)" : "#fff",
        border: cyberMode ? `1px solid ${themes.cyber.secondary}` : "none",
        boxShadow: cyberMode ? "0 0 25px rgba(0, 255, 255, 0.2)" : "0 4px 15px rgba(0,0,0,0.1)",
        color: cyberMode ? "#fff" : "#333",
        borderRadius: "15px",
        padding: "20px",
        marginTop: "20px",
        transition: "0.5s"
      }}
    >
      {/* --- RISK GAUGE --- */}
      <RiskGauge 
        score={score} 
        cyberMode={cyberMode} 
      />
      
      <h3 className="result-title">📋 DIAGNOSTIC REPORT:</h3>
      <div style={{ textAlign: "left", color: cyberMode ? "#fff" : "#000000" }}>
        {score > 1 
          ? formatAnalysis(analysis) 
          : <div style={{ color: "#28a745", fontWeight: "bold", textAlign: "center", padding: "20px" }}>
              ✅ SYSTEM SCAN COMPLETE: No risks detected.
            </div>
        }
      </div>
      
      <div style={{marginTop: "25px", textAlign: "right", borderTop: "1px solid #444", paddingTop: "15px"}}>
        <button 
          className="btn-download" onClick={handleCopy} 
          style={{marginRight: "10px", backgroundColor: "#333"}}
        >
          📋 COPY TEXT
        </button>
        <button className="btn-download" onClick={handleDownload}>
          💾 SAVE REPORT
        </button>
      </div>
    </div>
  );
};

export default ReportDisplay;