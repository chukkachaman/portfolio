import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';

const techIcons = {
  'React.js': '⚛️', 'Node.js': '🟢', 'Django': '🐍', 'Python': '🐍',
  'JavaScript': '🟨', 'HTML5': '🟠', 'CSS3': '🔵', 'PostgreSQL': '🐘',
  'MySQL': '🗄️', 'MongoDB': '🍃', 'Git': '🔀', 'GitHub': '🐙',
  'Docker': '🐳', 'AWS': '☁️', 'Java': '☕', 'C': '⚙️', 'C++': '⚙️',
  'Tailwind CSS': '🎨', 'REST APIs': '🔗', 'Postman': '📮', 'VS Code': '💻',
  'SQLite': '🗃️', 'Eclipse': '🌒',
};

const categoryColors = {
  'Frontend': { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', accent: '#6366f1', glow: 'rgba(99,102,241,0.25)' },
  'Backend':  { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', accent: '#10b981', glow: 'rgba(16,185,129,0.25)' },
  'Database': { bg: 'rgba(6,182,212,0.1)',  border: 'rgba(6,182,212,0.3)',  accent: '#06b6d4', glow: 'rgba(6,182,212,0.25)' },
  'Tools':    { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', accent: '#f59e0b', glow: 'rgba(245,158,11,0.25)' },
  'Languages':{ bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)', accent: '#8b5cf6', glow: 'rgba(139,92,246,0.25)' },
};

function TiltCard({ children, style }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const springX = useSpring(rotateX, { stiffness: 400, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 400, damping: 30 });
  const scale = useSpring(1, { stiffness: 400, damping: 30 });

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    scale.set(1.03);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); scale.set(1); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: springX, rotateY: springY, scale, transformStyle: 'preserve-3d', transformPerspective: 900, ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function Skills({ skills }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  if (!skills) return null;

  return (
    <section id="skills" style={{ background: 'var(--bg)' }} ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">// tech stack</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="section-line" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {skills.map(({ category, items }, idx) => {
            const colors = categoryColors[category] ?? categoryColors['Tools'];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              >
                <TiltCard>
                  <div style={{
                    display: 'flex', flexDirection: 'column', gap: '1.25rem',
                    background: 'rgba(19,19,43,0.7)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '16px',
                    padding: '1.75rem',
                    boxShadow: `0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)`,
                    height: '100%',
                    transition: 'box-shadow 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '8px',
                        background: colors.bg, border: `1px solid ${colors.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem',
                      }}>
                        {category === 'Frontend' ? '🎨' : category === 'Backend' ? '⚙️' : category === 'Database' ? '🗄️' : category === 'Tools' ? '🔧' : '💻'}
                      </div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: colors.accent }}>{category}</h3>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {items.map(item => (
                        <motion.span
                          key={item}
                          whileHover={{ y: -3, scale: 1.05 }}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                            padding: '0.3rem 0.7rem', borderRadius: '6px',
                            background: colors.bg, border: `1px solid ${colors.border}`,
                            fontSize: '0.78rem', fontWeight: 500, color: '#e2e8f0',
                            fontFamily: "'Fira Code', monospace",
                            cursor: 'default',
                          }}
                        >
                          <span>{techIcons[item] ?? '•'}</span> {item}
                        </motion.span>
                      ))}
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
