import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const roles = ['Full Stack Developer', 'React.js Enthusiast', 'Django Developer', 'CS Student @ IIT BHU', 'Problem Solver'];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

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

  // 3D tilt for photo
  const photoRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10]);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 25 });

  const onPhotoMouseMove = (e) => {
    const rect = photoRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onPhotoMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', background: 'transparent',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '8%', right: '3%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{
          position: 'absolute', bottom: '8%', left: '3%',
          width: 450, height: 450, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position: 'absolute', top: '50%', left: '40%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ paddingTop: '5rem', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '3rem',
          alignItems: 'center',
        }} className="hero-grid">

          {/* LEFT — staggered text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <motion.span variants={item} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: "'Fira Code', monospace", fontSize: '0.85rem',
              color: '#10b981', background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.25)', padding: '0.35rem 1rem',
              borderRadius: '100px', width: 'fit-content',
            }}>
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', display: 'inline-block' }}
              />
              Available for Internships
            </motion.span>

            <motion.h1 variants={item} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Hi, I'm{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {personal?.name?.split(' ')[0] ?? 'Chaman'}
              </span>
            </motion.h1>

            <motion.div variants={item} style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 600, color: '#94a3b8', minHeight: '2.5rem' }}>
              <span style={{ color: '#e2e8f0' }}>{displayed}</span>
              <span style={{ borderRight: '2px solid #6366f1', marginLeft: 2, animation: 'blink 1s infinite' }} />
            </motion.div>

            <motion.p variants={item} style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: 520 }}>
              {personal?.bio ?? 'Passionate developer building real-world applications with modern technologies. Eager to contribute and learn in every opportunity.'}
            </motion.p>

            <motion.div variants={item} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </motion.button>
              <motion.button
                className="btn btn-outline"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </motion.button>
            </motion.div>

            <motion.div variants={item} style={{ display: 'flex', gap: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem' }}>
              {[['4+', 'Projects'], ['1635', 'CF Rating'], ['1000+', 'Problems Solved']].map(([num, label]) => (
                <motion.div key={label} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{num}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 2 }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — 3D tilt photo with float */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
          >
            {/* Float wrapper */}
            <motion.div
              animate={{ y: [-12, 12, -12] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative' }}
            >
              {/* Photo with 3D tilt */}
              <motion.div
                ref={photoRef}
                style={{
                  rotateX: springX, rotateY: springY,
                  transformStyle: 'preserve-3d',
                  transformPerspective: 1000,
                  position: 'relative',
                }}
                onMouseMove={onPhotoMouseMove}
                onMouseLeave={onPhotoMouseLeave}
              >
                {/* Outer spinning glow ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    inset: -6,
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #7c3aed)',
                    zIndex: 0,
                  }}
                />
                {/* Inner white gap ring */}
                <div style={{
                  position: 'absolute',
                  inset: -3,
                  borderRadius: '50%',
                  background: 'var(--bg)',
                  zIndex: 1,
                }} />
                {/* Glow behind */}
                <div style={{
                  position: 'absolute',
                  inset: -20,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, rgba(6,182,212,0.2) 50%, transparent 75%)',
                  filter: 'blur(18px)',
                  zIndex: 0,
                }} />
                {/* Circular photo */}
                <div style={{
                  width: 360, height: 360,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 2,
                }}>
                  <img
                    src="/profile.png"
                    alt="Chaman Tej"
                    style={{
                      width: '100%', height: '120%',
                      objectFit: 'cover', objectPosition: 'center 15%',
                      filter: 'contrast(1.05) brightness(1.05)',
                      marginTop: '-10%',
                    }}
                  />
                </div>
              </motion.div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.1 }}
                style={{
                  position: 'absolute', top: '5%', right: '-12%',
                  background: 'rgba(19,19,43,0.85)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(99,102,241,0.4)',
                  borderRadius: '12px', padding: '0.6rem 1rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', zIndex: 2,
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>⭐</span> Expert on CF
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.1 }}
                style={{
                  position: 'absolute', bottom: '10%', left: '-14%',
                  background: 'rgba(19,19,43,0.85)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(16,185,129,0.4)',
                  borderRadius: '12px', padding: '0.6rem 1rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', zIndex: 2,
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>🎓</span> IIT (BHU) Varanasi
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: flex !important; justify-content: center; margin-top: 2rem; }
        }
      `}</style>
    </section>
  );
}
