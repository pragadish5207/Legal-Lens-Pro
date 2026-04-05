import { GoogleGenerativeAI } from "@google/generative-ai";

// --- THEME COLOR DEFINITIONS ---
export const themes = {
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
export const LANGUAGES = [
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
// We export these so other files can use the same AI instance
export const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
export const genAI = new GoogleGenerativeAI(API_KEY);

// --- LOADING MESSAGES ---
export const LOADING_MESSAGES = [
  "Reading file content...",
  "Analyzing legal jargon...",
  "Identifying high-risk clauses...",
  "Checking for red flags...",
  "Scanning for hidden liabilities...",
  "Finalizing your diagnostic report..."
];