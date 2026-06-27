import type { Product } from '../types';
import { formatPrice } from '../utils/storage';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-card__price">{formatPrice(product.price)}</div>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <button
          type="button"
          className="btn btn--primary product-card__btn"
          onClick={() => addToCart(product)}
        >
          Sepete Ekle
        </button>
      </div>
    </article>
  );
}
