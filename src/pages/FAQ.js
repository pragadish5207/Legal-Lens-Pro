import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const FAQ = () => {
  // State to track which question is open
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "I. Legal-Lens Pro: Features & Usage",
      questions: [
        { q: "What is the Risk-O-Meter, and how is it calculated?", a: "The Risk-O-Meter evaluates contracts on a 0-10 scale. It uses Gemini 3 Flash to scan for missing statutory clauses, uncertain terms, and violations of the Indian Contract Act. A higher score indicates higher predatory risk." },
        { q: "Does Legal-Lens Pro store my documents?", a: "No. Privacy is our priority. We use real-time processing via the API. No data, PDF, or image is saved to our servers once your session ends." },
        { q: "How do I find local legal aid?", a: "Our Pan-India DLSA integration covers 750+ districts. Use the 'Find Legal Help' tool to locate authorized legal services in your specific State and District." },
        { q: "Can I scan contracts in regional languages?", a: "Yes. We support 50+ languages including Gujarati, Hindi, Tamil, and Marathi, ensuring legal literacy reaches every corner of India." },
        { q: "Why was this tool created?", a: "Built by Pragadishwar, this project bridges the gap between B.Com expertise and AI to democratize access to justice and simplify complex legal jargon." },
        { q: "Is this part of a suite?", a: "Yes, it belongs to the 'Lens Intelligence Suite,' a coordinated ecosystem of AI tools including Study-Lens Pro and Zero-to-SEO." },
        { q: "What makes the AI analysis accurate?", a: "We leverage a 1-million token context window to cross-reference your text against Indian statutes and Supreme Court precedents instantly." },
        { q: "Why is the desktop view recommended?", a: "The desktop layout features a 3-column dashboard with live Legal Tips and Case Studies that provide extra context while you analyze your document." }
      ]
    },
    {
      category: "II. Indian Contract Act (Statutory Logic)",
      questions: [
        { q: "What defines a valid contract (Section 10)?", a: "Under Section 10, an agreement must have free consent, competent parties, lawful consideration, and a lawful object. If any are missing, the AI flags the contract as void." },
        { q: "What is 'Void for Uncertainty' (Section 29)?", a: "Section 29 states that agreements with vague meanings are void. Terms like 'pay soon' or 'reasonable time' without dates are high-risk red flags." },
        { q: "Is consideration mandatory (Section 25)?", a: "Yes. Except for specific exceptions like registered gifts between relatives, a contract without consideration (payment/value) is void in India." },
        { q: "Are verbal contracts valid in India?", a: "Yes, they are legally valid but incredibly difficult to prove in court. Our AI helps you convert verbal promises into written, structured analysis for safety." },
        { q: "What is 'Undue Influence' (Section 16)?", a: "It occurs when one party dominates the will of another. If the AI detects predatory language or lopsided power dynamics, it flags potential Section 16 violations." },
        { q: "What is an 'Unlawful Object' (Section 23)?", a: "If a contract involves anything illegal, fraudulent, or injurious to others, it is void. The AI scans for clauses that violate public policy." },
        { q: "Can a minor sign a contract?", a: "In India, an agreement with a minor (under 18) is void-ab-initio (void from the beginning). The AI flags any party-competency issues it detects." }
      ]
    },
    {
      category: "III. Stamp Duty & Admissibility",
      questions: [
        { q: "Is ₹100 stamp paper enough for every agreement?", a: "No. Stamp duty is a fiscal tax that varies by document type and State law. Under-stamping makes a document 'inadmissible as evidence' in court under the Indian Stamp Act, 1899." },
        { q: "What is the Gujarat Stamp Act, 1958?", a: "Since stamp duty is a state subject, Gujarat follows its own specific rates. For example, rental agreements and partnership deeds have specific duty structures unique to Gujarat." },
        { q: "Can I pay stamp duty after signing a document?", a: "Yes, but it is risky. You may have to pay a penalty (up to 10 times the original duty) to a Collector to make the document legally valid later." },
        { q: "What is the difference between Judicial and Non-Judicial stamp paper?", a: "Judicial stamps are for court fees. Non-Judicial stamps (like the ones our AI checks for) are used for contracts, deeds, and powers of attorney." },
        { q: "Does an e-Stamp carry the same weight as physical paper?", a: "Yes. E-stamping is a secure way of paying non-judicial stamp duty and is fully recognized as valid evidence under Indian law." }
      ]
    },
    {
      category: "IV. Scam Shield & Digital Laws",
      questions: [
        { q: "Are WhatsApp and Email agreements legally binding?", a: "Yes, under the IT Act, 2000, electronic records and communications are admissible as evidence provided they meet the criteria of a clear offer and acceptance." },
        { q: "What is the Digital Personal Data Protection (DPDP) Act 2023?", a: "This is India's latest privacy law. Legal-Lens Pro respects these principles by ensuring your uploaded documents are processed in real-time and never stored permanently." },
        { q: "Is an Aadhaar eSign as valid as a physical signature?", a: "Yes. Under Section 5 of the IT Act, recognized digital signatures (like Aadhaar-based eSigns) carry the same legal weight as a wet-ink signature." },
        { q: "Why is a 'security deposit' for a job a major red flag?", a: "Legitimate employers never ask for money to provide a job. Our 'Scam Shield' logic flags this as a predatory pattern commonly used in employment fraud." },
        { q: "Is it legal for a company to hold my original certificates?", a: "No. The Supreme Court and UGC have ruled that holding original educational certificates as 'security' is illegal. The AI will flag any such 'Bond' clauses." },
        { q: "What is a 'Non-Compete' clause in India?", a: "Under Section 27 of the Contract Act, any agreement that restrains someone from practicing a profession is generally void. The AI helps identify if your employer's non-compete is too restrictive." },
        { q: "How do I report a legal scam detected by the AI?", a: "Use the DLSA integration on our dashboard to find your local authority. You can provide the AI's Risk Report as supporting context when filing a complaint." }
      ]
    },
    {
      category: "V. Liability & Professional Safeguards",
      questions: [
        { q: "Is the AI's Risk Score a final legal judgment?", a: "No. It is a data-driven diagnostic based on Gemini 3's analysis of your text. It does not account for specific situational nuances that only a qualified human lawyer can evaluate." },
        { q: "Can Legal-Lens Pro be held liable for contract disputes?", a: "No. As stated in our User Agreement, this is an educational tool. Users are solely responsible for their legal decisions. The AI provides a 'first look,' not a 'final word.'" },
        { q: "Why do I still need a lawyer if I have AI?", a: "AI scans for patterns and statutory red flags (like Section 29 or Section 25), but a lawyer provides strategy, courtroom representation, and professional empathy. AI is your first line of defense; an advocate is your ultimate shield." },
        { q: "Does this tool create an attorney-client relationship?", a: "No. Use of this application does not constitute legal representation or an attorney-client relationship. It is an AI-assisted research and literacy platform." }
      ]
    },
    {
      category: "VI. Advanced Legal Concepts & SEO Knowledge",
      questions: [
        { q: "What is 'Force Majeure' (Section 56)?", a: "Known as the 'Doctrine of Frustration,' it deals with contracts that become impossible to perform due to unforeseen events (like a pandemic or natural disaster). The AI scans for how these clauses are worded." },
        { q: "What is the difference between 'Agreement' and 'Contract'?", a: "Under Section 2(h), an agreement enforceable by law is a contract. Our AI checks if your 'Agreement' meets the legal criteria to be an 'Enforceable Contract.'" },
        { q: "What are 'Liquidated Damages'?", a: "This is a pre-fixed amount to be paid in case of a breach. The AI scans for whether these amounts are reasonable or if they act as an illegal 'Penalty' under Indian law." },
        { q: "Why is 'Jurisdiction' important in a contract?", a: "It specifies which court has the power to hear a dispute. 'Subject to Ahmedabad Jurisdiction' means legal battles must happen in Ahmedabad courts, even if the parties live elsewhere." },
        { q: "What is 'Novation' of a contract (Section 62)?", a: "It is the act of replacing an old contract with a new one. The AI flags if a new agreement is trying to override your existing legal rights without clear consent." }
      ]
    }
  ]; // This ends the faqData array

  return (
    <>
      <Helmet>
        <title>Legal-Lens Pro | 35+ FAQ - Indian Contract Act, IT Act & AI Analysis</title>
        <meta name="description" content="Deep dive into Section 29, Section 10, DPDP Act 2023, and Stamp Duty. Learn how Pragadishwar's AI-Lens protects you from legal scams." />
        
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
                  "text": "Under Section 10 of the Indian Contract Act, it can be valid, but it is often inadmissible in court without proper stamp duty."
                }
              },
              {
                "@type": "Question",
                "name": "How does the AI Risk-O-Meter work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It uses Gemini 3 Flash to scan for predatory clauses and violations of the Indian Contract Act, providing a score from 0-10."
                }
              }
            ]
          }
        `}
        </script>
      </Helmet>
      <div style={styles.container}>
        <h1 className="gradient-text" style={styles.heading}>Knowledge Base & FAQ</h1>
        <p style={styles.subheading}>
          Your comprehensive guide to Indian Contract Law, Digital Safety, and 
          Legal-Lens Pro diagnostic logic.
        </p>

        {faqData.map((section, sIndex) => (
          <div key={sIndex} style={styles.section}>
            <h2 style={styles.categoryTitle}>{section.category}</h2>
            {section.questions.map((item, qIndex) => {
              const globalIndex = `${sIndex}-${qIndex}`;
              const isOpen = activeIndex === globalIndex;
              
              return (
                <div key={globalIndex} style={styles.faqItem}>
                  <div 
                    style={isOpen ? {...styles.questionRow, ...styles.activeQuestion} : styles.questionRow} 
                    onClick={() => toggleAccordion(globalIndex)}
                  >
                    <span style={{ flex: 1, paddingRight: '10px' }}>{item.q}</span>
                    <span style={styles.icon}>{isOpen ? "−" : "+"}</span>
                  </div>
                  
                  {isOpen && (
                    <div style={styles.answerBox}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

// --- STYLES ENGINE (Part A) ---
const styles = {
  container: { 
    padding: "100px 20px", 
    maxWidth: "900px", 
    margin: "0 auto", 
    backgroundColor: "#050505", // Deep black for better focus
    minHeight: "100vh" 
  },
  heading: { 
    fontSize: "3.5rem", 
    textAlign: "center", 
    marginBottom: "15px", 
    fontWeight: "900",
    letterSpacing: "-1px" 
  },
  subheading: { 
    textAlign: "center", 
    color: "#888", 
    marginBottom: "60px", 
    fontSize: "1.1rem",
    lineHeight: "1.6",
    maxWidth: "700px",
    margin: "0 auto 60px auto"
  },
  section: { 
    marginBottom: "60px" 
  },
  categoryTitle: { 
    color: "#aaa", 
    fontSize: "0.85rem", 
    textTransform: "uppercase", 
    letterSpacing: "3px", 
    marginBottom: "25px", 
    borderLeft: "4px solid #007bff", 
    paddingLeft: "15px",
    fontWeight: "bold" 
  },
  faqItem: { 
    marginBottom: "15px", 
    borderRadius: "16px", 
    overflow: "hidden", 
    border: "1px solid #222",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "rgba(255, 255, 255, 0.02)"
  },
  questionRow: { 
    padding: "24px", 
    cursor: "pointer", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    color: "#efefef", 
    transition: "0.4s", 
    fontSize: "1.15rem",
    fontWeight: "600" 
  },
  activeQuestion: { 
    backgroundColor: "rgba(0, 123, 255, 0.1)", 
    color: "#4facfe",
    borderBottom: "1px solid rgba(0, 123, 255, 0.2)" 
  },
  answerBox: { 
    padding: "30px", 
    backgroundColor: "rgba(0, 0, 0, 0.3)", 
    color: "#b0b0b0", 
    lineHeight: "1.8", 
    fontSize: "1.05rem", 
    borderTop: "1px solid #111",
    animation: "fadeIn 0.6s ease-out" 
  },
  icon: { 
    fontSize: "1.8rem", 
    fontWeight: "300",
    color: "#4facfe",
    marginLeft: "20px"
  }
};

// --- GLOBAL KEYFRAMES (Add this to your App.css if not present) ---
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
*/

export default FAQ;