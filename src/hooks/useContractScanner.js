import { useState, useEffect, useRef } from 'react';
import { LOADING_MESSAGES } from '../constants';

export const useContractScanner = (language, indianLawMode) => {
  // --- 1. STATE MANAGEMENT ---
  const [manualText, setManualText] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Scanning document...");
  const [modelError, setModelError] = useState("");
  const [apiStatus, setApiStatus] = useState("online"); // Default to online since we use the proxy
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
    }
  };
  // --- 5. HANDLER: RESET ---
  const handleClear = () => {
    setFiles([]);
    setPreviews([]);
    setAnalysis("");
    setManualText("");
  };

  // --- 6. HELPER: FILE PREPARATION ---
  // This turns your images or PDFs into "Base64" strings 
  // so we can send them to our secure /api/analyze tunnel.
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
You are a "Predatory Clause Hunter" and Senior Legal Auditor. Your goal is to protect the user from ANY harm, including absurd, impossible, or "hidden trap" clauses.

### CRITICAL INSTRUCTIONS
1. **ABSURDITY & IMPOSSIBILITY:** If a clause mentions souls, tigers, mythical creatures, or demands that are physically impossible (e.g., "no sleep"), flag it as a **10/10 RISK** immediately.
2. **UNCONSCIONABLE TERMS:** Any term that is extremely one-sided or predatory must be flagged with "Extreme Prejudice."
3. **RISK-O-METER DATA:** You MUST start your response with the phrase: "RISK LEVEL: [X]/10" followed by a short label (SAFE, WARNING, or DANGER).

### STATUTORY MANDATE (INDIAN LAW MODE: ${indianLawMode ? "ACTIVE" : "INACTIVE"})
${indianLawMode ? `
- VETO agreements lacking "Certainty" (Section 29, Indian Contract Act).
- CITE specific sections for every Red Flag.
- AUDIT for Stamp Duty and Consideration.` : "General Global Audit mode."}

### EXAMPLES OF TRAPS (FEW-SHOT)
- "Tenant transfers soul to Landlord" -> **10/10 DANGER** (Unconscionable/Illegal).
- "Landlord may drill at 2 AM" -> **9/10 DANGER** (Violation of Quiet Enjoyment).
- "Tenant must own a Bengal Tiger" -> **10/10 DANGER** (Public Safety/Liability).

### AUDIT EXECUTION
Analyze the content below. Be cynical. Be strict. Output in ${language}.

${manualText ? `TEXT TO ANALYZE:\n${manualText}` : ""}`;

      // --- THE SECURE TUNNEL CALL ---
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
      
      // Extract the text from the Gemini response structure
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis generated.";
      setAnalysis(resultText);

    } catch (error) {
      setAnalysis("❌ SYSTEM FAILURE: Unable to process documents. " + error.toString());
    }
    setLoading(false);
  };
  // --- 8. THE TOOLKIT ---
  // These are the "Buttons and Screens" we give to the UI
  return {
    manualText,
    setManualText,
    files,
    handleFileChange,
    previews,
    analysis,
    loading,
    loadingMessage,
    apiStatus,
    modelError,
    resultsRef,
    analyzeContract,
    handleClear
  };
}; // End of useContractScanner