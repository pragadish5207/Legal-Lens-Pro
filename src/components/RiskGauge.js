import React from 'react';
import { themes } from '../constants'; // We import our themes from Step 1!

const RiskGauge = ({ score, cyberMode }) => {
  // Logic to calculate the needle rotation
  const rotation = (score * 18) - 90;
  
  let message = "SAFE";
  let color = "#00ff00"; 
  if (score > 3) { message = "MODERATE"; color = "#ffcc00"; } 
  if (score > 7) { message = "DANGER"; color = "#ff0000"; }

  return (
    <div style={{ 
      textAlign: "center", margin: "40px 0", padding: "20px", 
      background: cyberMode ? themes.cyber.card : "#111", 
      borderRadius: "15px", 
      border: cyberMode ? `2px solid ${themes.cyber.accent}` : "1px solid #333",
      boxShadow: cyberMode ? themes.cyber.glow : "none",
      transition: "0.5s"
    }}>
      <h3 style={{ 
        color: cyberMode ? themes.cyber.secondary : "#fff", 
        marginBottom: "10px", fontSize: "18px",
        textShadow: cyberMode ? `0 0 5px ${themes.cyber.secondary}` : "none"
      }}>
        🚀 RISK LEVEL: <span style={{ color: color }}>{message}</span>
      </h3>
      
      {/* The Gauge UI */}
      <div style={{
        width: "200px", height: "100px",
        background: cyberMode 
          ? `linear-gradient(to right, #00ff00, ${themes.cyber.accent}, #ff0000)` 
          : `linear-gradient(to right, #00ff00, #ffcc00, #ff0000)`,
        borderRadius: "100px 100px 0 0",
        position: "relative", margin: "0 auto",
        overflow: "hidden"
      }}>
        <div style={{
          width: "4px", height: "90px",
          backgroundColor: "#fff",
          position: "absolute", bottom: "0", left: "50%",
          transformOrigin: "bottom center",
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          transition: "transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          zIndex: 10,
          boxShadow: "0 0 5px black"
        }} />
      </div>
      <p style={{ 
        marginTop: "15px", fontSize: "24px", fontWeight: "bold", 
        color: cyberMode ? themes.cyber.secondary : "#fff" 
      }}>
        {score}/10
      </p>
    </div>
  );
};

export default RiskGauge;