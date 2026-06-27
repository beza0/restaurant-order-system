import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Menu } from '../components/Menu';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Contact />
      <Footer />
    </>
  );
}
