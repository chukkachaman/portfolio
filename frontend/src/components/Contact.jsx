import React, { useState } from 'react';

export default function Contact({ personal }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem',
    background: 'var(--card)', border: '1px solid var(--border)',
    borderRadius: '8px', color: '#e2e8f0', fontSize: '0.95rem',
    outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <section id="contact" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// reach out</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line" />
          <p style={{ color: '#94a3b8', marginTop: '1rem', maxWidth: 500, margin: '1rem auto 0' }}>
            Have an opportunity or just want to say hi? My inbox is always open!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem' }}>
              Let's connect
            </h3>
            {[
              { icon: '📧', label: 'Email', value: personal?.email ?? 'chamantej.chukka@gmail.com', href: `mailto:${personal?.email}` },
              { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/chamantej', href: personal?.linkedin ?? '#' },
              { icon: '🐙', label: 'GitHub', value: 'github.com/chamantej', href: personal?.github ?? '#' },
              { icon: '📍', label: 'Location', value: personal?.location ?? 'India', href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                }}>{icon}</div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  {href ? (
                    <a href={href} style={{ color: '#e2e8f0', fontSize: '0.88rem' }}
                      onMouseEnter={e => e.target.style.color = '#6366f1'}
                      onMouseLeave={e => e.target.style.color = '#e2e8f0'}
                    >{value}</a>
                  ) : (
                    <div style={{ color: '#e2e8f0', fontSize: '0.88rem' }}>{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="card">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e2e8f0' }}>Send a Message</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#6366f1', marginBottom: '0.4rem', fontWeight: 600 }}>Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#6366f1', marginBottom: '0.4rem', fontWeight: 600 }}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#6366f1', marginBottom: '0.4rem', fontWeight: 600 }}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell me about your opportunity..."
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                  onFocus={e => e.target.style.borderColor = '#6366f1'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {status === 'success' && (
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', color: '#10b981', fontSize: '0.88rem' }}>
                  ✅ Message sent! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', fontSize: '0.88rem' }}>
                  ❌ Something went wrong. Please try again.
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
