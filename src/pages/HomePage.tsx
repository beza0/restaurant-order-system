import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Menu } from '../components/Menu';
import { OrderStatusBanner } from '../components/OrderStatusBanner';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <OrderStatusBanner />
      <Contact />
      <Footer />
    </>
  );
}
