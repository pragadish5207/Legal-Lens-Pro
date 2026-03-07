import LocalHelp from './LocalHelp';
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';
import ScrollToTop from './ScrollToTop';
// React Router imports
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importing your new pages
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import HowToUse from './pages/HowToUse';
// ---  THEME COLOR DEFINITIONS ---
const themes = {
  pro: {
    bg: "#121212",
    accent: "#007bff", // Professional Blue
    card: "#1a1a1a",
    text: "#ffffff"
  },
  cyber: {
    bg: "#050505",
    accent: "#ff00ff", // Neon Pink
    secondary: "#00ffff", // Electric Cyan
    card: "#000",
    text: "#00ffff",
    glow: "0 0 15px #ff00ff"
  }
};

// --- GLOBAL LANGUAGE LIST (50+ Languages) ---
const LANGUAGES = [
  "English", "Hindi", "Gujarati", "Tamil", "Telugu", "Kannada", "Malayalam", 
  "Marathi", "Bengali", "Punjabi", "Urdu", "Odia", "Assamese", "Maithili", "Sanskrit",
  "Spanish", "French", "German", "Mandarin Chinese", "Japanese", "Korean", 
  "Russian", "Arabic", "Portuguese", "Italian", "Dutch", "Turkish", 
  "Vietnamese", "Thai", "Indonesian", "Polish", "Ukrainian", "Hebrew", 
  "Swedish", "Norwegian", "Danish", "Finnish", "Greek", "Hungarian", "Czech",
  "Romanian", "Bulgarian", "Serbian", "Croatian", "Slovak", "Lithuanian",
  "Latvian", "Estonian", "Slovenian", "Persian", "Pashto", "Swahili", "Amharic"
];

// --- GLOBAL CONFIGURATION ---
// Initializing the API key and library outside the component to prevent re-initialization on every render.
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);



// --- 2. RISK GAUGE COMPONENT ---
const RiskGauge = ({ score, cyberMode }) => {
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
      
      {/* The Gauge */}
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

function App() {

  
  // --- NEW: INDIAN LAW MODE STATE ---
  const [indianLawMode, setIndianLawMode] = useState(false);
  // --- 1. STATE MANAGEMENT ---
  // Core application states for files and results
  // --- NEW: MANUAL TEXT INPUT STATE ---
  const [manualText, setManualText] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Scanning document...");
  
  // UI and Feature states
  const [availableModels, setAvailableModels] = useState([]);
  const [modelError, setModelError] = useState("");
  const [hasAgreed, setHasAgreed] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  // --- NEW: LANGUAGE STATE ---
  const [language, setLanguage] = useState("English");
  const filteredLanguages = LANGUAGES.filter(lang => 
    lang.toLowerCase().startsWith(language.toLowerCase())
  );
  const [apiStatus, setApiStatus] = useState("checking"); // States: "checking", "online", or "offline"
  // --- NEW: CYBERPUNK THEME STATE ---
  const [cyberMode, setCyberMode] = useState(false);
  // Refs for UI manipulation
  const resultsRef = useRef(null);

  // --- 2. EFFECT: API HEALTH CHECK ---
  // This runs once on mount to verify if the Gemini API is reachable.
  useEffect(() => {
    const checkAPI = async () => {
      try {
        // We perform a lightweight "ping" to verify the connection
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("ping"); 
        const response = await result.response;
        
        if (response.text()) {
          setApiStatus("online");
        }
      } catch (error) {
        console.error("API Health Check Failed:", error);
        // Only set to offline if the error is specifically about the API Key
        if (error.message && error.message.includes("API_KEY_INVALID")) {
           setApiStatus("offline");
        } else {
           // For temporary network glitches, we assume online to allow the user to try scanning
           setApiStatus("online"); 
        }
      }
    };
    checkAPI();
  }, []);

  // --- 3. EFFECT: AUTOMATIC MODEL CHECKER ---
  // Fetches the list of models your specific API key has access to.
  useEffect(() => {
    const checkModels = async () => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch models");
        
        const data = await response.json();
        
        // We filter the list to find only models that support content generation
        const validModels = data.models?.filter(m => 
          m.supportedGenerationMethods.includes("generateContent")
        );
        
        setAvailableModels(validModels || []);
      } catch (err) {
        console.error("Model Check Failed:", err);
        setModelError("Could not verify models. Check your Vercel/Local environment variables.");
      }
    };

    if (API_KEY) {
      checkModels();
    }
  }, [API_KEY]);

  // --- 4. EFFECT: AUTO-SCROLL TO RESULTS ---
  // Automatically scrolls the page to the diagnostic report once it is generated.
  useEffect(() => {
    if (analysis && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis]);

  // --- 5. EFFECT: LOADING MESSAGE CYCLE ---
  // Rotates through different messages while the AI is thinking to keep the user engaged.
  useEffect(() => {
    let interval;
    if (loading) {
      const messages = [
        "Reading file content...",
        "Analyzing legal jargon...",
        "Identifying high-risk clauses...",
        "Checking for red flags...",
        "Scanning for hidden liabilities...",
        "Finalizing your diagnostic report..."
      ];
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % messages.length;
        setLoadingMessage(messages[i]);
      }, 2500); // Changes message every 2.5 seconds
    }
    return () => clearInterval(interval); // Cleanup when loading stops
  }, [loading]);

  // --- 6. HANDLER: FILE UPLOAD & PREVIEW ---
  // Processes selected files and creates local URLs for the preview gallery.
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      const newPreviews = selectedFiles.map(file => ({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      }));
      setPreviews(newPreviews);
      setAnalysis(""); // Clears old analysis when new files are chosen
    }
  };
  // --- 7. HANDLER: RESET THE DASHBOARD ---
  // Completely wipes all files, previews, and analysis to start fresh.
  const handleClear = () => {
    setFiles([]);
    setPreviews([]);
    setAnalysis("");
  };

  // --- 8. HANDLER: SAVE TO DEVICE ---
  // Converts the AI's diagnostic report into a .txt file for the user to keep.
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([analysis], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "legal-lens-report.txt";
    document.body.appendChild(element);
    element.click();
  };

  // --- 9. HANDLER: QUICK COPY ---
  // Copies the entire analysis to the clipboard for easy sharing.
  const handleCopy = () => {
    navigator.clipboard.writeText(analysis);
    alert("✅ Report copied to clipboard!");
  };

  // --- 10. HANDLER: FEEDBACK SYSTEM ---
  // Captures and "sends" suggestions.
  const handleSendSuggestion = () => {
    if (!suggestion.trim()) return;
    const subject = "Feedback for Legal-Lens Pro";
    const body = `Hey Dev, here is my feedback:\n\n${suggestion}`;
    window.location.href = `mailto:pragadishwar5207@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSuggestion(""); // Clears the box after sending
    alert("Opening your email client to send feedback!");
  };
  

  // --- 11. HELPER: FILE PREPARATION ---
  // Converts standard browser files into the base64 format Gemini requires.
  const fileToGenerativePart = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // --- 12. CORE LOGIC: THE AI SCANNER ---
  // The primary function that sends data to Gemini and retrieves the report.
  const analyzeContract = async () => {
   // 1. VALIDATION: Check if user provided EITHER a file OR text
      if (files.length === 0 && !manualText) {
        alert("⚠️ SYSTEM ALERT: Please upload a file OR paste some text to begin!");
        return;
      }

    setLoading(true);
    // Initial status update for the user
    setAnalysis(`Analyzing ${files.length} document(s)... Please wait for the system to process...`);

    try {
      // ⚠️ DYNAMIC MODEL SELECTION: 
      // Uses the first available model found on mount, or falls back to 'gemini-1.5-flash'.
      const modelName = availableModels.length > 0 
        ? availableModels[0].name.replace("models/", "") 
        : "gemini-1.5-flash";
      
      console.log("System Status: Active. Model in use:", modelName);
      
      const model = genAI.getGenerativeModel({ model: modelName });

      // Convert all uploaded files simultaneously
      // 2. PREPARE DATA: Convert files
      const fileParts = await Promise.all(files.map(fileToGenerativePart));

      // 3. SMART PROMPT: Handles Files + Text + Indian Law
      const prompt = `You are an expert Lawyer${indianLawMode ? " specializing in INDIAN LAW (Indian Contract Act, 1872)" : ""}. 
      Analyze the following legal content (${files.length} files and/or pasted text).
      
      CRITICAL INSTRUCTION: Output the entire report in ${language} language.
      
      ${indianLawMode ? "IMPORTANT: Verify clauses against 'Indian Contract Act, 1872'. SCAM ALERT: Check for 'Security Deposit' or 'Training Fees'. If found, label as '🚨 KNOWN SCAM PATTERN'." : ""}

      For the content provided:
      1. Identify the Document Name (or "Pasted Text").
      2. Find 'Red Flags'. Label as "⚠️ Red Flag:" (keep English).
      3. Explain risk in ${language} in 1 sentence.
      4. Give 'Risk Score' (0-10) labeled as "🔥 Risk Score:" (keep English).
      
      Format cleanly.`;

      // 4. EXECUTE: Send Prompt + Files + Text to Gemini
      const result = await model.generateContent([prompt, ...fileParts, manualText]);
      const response = await result.response;
      let text = response.text();
      
      setAnalysis(text);
    } catch (error) {
      console.error("Critical Scanner Error:", error);
      setAnalysis("❌ SYSTEM FAILURE: Unable to process documents. " + error.toString());
    }

    setLoading(false);
  };

 // --- FIX: THEME-AWARE FORMATTER ---
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
      
      // 2. Normal Text - NO FORCED COLOR (Inherits from Parent)
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

  // --- 14. THE MAIN VISUAL COMPONENT ---
  return (
    <Router>
      <ScrollToTop />
    <div className="App" style={{ 
      
      backgroundColor: cyberMode ? themes.cyber.bg : themes.pro.bg, 
      color: cyberMode ? themes.cyber.text : themes.pro.text,
      minHeight: "100vh",
      transition: "all 0.5s ease", // Smooth fade between modes
      padding: "20px"
    }}>
{/* --- NUCLEAR RESPONSIVE FIX (Forces Padding Everywhere) --- */}
      <style>{`
        /* 1. GLOBAL RESET: Force everything to stay inside the box */
        * { box-sizing: border-box !important; }
        
        body, html, #root {
          width: 100% !important;
          max-width: 100vw !important;
          overflow-x: hidden !important; /* Kills the side-scroll */
          margin: 0 !important;
        }

        /* 2. THE APP CONTAINER: The "Safe Zone" */
        .App {
          width: 100% !important;
          padding: 20px !important; /* THIS IS THE GAP YOU WANT */
          display: flex;
          flex-direction: column;
          align-items: center; /* Centers everything */
        }

        /* 3. MOBILE SPECIFIC (Phones) */
        @media (max-width: 767px) {
          .App { padding: 15px !important; } /* Safe gap on small phones */
          
          /* Force the header to wrap if it's too long */
          h1, h2, h3 { 
            width: 100% !important;
            word-wrap: break-word !important;
            text-align: center !important; 
          }

          /* Force the result box to fit */
          .result-box {
            width: 100% !important;
            margin: 10px 0 !important;
            padding: 15px !important;
          }

          /* Stack the buttons */
          button {
            width: 100% !important;
            margin: 8px 0 !important;
          }
          /* Keep Cyber Toggle small */
          button[style*="fixed"] { width: auto !important; margin: 0 !important; }
        }
      `}</style>
      {/* --- NAVIGATION MENU --- */}
<nav style={{ 
  padding: '20px', 
  textAlign: 'center', 
  borderBottom: '1px solid #333', 
  marginBottom: '20px',
  position: 'sticky',   // This keeps it at the top
  top: '0',            // Distance from the top
  zIndex: '1000',      // Ensures it stays above other elements
  backgroundColor: cyberMode ? themes.cyber.bg : themes.pro.bg // Matches your theme
}}>
  <Link to="/" style={{ color: '#4da6ff', margin: '0 15px', textDecoration: 'none', fontWeight: 'bold' }}>Scanner (Home)</Link>
  <Link to="/how-to-use" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>How to Use</Link>
  <Link to="/about" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>About</Link>
  <Link to="/contact" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Contact</Link>
  <Link to="/terms" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Terms</Link>
</nav>
<Routes>
  <Route path="/how-to-use" element={<HowToUse />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/terms" element={<Terms />} />
  <Route path="/" element={
    <>
    {/* ---  CYBER-TOGGLE BUTTON --- */}
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
      {/* --- GATEKEEPER MODAL: Safety First --- */}
      {!hasAgreed && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 10000, padding: "20px"
        }}>
          <div style={{
            backgroundColor: "#1a1a1a", padding: "40px", borderRadius: "20px",
            maxWidth: "600px", border: "2px solid #ffcc00", textAlign: "center",
            boxShadow: "0 0 30px rgba(255, 204, 0, 0.2)"
          }}>
            <h2 style={{color: "#ffcc00", marginBottom: "20px"}}>⚖️ LEGAL-LENS PRO: USER AGREEMENT</h2>
            
            <div style={{textAlign: "left", color: "#ddd", fontSize: "14px", lineHeight: "1.6", marginBottom: "30px"}}>
              <p>Welcome to <strong>Legal-Lens Pro</strong>. Before you proceed, please understand:</p>
              <ul style={{marginTop: "10px"}}>
                <li>This is a student project created by <strong>Pragadishwar</strong> for educational purposes only.</li>
                <li><strong>NOT LEGAL ADVICE:</strong> AI analysis can be wrong. Never rely on this for real legal decisions.</li>
                <li><strong>USER RESPONSIBILITY:</strong> All risks, outcomes, and liabilities from using this tool are strictly your own.</li>
                <li><strong>PRIVACY:</strong> Do not upload documents containing sensitive personal data.</li>
              </ul>
            </div>

            <div style={{display: "flex", gap: "15px", justifyContent: "center"}}>
              <button 
                onClick={() => setHasAgreed(true)}
                style={{
                  padding: "15px 30px", backgroundColor: "#ffcc00", color: "#000",
                  border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "16px"
                }}
              >
                I AGREE & CONTINUE
              </button>
              <button 
                onClick={() => window.location.href = "https://google.com"}
                style={{
                  padding: "15px 30px", backgroundColor: "transparent", color: "#ff4444",
                  border: "1px solid #ff4444", borderRadius: "8px", cursor: "pointer"
                }}
              >
                I DISAGREE (EXIT)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER SECTION --- */}
      <h1>
        ⚡ Legal-Lens Pro ⚡ 
        <span 
  className={apiStatus === "online" ? "live-pulse" : ""}
  style={{ 
    fontSize: '12px', 
    verticalAlign: 'middle', 
    marginLeft: '10px',
    transition: "color 0.3s ease",
    color: apiStatus === "online" ? "#28a745" : apiStatus === "offline" ? "#dc3545" : "#ffc107"
  }}
>
  ● {apiStatus.toUpperCase()}
</span>
      </h1>
      <p style={{ color: "#aaa", marginBottom: "30px" }}>AI-Powered Contract Analysis & Risk Detection</p>
      
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

      {/* --- ACTION BUTTONS --- */}
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
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", margin: "20px 0" }}>
       {/* --- LANGUAGE SELECTOR --- */}
       {/* PASTE THIS NEW SEARCH BAR HERE */}
<div style={{ display: "inline-block", marginRight: "10px" }}>
  <input 
    list="language-options" 
    placeholder="Type language..." 
    value={language} 
    onChange={(e) => setLanguage(e.target.value)}
    style={{
      padding: "10px", borderRadius: "5px", border: "1px solid #444",
      backgroundColor: "#222", color: "#fff", width: "150px",
      cursor: "text", fontSize: "14px"
    }}
  />
  <datalist id="language-options">
    {filteredLanguages.map((lang) => (
      <option key={lang} value={lang} />
    ))}
  </datalist>
</div>
{/* --- INDIAN LAW TOGGLE --- */}
        <label style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#fff", marginRight: "10px" }}>
          <input 
            type="checkbox" 
            checked={indianLawMode} 
            onChange={(e) => setIndianLawMode(e.target.checked)}
            style={{ marginRight: "8px", transform: "scale(1.2)", cursor: "pointer" }}
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

      {/* --- RESULTS SECTION: The Colorful Diagnostic --- */}
      {analysis && !loading && (
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
          {/* --- UPDATE: PASS CYBER MODE TO GAUGE --- */}
     <RiskGauge 
  score={parseInt(analysis.match(/Risk Score[:*]*\s*(\d+)/i)?.[1] || 0)} 
  cyberMode={cyberMode} 
/>
          <h3 className="result-title">📋 DIAGNOSTIC REPORT:</h3>
      <div style={{ textAlign: "left", color: cyberMode ? "#fff" : "#000000" }}>
  {analysis ? (
   (parseInt(analysis.match(/Risk Score[:*]*\s*(\d+)/i)?.[1] || 0) > 1)
   
      ? formatAnalysis(analysis) 
      : <div style={{ color: "#28a745", fontWeight: "bold", textAlign: "center", padding: "20px" }}>
          ✅ SYSTEM SCAN COMPLETE: No risks detected.
        </div>
  ) : null}
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
      )}

      {/* --- SUGGESTION BOX: Developer Feedback --- */}
      <div style={{
        marginTop: "60px", padding: "20px", backgroundColor: "#111", 
        borderRadius: "10px", border: "1px solid #333", maxWidth: "600px", 
        margin: "60px auto", textAlign: "center"
      }}>
        <h4 style={{color: "#007bff", marginBottom: "10px"}}>💡 Have a suggestion?</h4>
        <textarea 
          placeholder="Help me improve Legal-Lens! Type your feedback here..."
          value={suggestion} onChange={(e) => setSuggestion(e.target.value)}
          style={{
            width: "100%", height: "80px", backgroundColor: "#222", color: "#fff",
            border: "1px solid #444", borderRadius: "5px", padding: "10px", 
            fontSize: "14px", resize: "none", marginBottom: "10px", outline: "none"
          }}
        />
        <button onClick={handleSendSuggestion} className="btn-send-suggestion">
          SEND FEEDBACK
        </button>
      </div>
{/* --- ADD THE NEW COMPONENT HERE --- */}
      <div className="section-container" style={{ maxWidth: '600px', margin: '20px auto' }}>
        <LocalHelp cyberMode={cyberMode} />
      </div>
      </>
  } />
</Routes>
      {/* --- FOOTER: Professional Branding --- */}
      <footer style={{ 
        marginTop: "80px", padding: "30px", borderTop: "1px solid #333", 
        fontSize: "12px", color: "#666", textAlign: "center", lineHeight: "1.8"
      }}>
        <p>⚠️ <strong>LEGAL DISCLAIMER:</strong> This AI tool provides general information and is not a substitute for professional legal advice.</p>
        <p style={{ color: "#007bff", fontWeight: "bold" }}>© 2026 Pragadishwar - Built with Google Gemini API</p>
      </footer>
    </div>
  </Router>
  );


}
export default App;