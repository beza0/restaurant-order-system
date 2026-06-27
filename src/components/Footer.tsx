import { CONTACT_INFO } from '../data/menu';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">K</span>
          <div>
            <strong>Kardeşler Zurna Dürüm</strong>
            <p>Lezzetin en büyük hali</p>
          </div>
        </div>
        <div className="footer__links">
          <a href={CONTACT_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={`tel:${CONTACT_INFO.phones[0].replace(/\s/g, '')}`}>Sipariş Hattı</a>
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} Kardeşler Zurna Dürüm. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
