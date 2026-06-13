import { useState } from 'react';
import { projectKinds } from '../data/projects';
import '../styles/Contact.css';

const SOCIALS = [
  {
    name: 'GitHub',
    handle: '@kobedumandan →',
    href: 'https://github.com/kobedumandan',
    last: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.3 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: '@kobedumandan →',
    href: 'https://linkedin.com/in/kobedumandan',
    last: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.35V9h3.4v1.56h.05c.47-.9 1.63-1.86 3.36-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    handle: '@kobedumandan →',
    href: 'https://x.com/kobedumandan',
    last: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.16 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Dribbble',
    handle: '@kobedumandan →',
    href: 'https://dribbble.com/kobedumandan',
    last: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M3 12c4-1 11-1 18 2M5 5c4 3 9 9 11 16M19 5c-2 5-7 10-14 13" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [selectedKind, setSelectedKind] = useState('Web App');
  const [formStatus, setFormStatus] = useState('◢ Ready to strike');

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (!fd.get('name') || !fd.get('email') || !fd.get('brief')) {
      setFormStatus('⚠ Fill in the required fields');
      return;
    }
    setFormStatus('✓ Brief sent — strike incoming');
    e.target.reset();
    setSelectedKind('Web App');
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__head">
        <div className="contact__eyebrow">— 05 / Commission</div>
        <h2 className="contact__title">
          Have something to <span className="contact__title-accent">forge</span>?
        </h2>
        <p className="contact__intro">
          Drop a brief. I'll reply within two business days with rough scope,
          timeline, and quote.
        </p>
      </div>

      <div className="contact__grid">
        {/* FORM */}
        <form onSubmit={submitForm} className="contact__form">
          <div className="contact__row">
            <label className="contact__field">
              <span className="contact__label">Name *</span>
              <input
                className="forge-input"
                type="text"
                required
                name="name"
                placeholder="Your name"
              />
            </label>
            <label className="contact__field">
              <span className="contact__label">Email *</span>
              <input
                className="forge-input"
                type="email"
                required
                name="email"
                placeholder="you@studio.com"
              />
            </label>
          </div>

          <label className="contact__field contact__field--chips">
            <span className="contact__label">What are we forging?</span>
            <div className="contact__chips">
              {projectKinds.map((k) => {
                const active = k === selectedKind;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setSelectedKind(k)}
                    className={active ? 'forge-chip is-active' : 'forge-chip'}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          </label>

          <label className="contact__field">
            <span className="contact__label">Brief *</span>
            <textarea
              className="forge-textarea"
              required
              name="brief"
              rows={5}
              placeholder="Tell me about the project, timeline, and budget range."
            />
          </label>

          <div className="contact__form-footer">
            <div className="contact__status">{formStatus}</div>
            <button type="submit" className="contact__submit">
              Send to the forge
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            </button>
          </div>
        </form>

        {/* DIRECT CONTACT */}
        <div className="contact__side">
          <div className="contact__card">
            <div className="contact__card-label">Direct line</div>
            <a href="mailto:hello@kobedu.dev" className="contact__email">
              hello@kobedu.dev
            </a>
            <div className="contact__email-note">Avg. reply: under 24h</div>
          </div>

          <div className="contact__card">
            <div className="contact__card-label contact__card-label--wide">
              Find me on the wall
            </div>
            <div className="contact__socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact__social"
                >
                  <span className="contact__social-name">
                    {s.icon}
                    {s.name}
                  </span>
                  <span className="contact__social-handle">{s.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
