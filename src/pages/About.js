import React from 'react';
import { Helmet } from 'react-helmet';

function About() {
  return (
    <div style={styles.container}>
      <Helmet>
        <title>About Legal-Lens Pro | Meet the Founder Pragadishwar</title>
        <meta name="description" content="Discover how Legal-Lens Pro uses Gemini 3 Flash to simplify the Indian Contract Act 1872. Built by AI Innovator Pragadishwar." />
      </Helmet>

      {/* --- HERO SECTION --- */}
      <section style={styles.section}>
        <h1 className="gradient-text" style={styles.heading}>The Vision Behind Legal-Lens Pro</h1>
        <p style={styles.tagline}>
          Democratizing Justice through <strong>Generative AI</strong>.
        </p>
        <p style={styles.paragraph}>
          Legal-Lens Pro isn't just a tool; it's a mission. In a country where legal jargon 
          acts as a barrier to justice, we use cutting-edge <strong>AI Contract Analysis</strong> 
          to empower every citizen. Based on the <strong>Indian Contract Act 1872</strong>, 
          our platform translates complex fine print into actionable insights.
        </p>
      </section>

      {/* --- KEY INNOVATIONS SECTION --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>Core Innovations</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureItem}>
            <h3 style={styles.featureTitle}>📊 Risk-O-Meter v2.5</h3>
            <p style={styles.featureText}>
              Our proprietary diagnostic engine that scores contracts on a 0-10 scale, 
              instantly identifying predatory clauses and "Void for Uncertainty" risks.
            </p>
          </div>
          <div style={styles.featureItem}>
            <h3 style={styles.featureTitle}>🌐 Multilingual Justice</h3>
            <p style={styles.featureText}>
              Breaking language barriers by providing high-fidelity AI analysis in over 
              <strong> 50+ regional Indian languages</strong>, from Tamil to Gujarati.
            </p>
          </div>
          <div style={styles.featureItem}>
            <h3 style={styles.featureTitle}>⚖️ 750+ DLSA Network</h3>
            <p style={styles.featureText}>
              The first AI tool with Pan-India integration, mapping users directly to 
              District Legal Services Authorities for free, local legal assistance.
            </p>
          </div>
          <div style={styles.featureItem}>
            <h3 style={styles.featureTitle}>📄 Multimodal OCR</h3>
            <p style={styles.featureText}>
              Powered by <strong>Gemini 3 Flash</strong>, our scanner processes 
              PDFs, images, and raw text with a 1-million token context window.
            </p>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>The Intelligence Layer</h2>
        <p style={styles.paragraph}>
          By leveraging the <strong>Gemini 3 Flash API</strong>, Legal-Lens Pro performs 
          an <em>automated contract review</em> that cross-references your documents against 
          standard Indian statutes. We analyze for hidden liabilities, unconscionable 
          bargains, and Section 29 violations in real-time.
        </p>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button 
            onClick={() => window.location.href = "/"} 
            style={styles.ctaButton}
            className="live-pulse"
          >
            Launch AI Scanner
          </button>
        </div>
      </section>
      {/* --- MEET THE FOUNDER SECTION --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>Meet the Innovator</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={styles.paragraph}>
            Legal-Lens Pro is founded by <strong>Pragadishwar (Appu)</strong>, an AI 
            Innovator and B.Com student from Ahmedabad. By merging deep commerce 
            expertise with technical training from the <strong>Jio Institute AI Classroom 
            Foundation</strong> and a <strong>Generative AI Mastermind</strong> 
            certification from Outskill (March 2026), he has built a platform that 
            democratizes legal literacy.
          </p>
          <p style={styles.paragraph}>
            As a "Serial Creator," Pragadishwar specializes in building 
            <strong> zero-investment, high-impact AI tools</strong> that solve 
            real-world problems. His work focuses on making complex data sets—like 
            750+ Indian DLSA offices—accessible to the common man through 
            intuitive, responsive design.
          </p>
        </div>
      </section>

      {/* --- ECOSYSTEM SECTION --- */}
      <div style={styles.ecosystemContainer}>
        <p style={styles.ecosystemTitle}>🚀 Part of the Lens Intelligence Suite</p>
        <div style={styles.badgeGrid}>
          <span style={styles.activeBadge}>Legal-Lens Pro</span>
          <span style={styles.activeBadge}>Study-Lens Pro</span>
          <span style={styles.activeBadge}>Zero-to-SEO</span>
          <span style={styles.upcomingBadge}>Research-Lens (Soon)</span>
        </div>
        <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#555' }}>
          A coordinated ecosystem of AI tools for Education, Law, and Research.
        </p>
      </div>
    </div>
  );
}

// --- STYLING ENGINE (Lines 185+) ---
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
    marginBottom: "80px",
    animation: "fadeIn 1s ease-in"
  },
  heading: {
    fontSize: "3.5rem",
    marginBottom: "20px",
    fontWeight: "900",
    textAlign: "center"
  },
  tagline: {
    fontSize: "1.1rem",
    color: "#666",
    marginBottom: "40px",
    letterSpacing: "4px",
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center"
  },
  subheading: {
    fontSize: "2rem",
    marginTop: "40px",
    marginBottom: "25px",
    color: "#4da6ff",
    borderBottom: "1px solid #222",
    paddingBottom: "12px",
    fontWeight: "700"
  },
  paragraph: {
    fontSize: "1.15rem",
    marginBottom: "20px",
    color: "#bbb",
    lineHeight: "1.8"
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    marginTop: "30px"
  },
  featureItem: {
    padding: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "transform 0.3s ease, border-color 0.3s ease",
    cursor: "default"
  },
  featureTitle: {
    fontSize: "1.4rem",
    color: "#fff",
    marginBottom: "12px",
    fontWeight: "600"
  },
  featureText: {
    fontSize: "1rem",
    color: "#888",
    lineHeight: "1.6"
  },
  ctaButton: {
    padding: "16px 45px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 10px 25px rgba(0, 123, 255, 0.3)"
  },
  ecosystemContainer: {
    textAlign: "center",
    marginTop: "100px",
    padding: "50px 20px",
    borderTop: "1px solid #222",
    backgroundColor: "rgba(0, 123, 255, 0.02)",
    borderRadius: "30px"
  },
  ecosystemTitle: {
    fontSize: "0.8rem",
    color: "#555",
    letterSpacing: "4px",
    textTransform: "uppercase",
    marginBottom: "25px",
    fontWeight: "bold"
  },
  badgeGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },
  activeBadge: {
    padding: "8px 20px",
    backgroundColor: "rgba(0, 123, 255, 0.1)",
    color: "#4da6ff",
    borderRadius: "25px",
    fontSize: "0.85rem",
    fontWeight: "bold",
    border: "1px solid rgba(0, 123, 255, 0.2)",
    boxShadow: "0 0 15px rgba(0, 123, 255, 0.1)"
  },
  upcomingBadge: {
    padding: "8px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    color: "#444",
    borderRadius: "25px",
    fontSize: "0.85rem",
    border: "1px solid #222"
  },
  footerLinks: {
    textAlign: "center",
    marginTop: "100px",
    padding: "40px",
    borderTop: "1px solid #151515"
  },
  footerLinkItem: {
    color: "#555",
    margin: "0 20px",
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "color 0.3s ease"
  }
};

export default About;