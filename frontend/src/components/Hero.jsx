import React, { useEffect, useState } from 'react';

const roles = ['Full Stack Developer', 'React.js Enthusiast', 'Django Developer', 'CS Student @ IIT BHU', 'Problem Solver'];

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
        position: 'absolute', top: '10%', right: '5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ paddingTop: '5rem', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '3rem',
          alignItems: 'center',
        }} className="hero-grid">

          {/* LEFT — text content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

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

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Hi, I'm{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {personal?.name?.split(' ')[0] ?? 'Chaman'}
              </span>
            </h1>

            <div style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 600, color: '#94a3b8', minHeight: '2.5rem' }}>
              <span style={{ color: '#e2e8f0' }}>{displayed}</span>
              <span style={{ borderRight: '2px solid #6366f1', marginLeft: 2, animation: 'blink 1s infinite' }} />
            </div>

            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: 520 }}>
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
              {[['4+', 'Projects'], ['1635', 'CF Rating'], ['1000+', 'Problems Solved']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{num}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — photo */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Glow ring behind photo */}
            <div style={{
              position: 'absolute',
              width: 380, height: 380,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 50%, transparent 75%)',
              filter: 'blur(20px)',
            }} />
            {/* Decorative ring */}
            <div style={{
              position: 'absolute',
              width: 400, height: 400,
              borderRadius: '50%',
              border: '1.5px solid rgba(99,102,241,0.25)',
            }} />
            <div style={{
              position: 'absolute',
              width: 440, height: 440,
              borderRadius: '50%',
              border: '1px dashed rgba(99,102,241,0.15)',
            }} />

            {/* Photo */}
            <div style={{
              width: 360, height: 420,
              borderRadius: '40% 60% 60% 40% / 50% 50% 50% 50%',
              overflow: 'hidden',
              border: '2px solid rgba(99,102,241,0.4)',
              boxShadow: '0 0 40px rgba(99,102,241,0.3), 0 20px 60px rgba(0,0,0,0.4)',
              background: 'linear-gradient(180deg, rgba(99,102,241,0.15) 0%, rgba(10,10,26,0.8) 100%)',
              position: 'relative',
              zIndex: 1,
            }}>
              <img
                src="/profile.png"
                alt="Chaman Tej"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  mixBlendMode: 'luminosity',
                  filter: 'contrast(1.05) brightness(1.05)',
                }}
              />
            </div>

            {/* Floating badge — top right */}
            <div style={{
              position: 'absolute', top: '5%', right: '-5%',
              background: 'var(--card)', border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '12px', padding: '0.6rem 1rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0',
              zIndex: 2,
            }}>
              <span style={{ fontSize: '1.1rem' }}>⭐</span> Expert on CF
            </div>

            {/* Floating badge — bottom left */}
            <div style={{
              position: 'absolute', bottom: '10%', left: '-8%',
              background: 'var(--card)', border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '12px', padding: '0.6rem 1rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0',
              zIndex: 2,
            }}>
              <span style={{ fontSize: '1.1rem' }}>🎓</span> IIT (BHU) Varanasi
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
