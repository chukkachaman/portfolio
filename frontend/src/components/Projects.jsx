import React from 'react';

const projectEmojis = { studybud: '📚', portfolio: '🌐', cloudsim: '☁️' };

export default function Projects({ projects }) {
  if (!projects) return null;
  return (
    <section id="projects" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// my work</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-line" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.map((proj) => (
            <div key={proj.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              {/* Project image/banner */}
              <div style={{
                height: 140, borderRadius: '10px', margin: '-0.25rem -0.25rem 0',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(99,102,241,0.15)', fontSize: '3.5rem',
              }}>
                {projectEmojis[proj.image] ?? '🔨'}
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.5rem' }}>
                  {proj.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7 }}>
                  {proj.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                {proj.technologies.map(t => (
                  <span key={t} className="tag" style={{ fontSize: '0.7rem' }}>{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: '0.82rem', color: '#94a3b8', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#6366f1'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.79 1.29 3.47.99.11-.77.42-1.29.76-1.59-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub
                  </a>
                )}
                {proj.live && (
                  <a href={proj.live} target="_blank" rel="noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: '0.82rem', color: '#94a3b8', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#10b981'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
