import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export function Header() {
  const { itemCount, toggleCart } = useCart();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (isAdmin) {
    return (
      <header className="header header--admin">
        <div className="header__inner container">
          <Link to="/" className="header__logo">
            <span className="header__logo-icon">K</span>
            <span>Kardeşler Zurna Dürüm</span>
          </Link>
          <Link to="/" className="header__admin-link">
            ← Müşteri Sitesi
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="header__logo-icon">K</span>
          <span>Kardeşler Zurna Dürüm</span>
        </Link>

        <nav className="header__nav">
          <button type="button" onClick={() => scrollTo('about')}>Hakkımızda</button>
          <button type="button" onClick={() => scrollTo('menu')}>Menü</button>
          <button type="button" onClick={() => scrollTo('contact')}>İletişim</button>
          <Link to="/admin" className="header__admin-link">Admin</Link>
        </nav>

        <button
          type="button"
          className="header__cart"
          onClick={toggleCart}
          aria-label="Sepeti aç"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {itemCount > 0 && <span className="header__cart-badge">{itemCount}</span>}
        </button>
      </div>
    </header>
  );
}
