import React, { useEffect, useState } from 'react';

const roles = ['Full Stack Developer', 'React.js Enthusiast', 'Django Developer', 'CS Student', 'Problem Solver'];

export default function Hero({ personal }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', background: 'var(--bg)',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '60%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '10%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ paddingTop: '5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 680 }}>

          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: "'Fira Code', monospace", fontSize: '0.85rem',
            color: '#10b981', background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)', padding: '0.35rem 1rem',
            borderRadius: '100px', width: 'fit-content',
          }}>
            <span style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            Available for Internships
          </span>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Hi, I'm <span style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{personal?.name?.split(' ')[0] ?? 'Chaman'}</span>
          </h1>

          <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 600, color: '#94a3b8', minHeight: '2.5rem' }}>
            <span style={{ color: '#e2e8f0' }}>{displayed}</span>
            <span style={{ borderRight: '2px solid #6366f1', marginLeft: 2, animation: 'blink 1s infinite' }} />
          </div>

          <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: 560 }}>
            {personal?.bio ?? 'Passionate developer building real-world applications with modern technologies. Eager to contribute and learn in every opportunity.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
            <button className="btn btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="btn btn-outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get In Touch
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem' }}>
            {[['3+', 'Internships'], ['10+', 'Projects'], ['5+', 'Tech Stacks']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{num}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
      `}</style>
    </section>
  );
}
