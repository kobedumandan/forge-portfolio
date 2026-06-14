import { useState } from "react";
import { projectKinds } from "../data/projects";
import "../styles/Contact.css";

const SOCIALS = [
  {
    name: "GitHub",
    handle: "@kobedumandan →",
    href: "https://github.com/kobedumandan",
    last: false,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.3 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "@kobedumandan →",
    href: "https://facebook.com/kobedumandan",
    last: false,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    handle: "@kobedumandan →",
    href: "https://x.com/kobedumandan",
    last: false,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.16 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@kobedumandan →",
    href: "https://instagram.com/kobedumandan",
    last: true,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.38A5.86 5.86 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [selectedKind, setSelectedKind] = useState("Web App");
  const [formStatus, setFormStatus] = useState("◢ Ready to strike");

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (!fd.get("name") || !fd.get("email") || !fd.get("brief")) {
      setFormStatus("⚠ Fill in the required fields");
      return;
    }
    setFormStatus("✓ Brief sent — strike incoming");
    e.target.reset();
    setSelectedKind("Web App");
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__head">
        <div className="contact__eyebrow">— 05 / Commission</div>
        <h2 className="contact__title">
          Have something to <span className="contact__title-accent">forge</span>
          ?
        </h2>
        <p className="contact__intro">
          Drop a brief. I'll reply within two business days with a rough scope.
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
                    className={active ? "forge-chip is-active" : "forge-chip"}
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* DIRECT CONTACT */}
        <div className="contact__side">
          <div className="contact__card">
            <div className="contact__card-label">Direct line</div>
            <a href="mailto:kgdumandan@gmail.com" className="contact__email">
              kgdumandan@gmail.com
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
