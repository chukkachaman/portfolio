import React, { useState, useEffect } from 'react';

const links = ['About', 'Skills', 'Projects', 'Contact'];

export default function Navbar({ personal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '1rem 2rem',
      background: scrolled ? 'rgba(10,10,26,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(30,30,64,0.8)' : 'none',
      transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span style={{
        fontFamily: "'Fira Code', monospace",
        fontSize: '1.1rem', fontWeight: 600,
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        {personal?.name?.split(' ')[0] ?? 'Portfolio'}<span style={{ color: '#6366f1' }}>.dev</span>
      </span>

      <div style={{ display: 'flex', gap: '0.25rem' }} className="nav-links">
        {links.map(l => (
          <button key={l} onClick={() => scrollTo(l)} style={{
            background: 'none', border: 'none', color: '#94a3b8',
            padding: '0.5rem 0.9rem', borderRadius: '6px',
            fontSize: '0.88rem', fontWeight: 500, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.color = '#e2e8f0'; e.target.style.background = 'rgba(99,102,241,0.1)'; }}
          onMouseLeave={e => { e.target.style.color = '#94a3b8'; e.target.style.background = 'none'; }}
          >{l}</button>
        ))}
      </div>

      <button onClick={() => scrollTo('Contact')} style={{
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        border: 'none', color: 'white', padding: '0.5rem 1.25rem',
        borderRadius: '8px', fontSize: '0.88rem', fontWeight: 600,
        cursor: 'pointer', boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 20px rgba(99,102,241,0.5)'; }}
      onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(99,102,241,0.3)'; }}
      >
        Hire Me
      </button>
    </nav>
  );
}
