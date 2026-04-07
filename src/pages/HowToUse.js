import React from 'react';

function HowToUse() {
  return (
    <div style={styles.container}>
      {/* --- HERO SECTION --- */}
      <header style={styles.header}>
        <h1 className="gradient-text" style={styles.heading}>Master the AI Legal Scan</h1>
        <p style={styles.paragraph}>
          Protecting yourself from unfair clauses is simple. Follow this 8-step 
          guide to navigate the <strong>Legal-Lens Pro Dashboard</strong> and get 
          professional-grade AI contract analysis.
        </p>
      </header>

      {/* --- STEP 1: DOCUMENT INPUT --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>01. Provide Your Document</h2>
        <p style={styles.paragraph}>
          Our <strong>Multimodal AI</strong> accepts multiple inputs simultaneously. 
          You can paste raw text from WhatsApp or Email, upload <strong>OCR-ready images</strong> 
          of paper contracts, or drop <strong>PDF files</strong> directly into the 
          central scanner zone.
        </p>
      </section>

      {/* --- STEP 2: DASHBOARD INTERACTION (NEW!) --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>02. Engage with the Dashboard</h2>
        <p style={styles.paragraph}>
          Legal-Lens Pro is built for a <strong>360° Desktop Experience</strong>. While 
          you prepare your scan, interact with the rotating sidebars:
          <br /><br />
          • <strong>Legal Tips (Left):</strong> Quick insights into Indian Law and digital rights.
          <br />
          • <strong>Case Studies (Right):</strong> Fascinating real-world legal events.
          <br /><br />
          <em>Note: Insights rotate every 20 seconds to keep you informed during the process.</em>
        </p>
      </section>

      {/* --- STEP 3: MODES & LANGUAGES --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>03. Set Your Parameters</h2>
        <p style={styles.paragraph}>
          Before scanning, configure your search for maximum accuracy:
          <br /><br />
          • <strong>Indian Law Mode:</strong> Toggle this for analysis based specifically 
          on the <strong>Indian Contract Act, 1872</strong>.
          <br />
          • <strong>Multilingual Support:</strong> Choose from <strong>50+ regional languages</strong> 
          to receive your final report in your native tongue.
        </p>
      </section>

      {/* --- STEP 4: THE AI DIAGNOSTIC --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>04. Run the AI Diagnostic</h2>
        <p style={styles.paragraph}>
          Once your file is ready, click <strong>"Scan Files."</strong> Our system uses 
          <strong> Gemini 3 Flash</strong> to perform a deep-layer audit, 
          cross-referencing your document against standard legal safety protocols in seconds.
        </p>
      </section>

      {/* --- STEP 5: RISK-O-METER --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>05. Analyze the Risk-O-Meter</h2>
        <p style={styles.paragraph}>
          Review the generated <strong>Risk Score</strong>. Our gamified meter will 
          visualize the danger level of the contract:
          <br /><br />
          • <strong style={{color: '#ff4444'}}>Red:</strong> Critical risks and unfair clauses.
          <br />
          • <strong style={{color: '#ffcc00'}}>Yellow:</strong> Ambiguous terms needing caution.
          <br />
          • <strong style={{color: '#00c851'}}>Green:</strong> Standard, low-risk legal terms.
        </p>
      </section>
      {/* --- STEP 6: GOOGLE VERIFICATION (NEW!) --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>06. Fact-Check & Verify</h2>
        <p style={styles.paragraph}>
          Transparency is our priority. If you find a legal case study in our sidebar 
          that sounds too strange to be true, use the <strong>"Verify on Google"</strong> 
          button. The app will instantly generate a search query so you can read official 
          news archives and verify the legal history yourself.
        </p>
      </section>

      {/* --- STEP 7: CONNECT WITH DLSA --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>07. Locate Local Legal Aid</h2>
        <p style={styles.paragraph}>
          If critical risks are found, visit our <strong>Local Help Dashboard</strong>. 
          By selecting your State and District, you can instantly locate the nearest 
          <strong> District Legal Services Authority (DLSA)</strong>. We provide direct 
          mapping to over <strong>750+ offices</strong> across India for free legal assistance.
        </p>
      </section>

      {/* --- STEP 8: VIEW THE ROADMAP (NEW!) --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>08. Track Our Evolution</h2>
        <p style={styles.paragraph}>
          Legal-Lens Pro is a living product. Visit the <strong>Updates</strong> page 
          to see our monthly journey—from our MVP launch in January to the major 
          <strong> Pan-India Integration</strong> in February and the Dashboard 
          Revolution in April.
        </p>
      </section>
    </div>
  );
}

// --- STYLING ENGINE ---
const styles = {
  container: {
    padding: "60px 20px",
    color: "#e0e0e0",
    maxWidth: "900px",
    margin: "0 auto",
    lineHeight: "1.8",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "transparent"
  },
  header: {
    marginBottom: "60px",
    textAlign: "center"
  },
  heading: {
    fontSize: "3.5rem",
    marginBottom: "20px",
    fontWeight: "900",
    letterSpacing: "-1px"
  },
  subheading: {
    fontSize: "1.8rem",
    marginBottom: "15px",
    color: "#4da6ff",
    borderLeft: "5px solid #4da6ff",
    paddingLeft: "20px",
    fontWeight: "700"
  },
  paragraph: {
    fontSize: "1.1rem",
    marginBottom: "10px",
    color: "#bbb"
  },
  stepSection: {
    marginBottom: "50px",
    padding: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease"
  }
};

export default HowToUse;