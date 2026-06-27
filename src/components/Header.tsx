import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Logo } from './Logo';
import './Header.css';

export function Header() {
  const { itemCount, toggleCart } = useCart();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo />
        </Link>

        <nav className="header__nav">
          <button type="button" onClick={() => scrollTo('about')}>Hakkımızda</button>
          <button type="button" onClick={() => scrollTo('menu')}>Menü</button>
          <button type="button" onClick={() => scrollTo('contact')}>İletişim</button>
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
