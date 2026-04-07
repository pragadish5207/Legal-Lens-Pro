import React from 'react';
import { Helmet } from 'react-helmet';
import { PATCH_UPDATES } from '../patchData';

const Updates = () => {
  const updateTheme = {
    bg: "transparent",
    text: "#e0e0e0",
    subtext: "#888",
    future: "#a855f7", // Purple
    current: "#007bff", // Blue
    past: "#333"       // Grey
  };

  return (
    <div style={{ padding: '100px 20px', maxWidth: '900px', margin: '0 auto', minHeight: '100vh' }}>
      <Helmet>
        <title>Product Roadmap | Legal-Lens Pro AI Evolution</title>
      </Helmet>

      {/* --- INJECTING PULSE ANIMATION --- */}
      <style>
        {`
          @keyframes livePulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
          }
          .latest-badge {
            animation: livePulse 2s infinite;
          }
        `}
      </style>

      <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '15px', fontWeight: '900', textAlign: 'center' }}>
        Product Roadmap
      </h1>
      <p style={{ color: updateTheme.subtext, fontSize: '1.1rem', marginBottom: '80px', textAlign: 'center', maxWidth: '700px', margin: '0 auto 80px auto' }}>
        A transparent record of our journey toward democratizing Indian law with Gemini 3.
      </p>

      <div style={{ position: 'relative', borderLeft: `2px solid #222`, paddingLeft: '40px', marginLeft: '20px' }}>
        {PATCH_UPDATES.map((patch, index) => {
          const isFuture = patch.status === 'PLANNED';
          const isCurrent = patch.status === 'LATEST';
          const accentColor = isFuture ? updateTheme.future : isCurrent ? updateTheme.current : updateTheme.past;

          return (
            <div key={index} style={{ marginBottom: '80px', position: 'relative' }}>
              
              {/* --- 1. THE TIMELINE DOT --- */}
              <div style={{
                position: 'absolute', left: '-51px', top: '5px',
                width: '20px', height: '20px', borderRadius: '50%',
                backgroundColor: '#000', 
                border: `4px solid ${accentColor}`,
                boxShadow: isCurrent ? `0 0 15px ${accentColor}` : 'none',
                zIndex: 2
              }} />

              {/* --- 2. THE VERSION BADGE --- */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <span 
                  className={isCurrent ? "latest-badge" : ""}
                  style={{ 
                    background: isCurrent ? accentColor : isFuture ? 'rgba(168, 85, 247, 0.1)' : '#1a1a1a',
                    color: isCurrent ? '#fff' : isFuture ? updateTheme.future : '#666',
                    padding: '6px 16px', borderRadius: '30px', fontSize: '12px', fontWeight: '800',
                    letterSpacing: '1.5px', 
                    border: isCurrent ? 'none' : `1px solid ${accentColor === updateTheme.past ? '#333' : accentColor + '44'}`
                  }}
                >
                  {patch.version} {isCurrent && "• LIVE"}
                </span>
                <span style={{ color: updateTheme.subtext, fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>
                  {patch.date}
                </span>
              </div>

              {/* --- 3. THE CONTENT --- */}
              <h2 style={{ color: '#fff', fontSize: '28px', marginBottom: '12px', fontWeight: '700' }}>
                {patch.title}
              </h2>
              <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '25px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                {patch.description}
              </p>
              
              <ul style={{ color: updateTheme.text, lineHeight: '2.2', listStyleType: 'none', padding: 0 }}>
                {patch.features.map((feat, i) => (
                  <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: accentColor, fontSize: '1.2rem' }}>
                      {isFuture ? '✨' : '✓'}
                    </span> 
                    <span style={{ color: isFuture ? '#666' : '#bbb' }}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Updates;