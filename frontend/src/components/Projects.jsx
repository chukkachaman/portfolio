import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';

const projectEmojis = { books: '📚', stocks: '📈', portfolio: '🌐', automobile: '🚗' };

const projectColors = [
  { from: 'rgba(99,102,241,0.2)', to: 'rgba(139,92,246,0.2)', glow: 'rgba(99,102,241,0.3)' },
  { from: 'rgba(16,185,129,0.2)', to: 'rgba(6,182,212,0.2)',  glow: 'rgba(16,185,129,0.3)' },
  { from: 'rgba(245,158,11,0.2)', to: 'rgba(239,68,68,0.2)',  glow: 'rgba(245,158,11,0.3)' },
  { from: 'rgba(139,92,246,0.2)', to: 'rgba(236,72,153,0.2)', glow: 'rgba(139,92,246,0.3)' },
];

function TiltCard({ children, style, className }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10]);
  const springX = useSpring(rotateX, { stiffness: 350, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 350, damping: 25 });
  const scale = useSpring(1, { stiffness: 400, damping: 30 });

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    scale.set(1.02);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); scale.set(1); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: springX, rotateY: springY, scale, transformStyle: 'preserve-3d', transformPerspective: 1000, ...style }}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function Projects({ projects }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  if (!projects) return null;

  return (
    <section id="projects" style={{ background: 'var(--bg2)' }} ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">// my work</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.map((proj, idx) => {
            const colors = projectColors[idx % projectColors.length];
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.1 + idx * 0.12 }}
              >
                <TiltCard style={{ height: '100%' }}>
                  <div style={{
                    display: 'flex', flexDirection: 'column', gap: '1.25rem',
                    position: 'relative', overflow: 'hidden',
                    background: 'rgba(15,15,46,0.75)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(99,102,241,0.15)',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    height: '100%',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
                    e.currentTarget.style.boxShadow = `0 20px 60px ${colors.glow}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    {/* Project banner */}
                    <div style={{
                      height: 140, borderRadius: '10px', margin: '-0.25rem -0.25rem 0',
                      background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(99,102,241,0.15)', fontSize: '3.5rem',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <motion.span
                        animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                        style={{ display: 'block' }}
                      >
                        {projectEmojis[proj.image] ?? '🔨'}
                      </motion.span>
                      {/* Shine */}
                      <motion.div
                        animate={{ x: [-200, 300] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5 + idx, ease: 'easeInOut' }}
                        style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)',
                          pointerEvents: 'none',
                        }}
                      />
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

                    <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(30,30,64,0.8)' }}>
                      {proj.github && (
                        <motion.a
                          href={proj.github} target="_blank" rel="noreferrer"
                          whileHover={{ x: 3, color: '#6366f1' }}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#94a3b8' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.79 1.29 3.47.99.11-.77.42-1.29.76-1.59-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                          GitHub
                        </motion.a>
                      )}
                      {proj.live && (
                        <motion.a
                          href={proj.live} target="_blank" rel="noreferrer"
                          whileHover={{ x: 3, color: '#10b981' }}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#94a3b8' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
