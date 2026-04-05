import { useState, useEffect, useRef } from 'react';
import { LOADING_MESSAGES } from '../constants';

export const useContractScanner = (language, indianLawMode) => {
  // --- 1. STATE MANAGEMENT ---
  const [manualText, setManualText] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [riskScore, setRiskScore] = useState(0); // Added: Tracks the 0-10 numeric score
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Scanning document...");
  const [modelError, setModelError] = useState("");
  const [apiStatus, setApiStatus] = useState("online");
  const resultsRef = useRef(null);

  // --- 2. LOADING MESSAGE CYCLE ---
  useEffect(() => {
    let interval;
    if (loading) {
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % LOADING_MESSAGES.length;
        setLoadingMessage(LOADING_MESSAGES[i]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // --- 3. AUTO-SCROLL ---
  useEffect(() => {
    if (analysis && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis]);

  // --- 4. HANDLER: FILE UPLOAD & PREVIEW ---
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
      setAnalysis(""); 
      setRiskScore(0); // Reset score on new file
    }
  };

  // --- 5. HANDLER: RESET ---
  const handleClear = () => {
    setFiles([]);
    setPreviews([]);
    setAnalysis("");
    setManualText("");
    setRiskScore(0);
  };

  // --- 6. HELPER: FILE PREPARATION ---
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

  // --- 7. CORE LOGIC: THE AI SCANNER ---
  const analyzeContract = async () => {
    if (files.length === 0 && !manualText) {
      alert("⚠️ SYSTEM ALERT: Please upload a file OR paste some text to begin!");
      return;
    }

    setLoading(true);
    setAnalysis(`Analyzing ${files.length} document(s)... Please wait...`);

    try {
      const fileParts = await Promise.all(files.map(fileToGenerativePart));

      const finalPrompt = `### ROLE
You are a "Predatory Clause Hunter" and Senior High Court Auditor with 30 years of experience. You have ZERO tolerance for traps or absurd demands.

### MANDATORY OUTPUT FORMAT
1. You MUST start your response with this exact tag: [RISK_SCORE: X/10] (Replace X with 0-10 score).
2. Follow the tag with a professional "DIAGNOSTIC REPORT."

### CRITICAL AUDIT RULES
- **ABSURDITY:** If a clause mentions "souls," "tigers," "first-born children," or "physically impossible" demands, flag as 10/10 RISK.
- **QUIET ENJOYMENT:** Flag any noise/drilling during sleeping hours (10PM-7AM) as 9/10 RISK.
- **UNCERTAINTY:** (INDIAN LAW MODE: ${indianLawMode ? "ACTIVE" : "INACTIVE"})
${indianLawMode ? `VETO agreements lacking "Certainty" (Section 29, Indian Contract Act). CITE sections.` : ""}

### AUDIT EXECUTION
Analyze the content with "Extreme Prejudice." Output in ${language}.

${manualText ? `\n\nTEXT TO ANALYZE:\n${manualText}` : ""}`;

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [
              { text: finalPrompt },
              ...fileParts.map(p => p.inlineData ? p : { text: "" }) 
            ] 
          }]
        })
      });

      if (!response.ok) throw new Error("Server responded with an error.");

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis generated.";

      // --- NEW: SCORE EXTRACTION LOGIC ---
      // This looks for the [RISK_SCORE: X/10] tag in the AI response
      const scoreMatch = resultText.match(/\[RISK_SCORE:\s*(\d+)/i);
      const extractedScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;
      setRiskScore(extractedScore); 

      // Clean the text: remove the [RISK_SCORE] tag so the user doesn't see it in the report
      const cleanedReport = resultText.replace(/\[RISK_SCORE:.*?\]/g, "").trim();
      setAnalysis(cleanedReport);

    } catch (error) {
      setAnalysis("❌ SYSTEM FAILURE: Unable to process documents. " + error.toString());
    }
    setLoading(false);
  };

  // --- 8. THE TOOLKIT ---
  return {
    manualText,
    setManualText,
    files,
    handleFileChange,
    previews,
    analysis,
    riskScore, // Added: Make sure your RiskGauge component uses this!
    loading,
    loadingMessage,
    apiStatus,
    modelError,
    resultsRef,
    analyzeContract,
    handleClear
  };
};