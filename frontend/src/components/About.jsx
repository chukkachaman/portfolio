import React from 'react';

export default function About({ personal }) {
  const facts = [
    { icon: '🎓', label: 'Education', value: 'B.Tech Computer Science' },
    { icon: '📍', label: 'Location', value: personal?.location ?? 'India' },
    { icon: '📧', label: 'Email', value: personal?.email ?? 'chamantej.chukka@gmail.com' },
    { icon: '🚀', label: 'Status', value: 'Open to Opportunities' },
  ];

  return (
    <section id="about" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// about me</span>
          <h2 className="section-title">Who Am I?</h2>
          <div className="section-line" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          {/* Avatar placeholder */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 260, height: 260, borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
              border: '2px solid rgba(99,102,241,0.3)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '1rem', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ fontSize: '5rem' }}>👨‍💻</div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', color: '#6366f1' }}>
                &lt;developer /&gt;
              </div>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 120%, rgba(99,102,241,0.15), transparent)',
              }} />
            </div>
          </div>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
              {facts.map(({ icon, label, value }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  padding: '1rem', background: 'var(--card)',
                  border: '1px solid var(--border)', borderRadius: '10px',
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#6366f1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: 2 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
