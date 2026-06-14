import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';

export default function About({ personal }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  // 3D tilt for avatar card
  const avatarRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-12, 12]);
  const springX = useSpring(rotateX, { stiffness: 350, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 350, damping: 25 });

  const onMouseMove = (e) => {
    const rect = avatarRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  const facts = [
    { icon: '🎓', label: 'Education', value: 'B.Tech Computer Science' },
    { icon: '📍', label: 'Location', value: personal?.location ?? 'India' },
    { icon: '📧', label: 'Email', value: personal?.email ?? 'chamantej.chukka@gmail.com' },
    { icon: '🚀', label: 'Status', value: 'Open to Opportunities' },
  ];

  return (
    <section id="about" style={{ background: 'var(--bg2)' }} ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">// about me</span>
          <h2 className="section-title">Who Am I?</h2>
          <div className="section-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>

          {/* 3D Tilt Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <motion.div
              ref={avatarRef}
              style={{
                rotateX: springX, rotateY: springY,
                transformStyle: 'preserve-3d',
                transformPerspective: 900,
                width: 260, height: 260,
              }}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            >
              <div style={{
                width: '100%', height: '100%',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
                border: '2px solid rgba(99,102,241,0.35)',
                backdropFilter: 'blur(10px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '1rem', position: 'relative', overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ fontSize: '5rem' }}
                >
                  👨‍💻
                </motion.div>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', color: '#6366f1' }}>
                  &lt;developer /&gt;
                </div>
                {/* Shine sweep */}
                <motion.div
                  animate={{ x: [-300, 400] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at 50% 120%, rgba(99,102,241,0.15), transparent)',
                }} />
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0' }}>
              Passionate about building great software
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.9 }}>
              I'm a computer science student with a strong passion for full-stack development. I enjoy turning complex problems into clean, elegant solutions through well-structured code.
            </p>
            <p style={{ color: '#94a3b8', lineHeight: 1.9 }}>
              With experience in both frontend and backend technologies, I have worked on projects ranging from web applications to cloud simulations. I am always eager to learn new technologies and contribute to meaningful projects.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {facts.map(({ icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(99,102,241,0.2)' }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                    padding: '1rem',
                    background: 'rgba(19,19,43,0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(99,102,241,0.15)',
                    borderRadius: '10px',
                    transition: 'border-color 0.3s',
                    cursor: 'default',
                  }}
                  onHoverStart={e => e.target.style && (e.target.style.borderColor = 'rgba(99,102,241,0.4)')}
                  onHoverEnd={e => e.target.style && (e.target.style.borderColor = 'rgba(99,102,241,0.15)')}
                >
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#6366f1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: 2 }}>{value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
