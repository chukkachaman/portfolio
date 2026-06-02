import React from 'react';

export default function Footer({ personal }) {
  return (
    <footer style={{
      background: 'var(--bg)', borderTop: '1px solid var(--border)',
      padding: '2.5rem 0', textAlign: 'center',
    }}>
      <div className="container">
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {personal?.name ?? 'Portfolio'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {[
            ['About', 'about'], ['Skills', 'skills'], ['Experience', 'experience'],
            ['Projects', 'projects'], ['Contact', 'contact'],
          ].map(([label, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.82rem', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#6366f1'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >{label}</button>
          ))}
        </div>
        <p style={{ color: '#475569', fontSize: '0.8rem' }}>
          Built with React.js & Node.js &nbsp;•&nbsp; Designed with ❤️ &nbsp;•&nbsp; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
