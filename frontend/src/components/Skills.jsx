import React from 'react';

const techIcons = {
  'React.js': '⚛️', 'Node.js': '🟢', 'Django': '🐍', 'Python': '🐍',
  'JavaScript': '🟨', 'HTML5': '🟠', 'CSS3': '🔵', 'PostgreSQL': '🐘',
  'MySQL': '🗄️', 'MongoDB': '🍃', 'Git': '🔀', 'GitHub': '🐙',
  'Docker': '🐳', 'AWS': '☁️', 'Java': '☕', 'C': '⚙️', 'C++': '⚙️',
  'Tailwind CSS': '🎨', 'REST APIs': '🔗', 'Postman': '📮', 'VS Code': '💻',
  'SQLite': '🗃️', 'Eclipse': '🌒',
};

const categoryColors = {
  'Frontend': { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', accent: '#6366f1' },
  'Backend':  { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', accent: '#10b981' },
  'Database': { bg: 'rgba(6,182,212,0.1)',  border: 'rgba(6,182,212,0.3)',  accent: '#06b6d4' },
  'Tools':    { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', accent: '#f59e0b' },
  'Languages':{ bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)', accent: '#8b5cf6' },
};

export default function Skills({ skills }) {
  if (!skills) return null;
  return (
    <section id="skills" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// tech stack</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="section-line" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {skills.map(({ category, items }) => {
            const colors = categoryColors[category] ?? categoryColors['Tools'];
            return (
              <div key={category} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                    <span key={item} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                      padding: '0.3rem 0.7rem', borderRadius: '6px',
                      background: colors.bg, border: `1px solid ${colors.border}`,
                      fontSize: '0.78rem', fontWeight: 500, color: '#e2e8f0',
                      fontFamily: "'Fira Code', monospace",
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = colors.border; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = colors.bg; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <span>{techIcons[item] ?? '•'}</span> {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
