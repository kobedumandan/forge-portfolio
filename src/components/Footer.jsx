import logo from '../assets/logo.svg';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <div className="footer__brand">
          The Forge
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
