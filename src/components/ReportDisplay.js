import React from 'react';
import RiskGauge from './RiskGauge';
import { themes } from '../constants';

const ReportDisplay = ({ analysis, riskScore, loading, cyberMode, resultsRef, handleCopy, handleDownload }) => {
  
  // 1. --- LOADING GUARD ---
  // This prevents the "Safe" message from showing while the AI is still thinking
  if (loading) {
    return (
      <div style={{ 
        textAlign: "center", padding: "50px", 
        color: cyberMode ? themes.cyber.accent : "#4da6ff" 
      }}>
        <div className="loading-pulse">🛡️ AUDITOR IS DISSECTING CLAUSES...</div>
        <p style={{fontSize: "12px", marginTop: "10px", opacity: 0.7}}>Please wait for the official diagnostic.</p>
      </div>
    );
  }

  // 2. --- EMPTY STATE ---
  if (!analysis) return null;

  // 3. --- THEME-AWARE FORMATTER ---
  const formatAnalysis = (text) => {
    return text.split("\n").map((line, index) => {
      const cleanLine = line.replace(/\*\*/g, "").replace(/\*/g, "");

      if (cleanLine.match(/Red Flag/i) || cleanLine.match(/Risk/i)) {
        return (
          <p key={index} style={{ 
            color: "#ff4444", fontWeight: "bold", marginTop: "15px",
            textShadow: cyberMode ? "0 0 5px rgba(255, 0, 0, 0.5)" : "none"
          }}>
            {cleanLine}
          </p>
        );
      }
      return (
        <p key={index} style={{ marginBottom: "8px", lineHeight: "1.6", opacity: 0.9 }}>
          {cleanLine}
        </p>
      );
    });
  };

  return (
    <div 
      className="result-box" 
      ref={resultsRef}
      style={{
        backgroundColor: cyberMode ? "rgba(0, 0, 0, 0.8)" : "#fff",
        border: cyberMode ? `1px solid ${themes.cyber.secondary}` : "none",
        boxShadow: cyberMode ? "0 0 25px rgba(0, 255, 255, 0.2)" : "0 4px 15px rgba(0,0,0,0.1)",
        color: cyberMode ? "#fff" : "#333",
        borderRadius: "15px", padding: "20px", marginTop: "20px", transition: "0.5s"
      }}
    >
      {/* THE ONLY GAUGE: Uses the real score from the hook */}
      <RiskGauge score={riskScore} cyberMode={cyberMode} />
      
      <h3 className="result-title">📋 DIAGNOSTIC REPORT:</h3>
      
      <div style={{ textAlign: "left", color: cyberMode ? "#fff" : "#000" }}>
        {/* Only show "Safe" if the score is actually 0 and not loading */}
        {riskScore > 0 
          ? formatAnalysis(analysis) 
          : <div style={{ color: "#28a745", fontWeight: "bold", textAlign: "center", padding: "20px" }}>
              ✅ SYSTEM SCAN COMPLETE: No risks detected.
            </div>
        }
      </div>
      
      <div style={{marginTop: "25px", textAlign: "right", borderTop: "1px solid #444", paddingTop: "15px"}}>
        <button className="btn-download" onClick={handleCopy} style={{marginRight: "10px", backgroundColor: "#333"}}>
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