import { useState } from 'react';
import { MENU_ITEMS, CATEGORY_LABELS } from '../data/menu';
import type { MenuCategory } from '../types';
import { ProductCard } from './ProductCard';
import './Menu.css';

const CATEGORIES: MenuCategory[] = ['durumler', 'menuler', 'tatlilar', 'icecekler'];

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('durumler');

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="menu section">
      <div className="container">
        <div className="menu__header">
          <span className="section-label">Menümüz</span>
          <h2 className="section-title">Lezzetli Seçenekler</h2>
          <p className="section-desc">
            Dürümlerden menülere, tatlılardan içeceklere kadar geniş menümüzü keşfedin.
          </p>
        </div>

        <div className="menu__tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`menu__tab ${activeCategory === cat ? 'menu__tab--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="menu__grid">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
