import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <div className="footer__brand">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 22 L26 22 L24 25 L8 25 Z" fill="#e23b2e" />
            <rect x="10" y="14" width="12" height="6" rx="1" fill="#9a8d80" />
            <rect x="14" y="6" width="4" height="10" rx="1" fill="#6b5f54" />
          </svg>
          <span className="footer__brand-name">
            kobedu's <span className="footer__accent">Forge</span>
          </span>
        </div>
        <div className="footer__meta">© MMXXVI · Forged in the Philippines · Built by hand</div>
        <div className="footer__meta footer__status">
          <span className="footer__status-dot" />
          Forge online
        </div>
      </div>
    </footer>
  );
}
