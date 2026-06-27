import { CONTACT_INFO } from '../data/menu';
import './Contact.css';

const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Z%C3%BCmr%C3%BCtevler,+Nil+Cd.+58%2FA,+34852+Maltepe%2F%C4%B0stanbul&z=16&output=embed';

export function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact__header">
          <span className="section-label">İletişim</span>
          <h2 className="section-title">Bize Ulaşın</h2>
          <p className="section-desc">
            Kardeşler Zurna Dürüm'e ulaşmak, sipariş vermek veya menümüz hakkında
            bilgi almak için bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__card">
              <span className="contact__icon">📍</span>
              <div>
                <strong>Adres</strong>
                <p>{CONTACT_INFO.address}</p>
              </div>
            </div>

            <div className="contact__card">
              <span className="contact__icon">📞</span>
              <div>
                <strong>Telefon</strong>
                {CONTACT_INFO.phones.map((phone) => (
                  <p key={phone}>
                    <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                  </p>
                ))}
              </div>
            </div>

            <div className="contact__card">
              <span className="contact__icon">📸</span>
              <div>
                <strong>Instagram</strong>
                <p>
                  <a href={CONTACT_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">
                    {CONTACT_INFO.instagram}
                  </a>
                </p>
              </div>
            </div>

            <div className="contact__card">
              <span className="contact__icon">🕐</span>
              <div>
                <strong>Çalışma Saatleri</strong>
                <p>{CONTACT_INFO.hours}</p>
              </div>
            </div>
          </div>

          <div className="contact__map">
            <iframe
              className="contact__map-iframe"
              src={MAP_EMBED_URL}
              title="Kardeşler Zurna Dürüm konumu"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={CONTACT_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__map-link"
            >
              Google Maps'te Aç →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
