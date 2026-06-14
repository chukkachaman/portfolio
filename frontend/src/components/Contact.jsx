import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact({ personal }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/contact`, {
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
    background: 'rgba(19,19,43,0.7)', backdropFilter: 'blur(8px)',
    border: '1px solid rgba(30,30,64,0.8)',
    borderRadius: '8px', color: '#e2e8f0', fontSize: '0.95rem',
    outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const contactLinks = [
    { icon: '📧', label: 'Email', value: personal?.email ?? 'chamantej.chukka@gmail.com', href: `mailto:${personal?.email}` },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/chamantej', href: personal?.linkedin ?? '#' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/chamantej', href: personal?.github ?? '#' },
    { icon: '📍', label: 'Location', value: personal?.location ?? 'India', href: null },
  ];

  return (
    <section id="contact" style={{ background: 'var(--bg2)' }} ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">// reach out</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line" />
          <p style={{ color: '#94a3b8', marginTop: '1rem', maxWidth: 500, margin: '1rem auto 0' }}>
            Have an opportunity or just want to say hi? My inbox is always open!
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem' }}>
              Let's connect
            </h3>
            {contactLinks.map(({ icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 6, boxShadow: '0 12px 40px rgba(99,102,241,0.2)' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: 'rgba(19,19,43,0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(99,102,241,0.15)',
                  borderRadius: '12px',
                  transition: 'border-color 0.3s',
                  cursor: href ? 'pointer' : 'default',
                }}
                onHoverStart={e => {}}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                }}>{icon}</div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  {href ? (
                    <a href={href} style={{ color: '#e2e8f0', fontSize: '0.88rem', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#6366f1'}
                      onMouseLeave={e => e.target.style.color = '#e2e8f0'}
                    >{value}</a>
                  ) : (
                    <div style={{ color: '#e2e8f0', fontSize: '0.88rem' }}>{value}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              background: 'rgba(19,19,43,0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: '16px',
              padding: '1.75rem',
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e2e8f0' }}>Send a Message</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#6366f1', marginBottom: '0.4rem', fontWeight: 600 }}>Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(30,30,64,0.8)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#6366f1', marginBottom: '0.4rem', fontWeight: 600 }}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(30,30,64,0.8)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#6366f1', marginBottom: '0.4rem', fontWeight: 600 }}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell me about your opportunity..."
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                  onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(30,30,64,0.8)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ padding: '0.75rem 1rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', color: '#10b981', fontSize: '0.88rem' }}
                >
                  ✅ Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', fontSize: '0.88rem' }}
                >
                  ❌ Something went wrong. Please try again.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ justifyContent: 'center' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
