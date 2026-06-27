import { IMAGES } from '../data/menu';
import './Hero.css';

export function Hero() {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />
      <div className="container hero__content">
        <div className="hero__text">
          <span className="hero__badge">Taze · Sıcak · Doyurucu</span>
          <h1 className="hero__title">Kardeşler Zurna Dürüm</h1>
          <p className="hero__slogan">
            Lezzetin en büyük hali: sıcacık zurna dürümler!
          </p>
          <p className="hero__desc">
            Kardeşler Zurna Dürüm, doyurucu porsiyonları, sıcacık dürümleri ve
            hızlı servisiyle lezzetli bir yemek deneyimi sunar.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn--primary btn--lg" onClick={scrollToMenu}>
              Menüyü İncele
            </button>
            <button type="button" className="btn btn--outline btn--lg" onClick={scrollToContact}>
              Sipariş Ver
            </button>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__image-card hero__image-card--main">
            <img
              src={IMAGES.zurnaDurum}
              alt="Zurna dürüm"
            />
          </div>
          <div className="hero__image-card hero__image-card--secondary">
            <img
              src={IMAGES.menuAyran}
              alt="Zurna dürüm menü"
            />
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">70 cm</span>
            <span className="hero__stat-label">Dev Porsiyon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
