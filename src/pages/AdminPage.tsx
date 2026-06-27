import { useOrders } from '../context/OrderContext';
import type { Order, OrderStatus } from '../types';
import { formatDate, formatPrice } from '../utils/storage';
import './AdminPage.css';

const STATUS_CLASS: Record<OrderStatus, string> = {
  'Onay Bekliyor': 'pending',
  'Kabul Edildi': 'accepted',
  'Hazırlanıyor': 'preparing',
  'Yola Çıktı': 'delivering',
  Reddedildi: 'rejected',
};

function OrderCard({ order }: { order: Order }) {
  const { acceptOrder, rejectOrder, updateOrderStatus } = useOrders();

  return (
    <article className={`admin-order admin-order--${STATUS_CLASS[order.status]}`}>
      <div className="admin-order__header">
        <div>
          <h3>
            {order.firstName} {order.lastName}
          </h3>
          <span className="admin-order__date">{formatDate(order.createdAt)}</span>
        </div>
        <span className={`admin-order__status admin-order__status--${STATUS_CLASS[order.status]}`}>
          {order.status}
        </span>
      </div>

      <div className="admin-order__details">
        <div className="admin-order__row">
          <span>Telefon</span>
          <a href={`tel:${order.phone.replace(/\s/g, '')}`}>{order.phone}</a>
        </div>
        <div className="admin-order__row">
          <span>Adres</span>
          <p>{order.address}</p>
        </div>
      </div>

      <div className="admin-order__items">
        <strong>Ürünler</strong>
        <ul>
          {order.items.map((item) => (
            <li key={`${order.id}-${item.productId}`}>
              <span>{item.name} × {item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-order__total">
        <span>Toplam</span>
        <strong>{formatPrice(order.total)}</strong>
      </div>

      <div className="admin-order__actions">
        {order.status === 'Onay Bekliyor' && (
          <>
            <button
              type="button"
              className="btn btn--success"
              onClick={() => acceptOrder(order.id)}
            >
              Siparişi Kabul Et
            </button>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => rejectOrder(order.id)}
            >
              Siparişi Reddet
            </button>
          </>
        )}

        {order.status === 'Kabul Edildi' && (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => updateOrderStatus(order.id, 'Hazırlanıyor')}
          >
            Hazırlanıyor
          </button>
        )}

        {order.status === 'Hazırlanıyor' && (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => updateOrderStatus(order.id, 'Yola Çıktı')}
          >
            Yola Çıktı
          </button>
        )}
      </div>
    </article>
  );
}

export function AdminPage() {
  const { orders } = useOrders();

  const pendingCount = orders.filter((o) => o.status === 'Onay Bekliyor').length;

  return (
    <main className="admin">
      <div className="container">
        <div className="admin__header">
          <div>
            <h1>Admin Paneli</h1>
            <p>Gelen siparişleri yönetin</p>
          </div>
          <div className="admin__stats">
            <div className="admin__stat">
              <span className="admin__stat-value">{orders.length}</span>
              <span className="admin__stat-label">Toplam Sipariş</span>
            </div>
            <div className="admin__stat admin__stat--highlight">
              <span className="admin__stat-value">{pendingCount}</span>
              <span className="admin__stat-label">Onay Bekleyen</span>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="admin__empty">
            <span>📋</span>
            <h2>Henüz sipariş yok</h2>
            <p>Müşteri tarafından verilen siparişler burada görünecek.</p>
          </div>
        ) : (
          <div className="admin__grid">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
