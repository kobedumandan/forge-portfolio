import { useEffect, useRef, useState } from 'react';
import '../styles/Services.css';

const SERVICES = [
  {
    no: '— 01',
    title: 'Web Applications',
    desc: 'Dashboards, marketplaces, SaaS frontends. React, Next, and the rest — built fast, shipped clean.',
    tags: ['REACT', 'NEXT.JS', 'TYPESCRIPT'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="14" width="28" height="3" fill="#e23b2e" />
        <rect x="8" y="20" width="24" height="2" fill="#9a8d80" />
        <rect x="10" y="25" width="20" height="2" fill="#6b5f54" />
        <path d="M6 14 L8 11 L32 11 L34 14 Z" fill="#ff7a2e" />
      </svg>
    ),
  },
  {
    no: '— 02',
    title: 'Mobile Apps',
    desc: 'Cross-platform iOS & Android with Flutter and React Native. One codebase, no compromise on feel.',
    tags: ['FLUTTER', 'REACT NATIVE', 'DART'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="12" y="6" width="16" height="28" rx="2" fill="none" stroke="#e23b2e" strokeWidth="2" />
        <rect x="16" y="10" width="8" height="14" fill="#ff7a2e" />
        <circle cx="20" cy="29" r="1.5" fill="#e23b2e" />
      </svg>
    ),
  },
  {
    no: '— 03',
    title: 'Backend & APIs',
    desc: 'REST, GraphQL, auth, payments. FastAPI, Django, Laravel — pick the right hammer for the strike.',
    tags: ['FASTAPI', 'DJANGO', 'LARAVEL'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="10" width="28" height="20" rx="1" fill="none" stroke="#e23b2e" strokeWidth="2" />
        <line x1="6" y1="16" x2="34" y2="16" stroke="#9a8d80" strokeWidth="1.5" />
        <circle cx="10" cy="13" r="1" fill="#ff7a2e" />
        <circle cx="13" cy="13" r="1" fill="#ff7a2e" />
        <rect x="10" y="20" width="6" height="2" fill="#9a8d80" />
        <rect x="10" y="24" width="10" height="2" fill="#6b5f54" />
      </svg>
    ),
  },
  {
    no: '— 04',
    title: 'Full-stack Pipelines',
    desc: 'From schema to ship. Database, API, frontend, deploy — one smith, one accountable forge.',
    tags: ['POSTGRES', 'DOCKER', 'CI/CD'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 6 L28 10 L28 22 L20 28 L12 22 L12 10 Z" fill="none" stroke="#e23b2e" strokeWidth="2" />
        <path d="M20 12 L24 14 L24 20 L20 22 L16 20 L16 14 Z" fill="#ff7a2e" />
        <path d="M14 32 L26 32" stroke="#9a8d80" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // reveal once, then stop watching
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`service-card${visible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="service-card__no">{service.no}</div>
      {service.icon}
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.desc}</p>
      <div className="service-card__tags">
        {service.tags.map((tag) => (
          <span key={tag} className="service-card__tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="services__grid">
        {/* left sticky header */}
        <div className="services__head">
          <div className="services__eyebrow">— 01 / Craft</div>
          <h2 className="services__title">What I forge.</h2>
          <p className="services__intro">
            End-to-end product work. Pick a service, or commission the whole
            pipeline — from cold steel to mirror polish.
          </p>
        </div>

        {/* right service cards */}
        <div className="services__cards">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
