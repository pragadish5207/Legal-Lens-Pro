import React from 'react';

function About() {
  return (
    <div style={styles.container}>
      {/* --- HERO SECTION --- */}
      <section style={styles.section}>
        <h1 style={styles.heading}>About Legal-Lens Pro</h1>
        <p style={styles.tagline}>
          A Specialized AI Scanner for <strong>Indian Law</strong>.
        </p>
        <p style={styles.paragraph}>
          Legal-Lens Pro is a comprehensive SEO-friendly <strong>AI contract scanner</strong> designed 
          specifically for the Indian legal landscape. Navigating complex legal jargon shouldn't be 
          a privilege for the few; our mission is to make the <strong>Indian Contract Act 1872</strong> 
          understandable for every citizen.
        </p>
      </section>

      {/* --- KEY FEATURES SECTION --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>Key Innovations</h2>
        <div style={styles.featureGrid}>
  <div style={styles.featureItem}>
    <h3 style={styles.featureTitle}>📊 Risk-O-Meter</h3>
    <p style={styles.featureText}>
      A gamified diagnostic tool that identifies "Red Flags" in documents and scores them based on legal safety.
    </p>
  </div>
  <div style={styles.featureItem}>
    <h3 style={styles.featureTitle}>🌐 50+ Regional Languages</h3>
    <p style={styles.featureText}>
      Bridging the language gap by providing instant AI-powered translations for over 50 regional Indian languages.
    </p>
  </div>
  <div style={styles.featureItem}>
    <h3 style={styles.featureTitle}>⚖️ DLSA Integration</h3>
    <p style={styles.featureText}>
      Direct mapping to 750+ District Legal Services Authorities across India to provide users with immediate local help.
    </p>
  </div>
  {/* NEW 4th FEATURE TO FIX THE GRID */}
  <div style={styles.featureItem}>
    <h3 style={styles.featureTitle}>📄 Smart OCR Scanner</h3>
    <p style={styles.featureText}>
      Advanced Optical Character Recognition allows you to upload photos of physical contracts for instant digital analysis.
    </p>
  </div>
</div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>How It Works</h2>
        <p style={styles.paragraph}>
          Using <strong>Google Gemini flash API</strong>, Legal-Lens Pro processes uploaded 
          PDFs or pasted text to perform an <em>automated contract review</em>. It scans for 
          unfair clauses, hidden liabilities, and specific violations of Indian law, 
          generating a report in plain English or your preferred regional tongue.
        </p>
        {/* Add this right before the closing </section> of your "How It Works" section */}
<div style={{ textAlign: "center", marginTop: "40px" }}>
  <button 
    onClick={() => window.location.href = "/"} 
    style={styles.ctaButton}
  >
    Launch Scanner Now
  </button>
</div>

      </section>

      {/* --- THE VISION SECTION --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>The Vision</h2>
        <p style={styles.paragraph}>
          This platform was developed by <strong>Pragadishwar</strong> to bridge the gap 
          between complex legal fine print and everyday users. As a B.Com student and 
          AI enthusiast, the goal was to create a 100% transparent tool that empowers 
          the common man before they sign on the dotted line.
        </p>
      </section>
      {/* --- DEVELOPER STORY --- */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>Meet the Creator</h2>
        <p style={styles.paragraph}>
          Built by <strong>Pragadishwar</strong>, a B.Com student and AI innovator 
          from Ahmedabad. By combining commerce knowledge with professional training 
          from the <strong>Jio Institute AI Classroom</strong> and a 
          <strong> Generative AI Mastermind</strong> certification from Outskill, 
          this project serves as a real-world case study on how cutting-edge AI 
          can democratize access to justice in India.
        </p>
      </section>


      <div style={styles.ecosystemContainer}>
        <p style={styles.ecosystemTitle}>🚀 Lens Intelligence Suite</p>
        <div style={styles.badgeGrid}>
          <span style={styles.activeBadge}>Study</span>
          <span style={styles.activeBadge}>Legal</span>
          <span style={styles.upcomingBadge}>Research (Soon)</span>
          <span style={styles.upcomingBadge}>Data (Soon)</span>
        </div>
      </div>
      {/* Add this below your Lens Intelligence Suite div */}
<div style={styles.footerLinks}>
  <a href="/faq" style={styles.footerLinkItem}>FAQ</a>
  <a href="/terms" style={{...styles.footerLinkItem, color: '#888'}}>Terms</a>
  <a href="/contact" style={{...styles.footerLinkItem, color: '#888'}}>Contact</a>
</div>
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
    lineHeight: "1.7",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "transparent"
  },
  section: {
    marginBottom: "50px",
    animation: "fadeIn 1s ease-in"
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "10px",
    background: "linear-gradient(90deg, #4da6ff, #b3d9ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "800"
  },
  tagline: {
    fontSize: "1.2rem",
    color: "#888",
    marginBottom: "30px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  subheading: {
    fontSize: "2rem",
    marginTop: "40px",
    marginBottom: "20px",
    color: "#4da6ff",
    borderBottom: "1px solid #333",
    paddingBottom: "10px"
  },
  paragraph: {
    fontSize: "1.15rem",
    marginBottom: "20px",
    color: "#ccc"
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "30px"
  },
  featureItem: {
    padding: "25px",
    backgroundColor: "#111",
    borderRadius: "15px",
    border: "1px solid #222",
    transition: "transform 0.3s ease",
    cursor: "default"
  },
  featureTitle: {
    fontSize: "1.3rem",
    color: "#fff",
    marginBottom: "10px"
  },
  featureText: {
    fontSize: "0.95rem",
    color: "#999"
  },
  footerNote: {
    marginTop: "80px",
    textAlign: "center",
    padding: "20px",
    borderTop: "1px solid #222",
    fontSize: "0.9rem",
    color: "#666"
  },
  // Add this to your styles object at the bottom of the file
ctaButton: {
  padding: "15px 40px",
  backgroundColor: "#4da6ff",
  color: "#000",
  border: "none",
  borderRadius: "30px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 4px 15px rgba(77, 166, 255, 0.3)"
},
ecosystemContainer: {
    textAlign: "center",
    marginTop: "60px",
    padding: "30px 20px",
    borderTop: "1px solid #222",
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    borderRadius: "0 0 20px 20px"
  },
  ecosystemTitle: {
    fontSize: "0.75rem",
    color: "#666",
    letterSpacing: "3px",
    textTransform: "uppercase",
    marginBottom: "20px",
    fontWeight: "bold"
  },
  badgeGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap"
  },
  activeBadge: {
    padding: "6px 16px",
    backgroundColor: "rgba(77, 166, 255, 0.1)",
    color: "#4da6ff",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    border: "1px solid rgba(77, 166, 255, 0.3)",
    transition: "0.3s"
  },
  upcomingBadge: {
    padding: "6px 16px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    color: "#444",
    borderRadius: "20px",
    fontSize: "0.8rem",
    border: "1px solid #222"
  },
  // Add this inside your const styles object
footerLinks: {
  textAlign: "center",
  marginTop: "40px",
  padding: "20px",
  borderTop: "1px solid #222"
},
footerLinkItem: {
  color: "#4da6ff",
  margin: "0 15px",
  textDecoration: "none",
  fontSize: "0.9rem",
  transition: "0.3s"
}
};

export default About;