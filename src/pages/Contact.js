import React from 'react';

function Contact() {
  const handleEmailClick = () => {
    const subject = "Query regarding Legal-Lens Pro";
    window.location.href = `mailto:pragadishwar5207@gmail.com?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div style={styles.container}>
      {/* --- HEADER --- */}
      <section style={styles.section}>
        <h1 style={styles.heading}>Connect with the Developer</h1>
        <p style={styles.paragraph}>
          Have questions about the <strong>AI Legal Scanner</strong> or want to collaborate 
          on legal-tech innovation? We're building the future of <strong>Indian law transparency</strong>, 
          one line of code at a time.
        </p>
      </section>

      {/* --- CONTACT GRID --- */}
      <div style={styles.contactGrid}>
        <div style={styles.contactCard}>
          <h2 style={styles.cardHeading}>📬 Official Support</h2>
          <p style={styles.cardText}>For bug reports, feature requests, or business inquiries:</p>
          <button onClick={handleEmailClick} style={styles.emailButton}>
            pragadishwar5207@gmail.com
          </button>
        </div>

        <div style={styles.contactCard}>
          <h2 style={styles.cardHeading}>📍 Location</h2>
          <p style={styles.cardText}>
            Operating from the heart of <strong>Ahmedabad, Gujarat, India</strong>. 
            Rooted in the community at Gujarat Housing Board, Khokhara.
          </p>
        </div>
      </div>

      {/* --- DEVELOPER BADGE --- */}
      <div style={styles.devBadge}>
        <div style={styles.avatar}>P</div>
        <div>
          <h3 style={{ margin: 0, color: "#fff" }}>Pragadishwar </h3>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#888" }}>
            B.Com Student | AI Developer | Jio Institute Alumnus
          </p>
        </div>
      </div>

      {/* --- DISCLAIMER --- */}
      <p style={styles.disclaimer}>
        <strong>Disclaimer:</strong> Legal-Lens Pro is an educational AI project. 
        It does not replace professional legal counsel. For binding advice, 
        please visit your nearest District Legal Services Authority (DLSA).
      </p>
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
    textAlign: "center"
  },
  heading: {
    fontSize: "2.8rem",
    marginBottom: "15px",
    background: "linear-gradient(90deg, #4da6ff, #b3d9ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "800"
  },
  paragraph: {
    fontSize: "1.1rem",
    color: "#aaa",
    marginBottom: "20px"
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    marginBottom: "50px"
  },
  contactCard: {
    padding: "30px",
    backgroundColor: "#111",
    borderRadius: "20px",
    border: "1px solid #222",
    transition: "0.3s",
    textAlign: "center"
  },
  cardHeading: {
    fontSize: "1.4rem",
    color: "#4da6ff",
    marginBottom: "15px"
  },
  cardText: {
    fontSize: "0.95rem",
    color: "#888",
    lineHeight: "1.6"
  },
  emailButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#1a1a1a",
    color: "#4da6ff",
    border: "1px solid #4da6ff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "0.3s"
  },
  devBadge: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "25px",
    backgroundColor: "rgba(77, 166, 255, 0.05)",
    borderRadius: "15px",
    border: "1px solid #4da6ff33",
    marginBottom: "40px"
  },
  avatar: {
    width: "60px",
    height: "60px",
    backgroundColor: "#4da6ff",
    color: "#000",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  disclaimer: {
    fontSize: "0.9rem",
    color: "#555",
    borderTop: "1px solid #222",
    paddingTop: "30px",
    textAlign: "center",
    fontStyle: "italic"
  }
};

export default Contact;