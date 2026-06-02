import React, { useState } from 'react';

export default function Experience({ experience }) {
  const [active, setActive] = useState(0);
  if (!experience) return null;

  const current = experience[active];

  return (
    <section id="experience" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// work history</span>
          <h2 className="section-title">Experience & Internships</h2>
          <div className="section-line" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Tab list */}
          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid var(--border)' }}>
            {experience.map((exp, i) => (
              <button key={exp.id} onClick={() => setActive(i)} style={{
                background: active === i ? 'rgba(99,102,241,0.1)' : 'none',
                border: 'none', borderLeft: active === i ? '2px solid #6366f1' : '2px solid transparent',
                marginLeft: -2, color: active === i ? '#6366f1' : '#94a3b8',
                padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer',
                transition: 'all 0.2s', fontSize: '0.88rem', fontWeight: active === i ? 600 : 400,
              }}>
                {exp.company}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0' }}>
                {current.role}{' '}
                <span style={{ color: '#6366f1' }}>@ {current.company}</span>
              </h3>
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                {current.duration}
              </p>
            </div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.75rem',
              borderRadius: '100px', width: 'fit-content',
              background: 'rgba(16,185,129,0.1)', color: '#10b981',
              border: '1px solid rgba(16,185,129,0.25)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
              Internship
            </div>

            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>
              {current.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {current.technologies.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #experience .container > div[style] { grid-template-columns: 1fr !important; }
          #experience div[style*="borderLeft: '2px solid var(--border)'"] { flex-direction: row !important; border-left: none !important; border-bottom: 2px solid var(--border); overflow-x: auto; }
          #experience div[style*="borderLeft: '2px solid var(--border)'"] button { border-left: none !important; border-bottom: 2px solid transparent; white-space: nowrap; }
        }
      `}</style>
    </section>
  );
}
