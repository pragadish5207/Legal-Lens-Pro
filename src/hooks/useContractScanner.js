import { useState, useEffect, useRef } from 'react';
import { genAI, API_KEY, LOADING_MESSAGES } from '../constants';

export const useContractScanner = (language, indianLawMode) => {
  // --- 1. STATE MANAGEMENT ---
  const [manualText, setManualText] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Scanning document...");
  const [availableModels, setAvailableModels] = useState([]);
  const [modelError, setModelError] = useState("");
  const [apiStatus, setApiStatus] = useState("checking");
  const resultsRef = useRef(null);

  // --- 2. API HEALTH CHECK ---
  useEffect(() => {
    const checkAPI = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("ping"); 
        const response = await result.response;
        if (response.text()) setApiStatus("online");
      } catch (error) {
        if (error.message?.includes("API_KEY_INVALID")) setApiStatus("offline");
        else setApiStatus("online"); 
      }
    };
    checkAPI();
  }, []);

  // --- 3. MODEL CHECKER ---
  useEffect(() => {
    const checkModels = async () => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch models");
        const data = await response.json();
        const validModels = data.models?.filter(m => m.supportedGenerationMethods.includes("generateContent"));
        setAvailableModels(validModels || []);
      } catch (err) {
        setModelError("Could not verify models. Check environment variables.");
      }
    };
    if (API_KEY) checkModels();
  }, []);

  // --- 4. LOADING MESSAGE CYCLE ---
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

  // --- 5. AUTO-SCROLL ---
  useEffect(() => {
    if (analysis && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis]);
  // --- 6. HANDLER: FILE UPLOAD & PREVIEW ---
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

  // --- 7. HANDLER: RESET ---
  const handleClear = () => {
    setFiles([]);
    setPreviews([]);
    setAnalysis("");
    setManualText("");
  };

  // --- 8. HELPER: FILE PREPARATION ---
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
  // --- 9. CORE LOGIC: THE AI SCANNER ---
  const analyzeContract = async () => {
    if (files.length === 0 && !manualText) {
      alert("⚠️ SYSTEM ALERT: Please upload a file OR paste some text to begin!");
      return;
    }

    setLoading(true);
    setAnalysis(`Analyzing ${files.length} document(s)... Please wait for the system to process...`);

    try {
      const modelName = availableModels.length > 0 
        ? availableModels[0].name.replace("models/", "") 
        : "gemini-1.5-flash";
      
      const model = genAI.getGenerativeModel({ model: modelName });
      const fileParts = await Promise.all(files.map(fileToGenerativePart));

      const prompt = `### ROLE
You are a Senior High Court Auditor with 30 years of experience in the Indian Judicial System. You have ZERO tolerance for informal or vague documentation.

### STATUTORY MANDATE (INDIAN LAW MODE: ${indianLawMode ? "ACTIVE" : "INACTIVE"})
${indianLawMode ? `If Indian Law Mode is ACTIVE, you MUST:
1. VETO any agreement that lacks "Certainty" under Section 29 of the Indian Contract Act, 1872.
2. CITE specific sections (e.g., Section 10, Section 25, Section 2(d)) for every Red Flag.
3. VERIFY "Consideration" (Quid Pro Quo) – if the reason for payment is missing, cite Section 25.
4. AUDIT for Stamp Duty requirements under the Indian Stamp Act, 1899.` : ""}

### AUDIT EXECUTION (${files.length} Source(s))
Analyze the provided content with "Extreme Prejudice." 

**Specific Use-Case Roast:** If the user inputs "i accept to pay him 500 rupees":
- You MUST flag this as a **10/10 Fatal Risk**.
- Reason: Violation of **Section 29 (Vagueness)** – "Him" is not a defined legal entity.
- Reason: Violation of **Section 2(d) (Consideration)** – No service or product is defined for the 500 rupees.
- Reason: Violation of **Section 10** – Lacks essential elements of a valid contract (Identity and Capacity).

### REQUIRED OUTPUT FORMAT
1. SOURCE: Identify document.
2. STATUTORY RED FLAGS:
   - [Section Number] - [Legal Title]: [One-sentence explanation in ${language}].
3. SCAM SHIELD: Identify any "🚨 KNOWN SCAM PATTERNS".
4. 🔥 RISK SCORE: (0-10).

### STRICT RULES
- NO introductory text. NO "I have analyzed your files."
- If it's not a formal contract, give it a 10/10 Risk.
- OUTPUT in ${language} except for English Labels and Section Titles.`;

      const result = await model.generateContent([prompt, ...fileParts, manualText]);
      const response = await result.response;
      setAnalysis(response.text());
    } catch (error) {
      setAnalysis("❌ SYSTEM FAILURE: Unable to process documents. " + error.toString());
    }
    setLoading(false);
  };
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
};