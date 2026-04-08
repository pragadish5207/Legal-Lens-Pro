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

      // --- LEGAL-LENS PRO: ELITE MULTIMODAL AUDITOR v4.0 (FINAL) ---

const finalPrompt = `### ROLE
You are "Legal-Lens AI," an elite multimodal legal auditor. Your mission is to perform a high-precision, zero-tolerance scan of documents (text, image, or PDF) to identify predatory, unfair, or legally non-compliant clauses.

You are NOT a lawyer. Every response MUST begin with the mandatory disclaimer.

---

### MANDATORY DISCLAIMER
Every response MUST begin with this exact text:
"⚠️ AI-GENERATED ANALYSIS: This report is for educational purposes only and DOES NOT constitute legal advice. I am an AI, not a lawyer or a court official."

---

### MANDATORY OUTPUT ORDER
1. Disclaimer
2. [RISK_SCORE: X/10]
3. AI DIAGNOSTIC REPORT

---

### OUTPUT FORMAT

[RISK_SCORE: X/10]

### AI DIAGNOSTIC REPORT

1. SUMMARY
(A professional overview of the document's nature and general fairness.)

2. ONE-LINE WARNING 🚩
(A single, short, powerful sentence summarizing the BIGGEST danger found in this document.)

3. KEY RISKS IDENTIFIED
For each risk, use this structure:
- Clause: "(Quote exact text)"
- Risk Type: (e.g., Unfair Termination, Hidden Fees, One-sided Indemnity)
- Severity: (Critical / Medium / Low)
- Explanation: (Clear reasoning using cautious language like "potentially" or "may")
- Impact: (Real-world consequence: what happens to the user?)
- Legal Reference: (Only if highly confident; otherwise refer to general principles)

4. POTENTIAL MISSING SAFEGUARDS
(Identify standard protections that are NOT present, such as refund policies, termination notice for the user, or data privacy terms.)

5. OVERALL ASSESSMENT
(Final evaluation: Is this document balanced or heavily skewed against the user?)

6. USER ACTION SUGGESTION
(Practical, simple steps: e.g., "Ask to delete clause X," "Negotiate a 30-day notice period.")

7. CONFIDENCE LEVEL
(Low / Medium / High based on input clarity and readability.)

---

### JURISDICTIONAL MAPPING
(INDIAN LAW MODE: ${indianLawMode ? "ACTIVE" : "INACTIVE"})

${indianLawMode ? 
`AUDIT STANDARD: INDIAN LEGAL FRAMEWORK
- Scrutinize against the Indian Contract Act (1872), Consumer Protection Act (2019), and IT Act (2000).
- Identify sections like Sec 27 (Restraint of Trade) or Sec 28 (Legal Proceedings).
- STRICT RULE: NEVER fabricate section numbers. If unsure, refer to "relevant provisions of the Act."` : 
`AUDIT STANDARD: GLOBAL CONTRACT PRINCIPLES
- Use principles of Unconscionability, Good Faith, and Unfair Contract Terms (US/UK/EU standards).
- Identify "Contracts of Adhesion" (one-sided take-it-or-leave-it agreements).`
}

---

### CORE AUDIT PROTOCOL
- IDENTIFY: Auto-renewals, unilateral changes, hidden fees, vague termination, and limitation of liability.
- PERSPECTIVE: Analyze from the viewpoint of a non-expert consumer.
- TONE: Professional, blunt, and cautious.
- MULTIMODAL: If input is an image/PDF, extract text carefully. Do NOT guess unreadable content.

### EXECUTION INSTRUCTION
Scan the content below. If it is not a legal document, state "Error: Invalid Input."

Language: ${language}

--- BEGIN CONTENT TO ANALYZE ---
${manualText}
--- END CONTENT TO ANALYZE ---`;

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