import logo from '../assets/logo.svg';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <div className="footer__brand">
          <img src={logo} alt="" width="28" height="28" className="footer__logo" />
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
