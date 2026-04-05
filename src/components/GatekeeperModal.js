import React from 'react';

const GatekeeperModal = ({ onAgree }) => {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      backgroundColor: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 10000, padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#111", padding: "40px", borderRadius: "24px",
        maxWidth: "600px", border: "2px solid #ffcc00", textAlign: "center",
        boxShadow: "0 0 40px rgba(255, 204, 0, 0.15)",
        fontFamily: "'Segoe UI', Roboto, sans-serif"
      }}>
        <h2 style={{color: "#ffcc00", marginBottom: "20px", fontWeight: "800", fontSize: "1.6rem"}}>
          ⚖️ LEGAL-LENS PRO: USER AGREEMENT
        </h2>
        
        <div style={{textAlign: "left", color: "#ccc", fontSize: "14px", lineHeight: "1.7", marginBottom: "25px"}}>
          <p style={{marginBottom: "15px", borderBottom: "1px solid #222", paddingBottom: "10px"}}>
            Welcome to <strong>Legal-Lens Pro</strong>. To ensure your safety and compliance, please acknowledge:
          </p>
          <ul style={{marginTop: "10px", paddingLeft: "20px"}}>
            <li style={{marginBottom: "10px"}}><strong>STUDENT PROJECT:</strong> Created by <strong>Pragadishwar</strong> for educational purposes.</li>
            <li style={{marginBottom: "10px"}}><strong>NOT LEGAL ADVICE:</strong> AI analysis can be wrong. Never rely on this for real legal decisions.</li>
            <li style={{marginBottom: "10px"}}><strong>USER RESPONSIBILITY:</strong> All risks, outcomes, and liabilities are strictly your own.</li>
            <li style={{marginBottom: "10px"}}><strong>PRIVACY:</strong> Real-time processing (<strong>DPDP Act 2023</strong> principles). Redact sensitive data before scanning.</li>
            <li style={{ color: "#4facfe", fontWeight: "bold", marginTop: "15px" }}>💻 Best viewed in Desktop Mode for the full dashboard experience.</li>
          </ul>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#777', marginTop: '25px', textAlign: 'center', lineHeight: '1.6', borderTop: '1px solid #222', paddingTop: '20px' }}>
          By clicking 'I Agree', you confirm that you have read and accepted our full 
          <span onClick={() => window.location.href = "/terms"} style={{ color: '#4facfe', textDecoration: 'underline', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' }}>
            Terms of Service
          </span>.
        </p>

        <div style={{display: "flex", gap: "15px", justifyContent: "center", marginTop: "30px"}}>
          <button 
            onClick={onAgree}
            style={{
              padding: "16px 32px", backgroundColor: "#ffcc00", color: "#000",
              border: "none", borderRadius: "12px", fontWeight: "900", cursor: "pointer", 
              fontSize: "15px", transition: "0.3s", boxShadow: "0 4px 15px rgba(255, 204, 0, 0.2)"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            I AGREE & CONTINUE
          </button>
          <button 
            onClick={() => window.location.href = "https://google.com"}
            style={{
              padding: "16px 32px", backgroundColor: "transparent", color: "#ff4444",
              border: "1px solid #ff4444", borderRadius: "12px", cursor: "pointer",
              fontSize: "14px", transition: "0.3s"
            }}
          >
            I DISAGREE (EXIT)
          </button>
        </div>
      </div>
    </div>
  );
};

export default GatekeeperModal;