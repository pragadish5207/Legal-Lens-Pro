import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This tells the browser to jump to coordinates (0,0) - the very top-left
    window.scrollTo(0, 0);
  }, [pathname]); // This runs every time the "pathname" (the URL) changes

  return null; // This component doesn't need to show anything, it just "works" in the background
};

export default ScrollToTop;