import { useState, useEffect, useRef } from 'react';
import { LOADING_MESSAGES } from '../constants';

export const useContractScanner = (language, indianLawMode) => {
  // --- 1. STATE MANAGEMENT ---
  const [manualText, setManualText] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [riskScore, setRiskScore] = useState(0); 
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
      setRiskScore(0); 
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

      // --- STRICT UPDATED PROMPT ---
      const finalPrompt = `### ROLE
You are "Legal-Lens AI," an advanced automated contract analysis system. Your purpose is to identify high-risk, predatory, or legally questionable clauses for educational review.

### MANDATORY DISCLAIMER
Every response MUST begin with this exact text: "⚠️ AI-GENERATED ANALYSIS: This report is for educational purposes only and DOES NOT constitute legal advice. I am an AI, not a lawyer or a court official."

### MANDATORY OUTPUT FORMAT
1. You MUST start your response with this exact tag: [RISK_SCORE: X/10] (Replace X with 0-10 score).
2. Follow the tag with an "AI DIAGNOSTIC REPORT."

### CRITICAL AUDIT RULES
- **IDENTITY:** Never claim to be a Judge, Auditor, or Human Official. You are software.
- **ABSURDITY:** If a clause mentions "souls," "tigers," "first-born children," or "physically impossible" demands, flag as 10/10 RISK.
- **QUIET ENJOYMENT:** Flag any noise/drilling during sleeping hours (10PM-7AM) as 9/10 RISK.
- **UNCERTAINTY:** (INDIAN LAW MODE: ${indianLawMode ? "ACTIVE" : "INACTIVE"})
${indianLawMode ? `Analyze based on "Certainty" (Section 29, Indian Contract Act). CITE sections as an AI-powered reference.` : ""}

### AUDIT EXECUTION
Analyze the content strictly and professionally. Output in ${language}.

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

      // --- SCORE EXTRACTION LOGIC ---
      const scoreMatch = resultText.match(/\[RISK_SCORE:\s*(\d+)/i);
      const extractedScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;
      setRiskScore(extractedScore); 

      // Clean the text: remove ONLY the [RISK_SCORE] tag. 
      // The AI's Disclaimer will now show up at the top of your UI report!
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
    riskScore, 
    loading,
    loadingMessage,
    apiStatus,
    modelError,
    resultsRef,
    analyzeContract,
    handleClear
  };
};