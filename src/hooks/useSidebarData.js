import { useState, useEffect } from 'react';
import { LEGAL_TIPS, CASE_STUDIES } from '../legalData';

export const useSidebarData = () => {
  const [tipIndex, setTipIndex] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);

  useEffect(() => {
    // 1. Timer for Legal Tips (Changes every 15 seconds)
    const tipTimer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LEGAL_TIPS.length);
    }, 15000); 

    // 2. Timer for Case Studies (Changes every 15 seconds)
    const caseTimer = setInterval(() => {
      setCaseIndex((prev) => (prev + 1) % CASE_STUDIES.length);
    }, 15000); 

    // Cleanup timers if the user leaves the page
    return () => {
      clearInterval(tipTimer);
      clearInterval(caseTimer);
    };
  }, []);

  return {
    tipIndex,
    caseIndex,
    currentTip: LEGAL_TIPS[tipIndex],
    currentCase: CASE_STUDIES[caseIndex]
  };
};