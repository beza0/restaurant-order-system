import './About.css';

export function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about__grid">
          <div className="about__image">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=500&fit=crop"
              alt="Kardeşler Zurna Dürüm restoran"
            />
            <div className="about__accent" />
          </div>
          <div className="about__content">
            <span className="section-label">Hakkımızda</span>
            <h2 className="section-title">Lezzetin Adresi</h2>
            <p className="about__text">
              Kardeşler Zurna Dürüm olarak, taze malzemelerle hazırlanan bol
              lezzetli dürümlerimizi müşterilerimize hızlı ve kaliteli şekilde
              sunuyoruz. Zurna dürüm çeşitlerimiz, menülerimiz, içeceklerimiz
              ve sütlaç seçeneğimizle doyurucu bir deneyim yaşatıyoruz.
            </p>
            <div className="about__features">
              <div className="about__feature">
                <span className="about__feature-icon">🥙</span>
                <div>
                  <strong>Taze Malzemeler</strong>
                  <p>Her gün taze hazırlanan dürümler</p>
                </div>
              </div>
              <div className="about__feature">
                <span className="about__feature-icon">⚡</span>
                <div>
                  <strong>Hızlı Servis</strong>
                  <p>Sıcacık ve hızlı teslimat</p>
                </div>
              </div>
              <div className="about__feature">
                <span className="about__feature-icon">🍽️</span>
                <div>
                  <strong>Doyurucu Porsiyon</strong>
                  <p>70 cm dev zurna dürüm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
