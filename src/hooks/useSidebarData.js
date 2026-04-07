import { useState, useEffect } from 'react';
import { LEGAL_TIPS, CASE_STUDIES } from '../legalData';

export const useSidebarData = () => {
  const [tipIndex, setTipIndex] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Control the timer

  // --- 1. TIMERS (Only run if isPlaying is true) ---
  useEffect(() => {
    let tipTimer, caseTimer;

    if (isPlaying) {
      tipTimer = setInterval(() => {
        setTipIndex((prev) => (prev + 1) % LEGAL_TIPS.length);
      }, 10000);

      caseTimer = setInterval(() => {
        setCaseIndex((prev) => (prev + 1) % CASE_STUDIES.length);
      }, 10000);
    }

    return () => {
      clearInterval(tipTimer);
      clearInterval(caseTimer);
    };
  }, [isPlaying]);

  // --- 2. HANDLERS FOR MANUAL CONTROL ---
  const nextTip = () => setTipIndex((prev) => (prev + 1) % LEGAL_TIPS.length);
  const prevTip = () => setTipIndex((prev) => (prev - 1 + LEGAL_TIPS.length) % LEGAL_TIPS.length);

  const nextCase = () => setCaseIndex((prev) => (prev + 1) % CASE_STUDIES.length);
  const prevCase = () => setCaseIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);

  const togglePlay = () => setIsPlaying(!isPlaying);

  // --- 3. THE TOOLKIT ---
  return {
    tipIndex,
    caseIndex,
    totalTips: LEGAL_TIPS.length,
    totalCases: CASE_STUDIES.length,
    isPlaying,
    nextTip,
    prevTip,
    nextCase,
    prevCase,
    togglePlay
  };
};