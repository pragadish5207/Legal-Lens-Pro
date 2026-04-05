import React, { useState } from 'react';

const SuggestionBox = () => {
  const [suggestion, setSuggestion] = useState("");

  const handleSendSuggestion = () => {
    if (!suggestion.trim()) return;

    // 1. Show the confirmation box (Yes/No)
    const userConfirmed = window.confirm("Open your email app to send this feedback?");

    // 2. If the user clicks "Yes" (OK)
    if (userConfirmed) {
      const subject = "legal lens feedback";
      const body = suggestion;
      
      const mailtoUrl = `mailto:pragadishwar5207@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
     
      // Opens the email app directly
      window.location.href = mailtoUrl;

      // Clear the box ONLY if they sent it
      setSuggestion("");
    }
  };

  return (
    <div style={{
      marginTop: "60px", padding: "20px", backgroundColor: "#111", 
      borderRadius: "10px", border: "1px solid #333", maxWidth: "600px", 
      margin: "60px auto", textAlign: "center"
    }}>
      <h4 style={{color: "#007bff", marginBottom: "10px"}}>💡 Have a suggestion?</h4>
      <textarea 
        placeholder="Help me improve Legal-Lens! Type your feedback here..."
        value={suggestion} 
        onChange={(e) => setSuggestion(e.target.value)}
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
  );
};

export default SuggestionBox;