import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { formatPrice } from '../utils/storage';
import { OrderForm } from './OrderForm';
import './CartDrawer.css';

export function CartDrawer() {
  const {
    items,
    total,
    isOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const { createOrder } = useOrders();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleClose = () => {
    closeCart();
    setShowOrderForm(false);
    setOrderSuccess(false);
  };

  const handleOrderSubmit = (form: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  }) => {
    const order = createOrder(form);
    if (order) {
      setOrderSuccess(true);
      setShowOrderForm(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={handleClose} aria-hidden="true" />
      <aside className="cart-drawer" role="dialog" aria-label="Sepet">
        <div className="cart-drawer__header">
          <h2>Sepetim</h2>
          <button type="button" className="cart-drawer__close" onClick={handleClose} aria-label="Kapat">
            ×
          </button>
        </div>

        {orderSuccess ? (
          <div className="cart-drawer__success">
            <div className="cart-drawer__success-icon">✓</div>
            <h3>Siparişiniz alındı!</h3>
            <p>Restoran onayı bekleniyor.</p>
            <button type="button" className="btn btn--primary" onClick={handleClose}>
              Tamam
            </button>
          </div>
        ) : showOrderForm ? (
          <OrderForm
            onSubmit={handleOrderSubmit}
            onCancel={() => setShowOrderForm(false)}
          />
        ) : items.length === 0 ? (
          <div className="cart-drawer__empty">
            <span className="cart-drawer__empty-icon">🛒</span>
            <p>Sepetiniz boş</p>
            <button type="button" className="btn btn--primary" onClick={handleClose}>
              Menüye Dön
            </button>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {items.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item__info">
                    <h4>{item.product.name}</h4>
                    <span className="cart-item__unit">{formatPrice(item.product.price)}</span>
                  </div>
                  <div className="cart-item__controls">
                    <div className="cart-item__qty">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.product.id)}
                        aria-label="Azalt"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.product.id)}
                        aria-label="Artır"
                      >
                        +
                      </button>
                    </div>
                    <span className="cart-item__total">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Kaldır"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Genel Toplam</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button
                type="button"
                className="btn btn--primary btn--lg cart-drawer__checkout"
                onClick={() => setShowOrderForm(true)}
              >
                Siparişi Tamamla
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
