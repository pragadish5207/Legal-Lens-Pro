import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const FAQ = () => {
  // State to track which question is open
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    // If the clicked index is already active, close it (set to null)
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Batch 2 will contain the full list of questions here...
  const faqData = [
    {
      category: "I. Legal-Lens Pro: Features & Usage",
      questions: [
        { q: "What is the Risk-O-Meter, and how is it calculated?", a: "The Risk-O-Meter evaluates contracts on a 0-10 scale based on 'Supreme Court Level' strictness. It scans for missing statutory clauses, uncertain terms, and violations of the Indian Contract Act." },
        { q: "Does Legal-Lens Pro store my documents?", a: "No. Privacy is built-in. We use real-time processing via Gemini 1.5 Flash API. No data is saved to our servers once your session ends." },
        { q: "How do I find local legal aid?", a: "Our Pan-India DLSA integration covers 750+ districts. Select your region to find contact details for authorized legal services." },
        { q: "Can I scan contracts in regional languages?", a: "Yes. We support 50+ languages including Gujarati, Hindi, and Tamil, ensuring legal literacy reaches everyone." },
        { q: "Why was this tool created?", a: "Built by Pragadishwar, this project bridges the gap between commerce expertise and AI to democratize access to justice in India." },
        { q: "Is this part of a suite?", a: "Yes, it belongs to the 'Lens Intelligence Suite,' a coordinated ecosystem of AI tools for Study, Law, and Data." },
        { q: "What makes the AI analysis accurate?", a: "We leverage Gemini 1.5 Flash's 1-million token context window to cross-reference your text against Indian statutes instantly." }
      ]
    },
    {
      category: "II. Indian Contract Act (Statutory Logic)",
      questions: [
        { q: "What defines a valid contract (Section 10)?", a: "Under Section 10, an agreement must have free consent, competent parties, lawful consideration, and a lawful object. Missing any makes it void." },
        { q: "What is 'Void for Uncertainty' (Section 29)?", a: "Section 29 states agreements with vague meanings are void. Terms like 'pay soon' without dates are high-risk flags." },
        { q: "Is consideration mandatory (Section 25)?", a: "Yes. Except for specific exceptions like registered gifts between relatives, a contract without consideration is void." },
        { q: "Are verbal contracts valid in India?", a: "Generally, yes, but they are incredibly difficult to prove. Written contracts are always recommended for legal safety." },
        { q: "What is 'Undue Influence' in a contract?", a: "It occurs when one party dominates the will of another. If detected, the contract becomes voidable at the option of the victim." }
      ]
    },
    {
      category: "III. Stamp Duty & Admissibility",
      questions: [
        { q: "Is ₹100 stamp paper enough for everything?", a: "No. Different deeds require different duty rates. Under-stamping makes a document inadmissible in court under the Stamp Act." },
        { q: "What is the Indian Stamp Act, 1899?", a: "It is a fiscal law that requires specific taxes (stamps) to be paid on legal documents to make them enforceable." },
        { q: "Can I pay stamp duty after signing?", a: "Yes, but you may face heavy penalties (up to 10 times the original duty) to make the document admissible later." },
        { q: "What is Non-Judicial stamp paper?", a: "It is used for executing legal documents like power of attorney, sale deeds, and rental agreements." },
        { q: "Does Gujarat have specific stamp duty rules?", a: "Yes, stamp duty is a state subject. Gujarat has specific rates under the Gujarat Stamp Act, 1958." }
      ]
    },
    {
      category: "IV. Scam Shield & Digital Laws",
      questions: [
        { q: "Is holding original certificates legal?", a: "No. Companies holding original educational certificates as a 'security' is a major predatory practice and often a scam." },
        { q: "Are WhatsApp agreements legally binding?", a: "They can be admitted as electronic records under the IT Act, 2000, provided they meet the criteria for a clear agreement." },
        { q: "What is the IT Act, 2000?", a: "It is the primary law in India dealing with cybercrime and electronic commerce, validating e-signatures and digital records." },
        { q: "Is an Aadhaar eSign valid?", a: "Yes. Under Section 5 of the IT Act, Aadhaar-based eSignatures carry the same weight as physical ink signatures." },
        { q: "Why is a 'security deposit' for a job a red flag?", a: "Legitimate employers never ask for money to provide a job. This is a classic scam pattern detected by our Scam Shield." },
        { q: "What should I do if the AI score is 10/10?", a: "Do not sign. A 10/10 score means the document has fatal legal flaws or scam patterns. Consult a lawyer immediately." },
        { q: "How do I report a legal scam?", a: "You can use our DLSA integration to find your local district legal authority and file a formal complaint." },
        { q: "Is this tool a substitute for a lawyer?", a: "No. This is an AI risk-detection assistant. For final legal execution, always consult a qualified advocate." }
      ]
    }
  ];
  return (
    <>
      {/* 1. THE SEO ENGINE (HELMET) */}
      <Helmet>
        <title>Legal-Lens Pro | FAQ - Indian Contract Law & AI Risk Analysis</title>
        <meta name="description" content="Deep dive into Section 29, Section 10, and Stamp Duty. Learn how our AI-Lens scans for legal risks in Indian contracts." />
        
        {/* FAQ Schema - This helps you get those Google Dropdown results! */}
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is an agreement on plain paper valid in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Under Section 10 of the Indian Contract Act, it can be valid, but it may be inadmissible as evidence in court without proper stamp duty."
                }
              },
              {
                "@type": "Question",
                "name": "What is Section 29 of the Indian Contract Act?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Section 29 states that agreements with uncertain meanings are void. Our AI identifies these vagueness risks instantly."
                }
              }
            ]
          }
        `}
        </script>
      </Helmet>

      {/* 2. THE VISIBLE UI (ACCORDION) */}
      <div style={styles.container}>
        <h1 style={styles.heading}>Knowledge Base & FAQ</h1>
        <p style={styles.subheading}>Deep dive into Indian Law and the Legal-Lens Pro logic.</p>

        {faqData.map((section, sIndex) => (
          <div key={sIndex} style={styles.section}>
            <h2 style={styles.categoryTitle}>{section.category}</h2>
            {section.questions.map((item, qIndex) => {
              const globalIndex = `${sIndex}-${qIndex}`;
              const isOpen = activeIndex === globalIndex;
              return (
                <div key={qIndex} style={styles.faqItem}>
                  <div 
                    style={isOpen ? {...styles.questionRow, ...styles.activeQuestion} : styles.questionRow} 
                    onClick={() => toggleAccordion(globalIndex)}
                  >
                    <span>{item.q}</span>
                    <span style={styles.icon}>{isOpen ? "−" : "+"}</span>
                  </div>
                  {isOpen && <div style={styles.answerBox}>{item.a}</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}; // Closing the FAQ function
const styles = {
  container: { 
    padding: "100px 20px", 
    maxWidth: "900px", 
    margin: "0 auto", 
    backgroundColor: "#000", 
    minHeight: "100vh" 
  },
  heading: { 
    fontSize: "2.8rem", 
    color: "#4da6ff", 
    textAlign: "center", 
    marginBottom: "15px", 
    fontWeight: "bold",
    textShadow: "0 0 20px rgba(77, 166, 255, 0.3)" 
  },
  subheading: { 
    textAlign: "center", 
    color: "#666", 
    marginBottom: "60px", 
    fontSize: "1.1rem",
    lineHeight: "1.6" 
  },
  section: { 
    marginBottom: "50px" 
  },
  categoryTitle: { 
    color: "#aaa", 
    fontSize: "0.85rem", 
    textTransform: "uppercase", 
    letterSpacing: "3px", 
    marginBottom: "25px", 
    borderLeft: "4px solid #4da6ff", 
    paddingLeft: "15px",
    fontWeight: "bold" 
  },
  faqItem: { 
    marginBottom: "12px", 
    borderRadius: "15px", 
    overflow: "hidden", 
    border: "1px solid #222",
    transition: "0.3s ease" 
  },
  questionRow: { 
    padding: "22px", 
    backgroundColor: "rgba(255, 255, 255, 0.03)", 
    cursor: "pointer", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    color: "#eee", 
    transition: "0.4s", 
    fontSize: "1.1rem",
    fontWeight: "500" 
  },
  activeQuestion: { 
    backgroundColor: "rgba(77, 166, 255, 0.08)", 
    color: "#4da6ff",
    borderBottom: "1px solid rgba(77, 166, 255, 0.2)" 
  },
  answerBox: { 
    padding: "25px", 
    backgroundColor: "rgba(0, 0, 0, 0.4)", 
    color: "#999", 
    lineHeight: "1.8", 
    fontSize: "1rem", 
    borderTop: "1px solid #111",
    animation: "fadeIn 0.5s ease" 
  },
  icon: { 
    fontSize: "1.6rem", 
    fontWeight: "300",
    color: "#4da6ff" 
  }
};

export default FAQ;