import { useOrders } from '../context/OrderContext';
import type { OrderStatus } from '../types';
import './OrderStatusBanner.css';

const STATUS_STEPS: OrderStatus[] = [
  'Onay Bekliyor',
  'Kabul Edildi',
  'Hazırlanıyor',
  'Yola Çıktı',
];

const STATUS_INDEX: Record<OrderStatus, number> = {
  'Onay Bekliyor': 0,
  'Kabul Edildi': 1,
  'Hazırlanıyor': 2,
  'Yola Çıktı': 3,
  Reddedildi: -1,
};

export function OrderStatusBanner() {
  const { activeOrder } = useOrders();

  if (!activeOrder || activeOrder.status === 'Reddedildi') return null;

  const currentStep = STATUS_INDEX[activeOrder.status];

  return (
    <section className="order-status section--compact">
      <div className="container">
        <div className="order-status__card">
          <div className="order-status__header">
            <h3>Sipariş Durumu</h3>
            <span className={`order-status__badge order-status__badge--${currentStep}`}>
              {activeOrder.status}
            </span>
          </div>

          <div className="order-status__steps">
            {STATUS_STEPS.map((step, index) => {
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;
              return (
                <div
                  key={step}
                  className={`order-status__step ${isActive ? 'order-status__step--active' : ''} ${isCurrent ? 'order-status__step--current' : ''}`}
                >
                  <div className="order-status__dot">
                    {isActive && index < currentStep ? '✓' : index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
