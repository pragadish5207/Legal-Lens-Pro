import React from 'react';
import { Helmet } from 'react-helmet';

function Terms() {
  return (
    <div style={styles.container}>
      <Helmet>
        <title>Terms of Service | Legal-Lens Pro AI Safety Guidelines</title>
        <meta name="description" content="Legal-Lens Pro Terms of Service. Understand our AI diagnostic limitations, privacy protocols under DPDP Act 2023, and user responsibility." />
      </Helmet>

      {/* --- HEADER --- */}
      <section style={styles.section}>
        <h1 className="gradient-text" style={styles.heading}>Terms of Service</h1>
        <p style={styles.tagline}>LAST UPDATED: APRIL 2026 | VERSION 2.5</p>
        <p style={styles.paragraph}>
          By accessing or using <strong>Legal-Lens Pro</strong>, you signify your 
          agreement to be bound by these Terms. This platform is a specialized 
          <strong> AI Legal Research Assistant</strong>. If you do not agree to 
          these terms, please discontinue use immediately.
        </p>
      </section>

      {/* --- SECTION 1: NO ATTORNEY-CLIENT RELATIONSHIP --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>1. No Attorney-Client Relationship</h2>
        <p style={styles.paragraph}>
          Your use of Legal-Lens Pro <strong>does not</strong> create an 
          attorney-client relationship between you and the developer (Pragadishwar) 
          or the platform. The information provided is for <strong>educational and 
          literacy purposes only</strong> and does not constitute professional 
          legal representation or advice.
        </p>
      </section>

      {/* --- SECTION 2: AI DIAGNOSTIC LIMITATIONS --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>2. AI Diagnostic Nature & Accuracy</h2>
        <p style={styles.paragraph}>
          Legal-Lens Pro utilizes the <strong>Google Gemini 3 Flash API</strong>. 
          While the model is highly advanced, AI can produce "hallucinations" or 
          incorrect interpretations. 
          <br /><br />
          • The <strong>Risk-O-Meter</strong> score is a mathematical probability 
          of risk, not a definitive legal verdict.
          <br />
          • We do not guarantee 100% accuracy, completeness, or timeliness of 
          the analysis provided.
        </p>
      </section>

      {/* --- SECTION 3: STATUTORY SCOPE (INDIAN LAW) --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>3. Jurisdictional Scope (Indian Law)</h2>
        <p style={styles.paragraph}>
          This tool is specifically optimized for the <strong>Indian Contract Act, 1872</strong>. 
          It may not account for:
          <br /><br />
          • Specific State-level amendments (outside of General Indian Statutes).
          <br />
          • International laws or foreign jurisdictions.
          <br />
          • Evolving precedents from specific High Courts or the Supreme Court 
          decided after the AI's last training cutoff.
        </p>
      </section>

      {/* --- SECTION 4: DATA PRIVACY & DPDP ACT --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>4. Data Privacy (DPDP Act 2023)</h2>
        <p style={styles.paragraph}>
          In alignment with the <strong>Digital Personal Data Protection Act 2023</strong>:
          <br /><br />
          • <strong>Real-time Processing:</strong> Your documents are processed 
          via transient API calls. We do not store your files on our infrastructure.
          <br />
          • <strong>User Redaction:</strong> You are strictly advised to 
          <strong> redact sensitive data</strong> (Aadhar, PAN, Bank Details) 
          before uploading. We are not liable for the exposure of unredacted 
          private information.
        </p>
      </section>
      {/* --- SECTION 5: PROHIBITED USES --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>5. Prohibited Uses</h2>
        <p style={styles.paragraph}>
          By using this service, you agree <strong>NOT</strong> to:
          <br /><br />
          • Use the platform for illegal activities or to generate fraudulent legal documents.
          <br />
          • Attempt to reverse-engineer the <strong>Risk-O-Meter</strong> logic or bypass security protocols.
          <br />
          • Use the AI analysis to harass, intimidate, or deceive third parties in contract negotiations.
          <br />
          • Upload documents that contain malware, viruses, or malicious code.
        </p>
      </section>

      {/* --- SECTION 6: LIMITATION OF LIABILITY --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>6. Limitation of Liability</h2>
        <p style={styles.paragraph}>
          To the maximum extent permitted by Indian Law, the developer (<strong>Pragadishwar</strong>) 
          shall <strong>NOT</strong> be liable for any:
          <br /><br />
          • Direct, indirect, or consequential damages resulting from AI hallucinations or inaccuracies.
          <br />
          • Financial losses incurred due to signing a contract analyzed by this tool.
          <br />
          • Legal disputes arising from the user's reliance on the <strong>Case Studies</strong> or <strong>Legal Tips</strong> provided in the dashboard.
          <br />
          • Loss of data or security breaches occurring outside of the platform’s transient processing environment.
        </p>
      </section>

      {/* --- SECTION 7: DISCLAIMER OF WARRANTIES --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>7. Disclaimer of Warranties</h2>
        <p style={styles.paragraph}>
          Legal-Lens Pro is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> 
          basis. We disclaim all warranties, whether express or implied, including the 
          warranty of merchantability or fitness for a particular legal purpose. 
          The use of the <strong>Gemini 3 Flash API</strong> is subject to Google's 
          own service availability and uptime.
        </p>
      </section>

      {/* --- SECTION 8: GOVERNING LAW & JURISDICTION --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>8. Governing Law & Jurisdiction</h2>
        <p style={styles.paragraph}>
          These Terms shall be governed by and construed in accordance with the 
          laws of <strong>India</strong>. Any disputes arising out of or in 
          connection with these terms shall be subject to the <strong>exclusive 
          jurisdiction</strong> of the courts located in <strong>Ahmedabad, Gujarat</strong>. 
          This ensures that any legal matters are handled within the developer's 
          local jurisdiction.
        </p>
      </section>

      {/* --- SECTION 9: MODIFICATIONS --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>9. Modifications to Service</h2>
        <p style={styles.paragraph}>
          We reserve the right to modify, suspend, or discontinue the service (or any 
          part thereof) at any time without notice. This includes updates to the 
          <strong> Legal-Lens Pro Dashboard</strong>, the removal of specific 
          regional languages, or changes to the <strong>DLSA database</strong>.
        </p>
      </section>
      {/* --- SECTION 10: ACKNOWLEDGEMENT --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>10. Acknowledgement</h2>
        <p style={styles.paragraph}>
          By clicking <strong>"I AGREE & CONTINUE"</strong> on our entry modal or by 
          using any part of the <strong>Legal-Lens Pro Dashboard</strong>, you 
          acknowledge that you have read, understood, and agreed to be bound by these 
          Terms of Service.
        </p>
      </section>

      {/* --- CONTACT FOR LEGAL QUERIES --- */}
      <div style={{ textAlign: "center", marginTop: "60px", padding: "40px", borderTop: "1px solid #222" }}>
        <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "15px" }}>
          For formal inquiries or questions regarding these Terms, please connect via our support channel:
        </p>
        <button 
          onClick={() => window.location.href = "/contact"} 
          style={{
            background: "rgba(77, 166, 255, 0.1)",
            color: "#4da6ff",
            border: "1px solid rgba(77, 166, 255, 0.4)",
            padding: "12px 30px",
            borderRadius: "30px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s"
          }}
          className="live-pulse"
        >
          Go to Contact Page
        </button>
      </div>
    </div>
  );
}

// --- STYLING ENGINE ---
const styles = {
  container: {
    padding: "100px 20px",
    color: "#e0e0e0",
    maxWidth: "900px",
    margin: "0 auto",
    lineHeight: "1.8",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "transparent"
  },
  section: {
    marginBottom: "40px",
    padding: "35px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: "20px",
    borderLeft: "4px solid #1a1a1a", // Neutral dark border for a serious look
    transition: "border-color 0.3s ease",
    border: "1px solid rgba(255, 255, 255, 0.05)"
  },
  heading: {
    fontSize: "3.5rem",
    marginBottom: "15px",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: "-1px"
  },
  tagline: {
    fontSize: "0.85rem",
    color: "#555",
    fontWeight: "bold",
    letterSpacing: "3px",
    marginBottom: "50px",
    textAlign: "center"
  },
  subheading: {
    fontSize: "1.6rem",
    marginBottom: "20px",
    color: "#4da6ff", // Using your signature "Pro Blue"
    fontWeight: "700"
  },
  paragraph: {
    fontSize: "1.05rem",
    color: "#b0b0b0",
    lineHeight: "1.8"
  }
};

export default Terms;