import React from 'react';

const WhyChooseUs = ({ cyberMode, themes }) => {
  const accentColor = cyberMode ? themes.cyber.accent : '#007bff';

  const cardStyle = {
    flex: '1',
    minWidth: '250px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: `1px solid ${cyberMode ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 123, 255, 0.1)'}`,
    padding: '25px',
    borderRadius: '15px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)',
    boxShadow: cyberMode ? themes.cyber.glow : 'none'
  };

  return (
    <section className="why-choose-us" style={{ margin: '60px auto', maxWidth: '1100px', padding: '0 20px' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '40px', 
        fontSize: '1.8rem',
        color: cyberMode ? themes.cyber.secondary : '#333',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        Why Legal-Lens Pro?
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap' }}>
        
        {/* Card 1: The Brain */}
        <div className="feature-card" style={cardStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🚀</div>
          <h4 style={{ color: accentColor, marginBottom: '10px', fontSize: '1.2rem' }}>Gemini 3 Powered</h4>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.6', color: '#eee' }}>
            Leveraging SOTA AI architecture for 2026-grade legal reasoning, 40% faster processing, and improved context awareness.
          </p>
        </div>

        {/* Card 2: The Shield */}
        <div className="feature-card" style={cardStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🛡️</div>
          <h4 style={{ color: accentColor, marginBottom: '10px', fontSize: '1.2rem' }}>Privacy First</h4>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.6', color: '#eee' }}>
            Full <strong>DPDP Act 2023</strong> compliance. We utilize real-time ephemeral processing—your data is never stored on our servers.
          </p>
        </div>

        {/* Card 3: The Bridge */}
        <div className="feature-card" style={cardStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🏛️</div>
          <h4 style={{ color: accentColor, marginBottom: '10px', fontSize: '1.2rem' }}>Pan-India Aid</h4>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.6', color: '#eee' }}>
            Bridging the gap between AI analysis and action with direct integration for <strong>750+ District Legal Services Authorities</strong>.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;