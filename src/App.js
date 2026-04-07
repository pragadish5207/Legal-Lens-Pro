import './Layout.css';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LEGAL_TIPS, CASE_STUDIES } from './legalData';
import WhyChooseUs from './components/WhyChooseUs';

// --- STYLES & ASSETS ---
import './App.css';
import ScrollToTop from './ScrollToTop';

// --- PAGES ---
import FAQ from './pages/FAQ';
import Updates from './pages/Updates';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import HowToUse from './pages/HowToUse';

// --- DATA & HELPERS ---
import LocalHelp from './LocalHelp';
import { themes, LANGUAGES } from './constants';

// --- NEW COMPONENTS ---
import RiskGauge from './components/RiskGauge';
import GatekeeperModal from './components/GatekeeperModal';
import SuggestionBox from './components/SuggestionBox';
import ReportDisplay from './components/ReportDisplay';

// --- NEW HOOKS (The Brains) ---
import { useContractScanner } from './hooks/useContractScanner';
import { useSidebarData } from './hooks/useSidebarData';

function App() {
  // --- 1. UI & PREFERENCE STATES ---
  const [cyberMode, setCyberMode] = useState(false);
  const [indianLawMode, setIndianLawMode] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [language, setLanguage] = useState("English");

  // --- 2. THE BRAINS (Hooks) ---
  const { 
  tipIndex, 
  caseIndex, 
  totalTips, 
  totalCases, 
  isPlaying, 
  nextTip, 
  prevTip, 
  nextCase, 
  prevCase, 
  togglePlay 
} = useSidebarData();
  
  const {
    manualText, setManualText, files, handleFileChange, previews,
    analysis, riskScore, loading, loadingMessage, apiStatus, modelError,
    resultsRef, analyzeContract, handleClear
  } = useContractScanner(language, indianLawMode);

  // Filter languages for the dropdown list
  const filteredLanguages = LANGUAGES.filter(lang => 
    lang.toLowerCase().startsWith(language.toLowerCase())
  );
  // --- 3. UTILITY HANDLERS ---
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([analysis], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "legal-lens-report.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis);
    alert("✅ Report copied to clipboard!");
  };

  return (
    <Router>
      <div className="App" style={{ 
        backgroundColor: cyberMode ? themes.cyber.bg : themes.pro.bg, 
        color: cyberMode ? themes.cyber.text : themes.pro.text,
        minHeight: "100vh"
      }}>
        <ScrollToTop />
        
        {/* --- GLOBAL RESPONSIVE STYLES --- */}
        <style>{`
          * { box-sizing: border-box !important; }
          body, html, #root {
            width: 100% !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
            margin: 0 !important;
          }
          .App {
            width: 100% !important;
            padding: 20px !important; 
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          @media (max-width: 767px) {
            .App { padding: 15px !important; }
            h1, h2, h3 { width: 100% !important; word-wrap: break-word !important; text-align: center !important; }
            .result-box { width: 100% !important; margin: 10px 0 !important; padding: 15px !important; }
            button { width: 100% !important; margin: 8px 0 !important; }
            button[style*="fixed"] { width: auto !important; margin: 0 !important; }
          }
        `}</style>

        {/* --- NAVIGATION MENU --- */}
        <nav style={{ 
          padding: '20px', textAlign: 'center', borderBottom: '1px solid #333', 
          marginBottom: '20px', position: 'sticky', top: '0', zIndex: '1000', 
          backgroundColor: cyberMode ? themes.cyber.bg : themes.pro.bg 
        }}>
          <Link to="/" style={{ color: '#4da6ff', margin: '0 15px', textDecoration: 'none', fontWeight: 'bold' }}>Scanner (Home)</Link>
          <Link to="/how-to-use" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>How to Use</Link>
          <Link to="/about" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>About</Link>
          <Link to="/faq" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>FAQ</Link>
          <Link to="/contact" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Contact</Link>
          <Link to="/terms" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Terms</Link>
          <Link to="/updates" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Updates</Link>
        </nav>
        <Routes>
          <Route path="/faq" element={<FAQ />} />
          <Route path="/updates" element={<Updates cyberMode={cyberMode} themes={themes} />} />
          <Route path="/how-to-use" element={<><Helmet><title>How to Use - Legal-Lens Pro</title></Helmet><HowToUse /></>} />
          <Route path="/about" element={<><Helmet><title>About - Legal-Lens Pro</title></Helmet><About /></>} />
          <Route path="/contact" element={<><Helmet><title>Contact - Legal-Lens Pro</title></Helmet><Contact /></>} />
          <Route path="/terms" element={<><Helmet><title>Terms - Legal-Lens Pro</title></Helmet><Terms /></>} />
          
          <Route path="/" element={
            <>
              <Helmet>
                <title>Legal-Lens Pro - AI Legal Companion India</title>
                <meta name="description" content="Free AI Legal Assistant in India. Scan contracts for risks, decode legal jargon, and find 750+ District Legal Services Authorities (DLSA) instantly." />
              </Helmet>
              
              {/* --- CYBER-TOGGLE --- */}
              <button 
                onClick={() => setCyberMode(!cyberMode)}
                style={{
                  position: "fixed", top: "20px", right: "20px",
                  backgroundColor: cyberMode ? themes.cyber.accent : "#333",
                  color: "#fff", border: "none", borderRadius: "5px",
                  padding: "10px 15px", cursor: "pointer", zIndex: 1000,
                  boxShadow: cyberMode ? themes.cyber.glow : "none",
                  fontWeight: "bold", transition: "0.3s",
                  border: cyberMode ? `1px solid ${themes.cyber.secondary}` : "none"
                }}
              >
                {cyberMode ? "🚀 PRO MODE" : "🌃 CYBER MODE"}
              </button>

              {/* --- GATEKEEPER MODAL --- */}
              {!hasAgreed && <GatekeeperModal onAgree={() => setHasAgreed(true)} />}

              <h1>
                ⚡ <span className="gradient-text">Legal-Lens Pro</span> ⚡ 
                <span 
                  className={apiStatus === "online" ? "live-pulse" : ""}
                  style={{ fontSize: '12px', verticalAlign: 'middle', marginLeft: '10px', color: apiStatus === "online" ? "#28a745" : "#dc3545" }}
                >
                  ● {apiStatus.toUpperCase()}
                </span>
              </h1>

                <p style={{ color: cyberMode ? themes.cyber.accent : '#007bff', fontSize: '1rem', marginTop: '5px',marginBottom: '30px', textAlign: 'center', opacity: 0.9 }}>
  India's Advanced AI Contract Analyzer | Spot Red Flags Instantly | 50+ Languages & 750+ DLSA Integration
</p>

              <div className="legal-lens-layout">
  {/* A. LEFT SIDEBAR: LEGAL TIPS */}
  <aside className="sidebar-sticky" style={{ 
    borderLeft: cyberMode ? `3px solid ${themes.cyber.accent}` : "3px solid #007bff",
    boxShadow: cyberMode ? themes.cyber.glow : "none" 
  }}>
    <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: cyberMode ? themes.cyber.secondary : '#4da6ff' }}>
      ⚖️ LEGAL TIPS 
      <span style={{ fontSize: '0.8rem', opacity: 0.7, marginLeft: '10px' }}>
        ({tipIndex + 1}/{totalTips})
      </span>
    </h3>
    
    <div className="sidebar-card">{LEGAL_TIPS[tipIndex]}</div>

    {/* --- NEW: SIDEBAR CONTROLS --- */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
      <button onClick={prevTip} className="sidebar-ctrl-btn">⏮️</button>
      <button onClick={togglePlay} className="sidebar-ctrl-btn">
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      <button onClick={nextTip} className="sidebar-ctrl-btn">⏭️</button>
    </div>
  </aside>

  {/* B. CENTER COLUMN: THE MAIN SCANNER */}
  <main className="main-scanner-content">
    {/* --- SYSTEM ERROR DISPLAY --- */}
    {modelError && (
      <div style={{ 
        backgroundColor: "#2d0a0a", padding: "10px", margin: "10px auto", 
        borderRadius: "5px", maxWidth: "600px", fontSize: "12px", 
        border: "1px solid #ff4444", color: "#ff8888" 
      }}>
        <strong>🚨 SYSTEM ERROR:</strong> {modelError}
      </div>
    )}

    {/* --- UPLOAD SECTION --- */}
    <div className="upload-box">
      <input 
        type="file" multiple accept="image/*,application/pdf" 
        onChange={handleFileChange} 
      />
      <p style={{marginTop: "10px", fontSize: "12px", color: "#888"}}>
        (Supports: JPG, PNG, PDF)
      </p>
    </div>

    {/* --- PREVIEW GALLERY --- */}
    <div className="preview-container">
      {previews.map((file, index) => (
        <div key={index} className="preview-item">
          {file.type.includes("image") ? (
            <img src={file.url} alt="preview" style={{width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px"}} />
          ) : (
            <div style={{
              width: "80px", height: "80px", display: "flex", alignItems: "center", 
              justifyContent: "center", flexDirection: "column", color: "#e0e0e0"
            }}>
              📄 <span style={{fontSize: "9px", marginTop: "5px"}}>{file.name.substring(0, 10)}...</span>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* --- MANUAL TEXT INPUT AREA --- */}
    <textarea
      placeholder="Or paste your contract text, email, or WhatsApp message here..."
      value={manualText}
      onChange={(e) => setManualText(e.target.value)}
      style={{
        width: "100%", height: "120px", marginTop: "20px", padding: "15px",
        backgroundColor: "#1a1a1a", color: "#fff", border: "1px dashed #555", borderRadius: "10px",
        fontSize: "14px", fontFamily: "monospace"
      }}
    />

    {/* --- ACTION BUTTONS & SETTINGS --- */}
    <div style={{ display: "flex", justifyContent: "center", gap: "15px", margin: "20px 0", flexWrap: "wrap" }}>
      <div style={{ display: "inline-block" }}>
        <input 
          list="language-options" 
          placeholder="Type language..." 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "10px", borderRadius: "5px", border: "1px solid #444",
            backgroundColor: "#222", color: "#fff", width: "150px", fontSize: "14px"
          }}
        />
        <datalist id="language-options">
          {filteredLanguages.map((lang) => (
            <option key={lang} value={lang} />
          ))}
        </datalist>
      </div>

      <label style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#fff" }}>
        <input 
          type="checkbox" 
          checked={indianLawMode} 
          onChange={(e) => setIndianLawMode(e.target.checked)}
          style={{ marginRight: "8px", transform: "scale(1.2)" }}
        />
        Indian Law Mode
      </label>

      <button className="btn-scan" onClick={analyzeContract} disabled={loading}>
        {loading ? `⏳ ${loadingMessage}` : `🔍 SCAN FILES`}
      </button>

      <button className="btn-clear" onClick={handleClear}>
        🗑️ RESET
      </button>
    </div>

    {/* --- RESULTS & REPORTS --- */}
    <ReportDisplay 
      analysis={analysis}
      riskScore={riskScore}
      loading={loading}
      cyberMode={cyberMode}
      resultsRef={resultsRef}
      handleCopy={handleCopy}
      handleDownload={handleDownload}
    />

<WhyChooseUs cyberMode={cyberMode} themes={themes} />

    <SuggestionBox />

    <div className="section-container" style={{ maxWidth: '600px', margin: '20px auto' }}>
      <LocalHelp cyberMode={cyberMode} />
    </div>
  </main>

  {/* C. RIGHT SIDEBAR: CASE STUDIES */}
  <aside className="sidebar-sticky" style={{ 
    borderLeft: cyberMode ? `3px solid ${themes.cyber.secondary}` : "3px solid #ff00ff",
    boxShadow: cyberMode ? themes.cyber.glow : "none" 
  }}>
    <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: cyberMode ? themes.cyber.secondary : '#ff00ff' }}>
      📖 CASE STUDIES 
      <span style={{ fontSize: '0.8rem', opacity: 0.7, marginLeft: '10px' }}>
        ({caseIndex + 1}/{totalCases})
      </span>
    </h3>
    <div className="sidebar-card" style={{ borderLeftColor: cyberMode ? themes.cyber.secondary : "#ff00ff" }}>
      <p style={{ color: "#fff", fontSize: "15px", lineHeight: "1.5", marginBottom: "15px" }}>
        {CASE_STUDIES[caseIndex]}
      </p>
      
      {/* VERIFY BUTTON */}
      <button 
        className="search-verify-btn"
        onClick={() => {
          const query = CASE_STUDIES[caseIndex];
          window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }}
      >
        <span>🔍</span> VERIFY ON GOOGLE
      </button>

      {/* --- NEW: SIDEBAR CONTROLS --- */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        <button onClick={prevCase} className="sidebar-ctrl-btn">⏮️</button>
        <button onClick={togglePlay} className="sidebar-ctrl-btn">
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={nextCase} className="sidebar-ctrl-btn">⏭️</button>
      </div>
    </div>
  </aside>
</div>
            </>
          } />
        </Routes>

        {/* --- FOOTER: Professional Branding --- */}
        <footer style={{ 
          marginTop: "100px", padding: "50px 20px", borderTop: "1px solid #444", 
          fontSize: "16px", color: "#999", textAlign: "center", lineHeight: "2"
        }}>
          <p style={{ maxWidth: "800px", margin: "0 auto 20px auto" }}>
            ⚠️ <strong>LEGAL DISCLAIMER:</strong> This AI tool is for general info only and not professional legal advice.
          </p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            © 2026 <span className="gradient-text">Pragadishwar</span> — Built with Google Gemini API
          </p>
          <p style={{ fontSize: "12px", color: "#555", marginTop: "10px" }}>
            AI Classroom Foundation Graduate | Generative AI Mastermind
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;