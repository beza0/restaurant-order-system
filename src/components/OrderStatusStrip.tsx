import { useOrders } from '../context/OrderContext';
import type { OrderStatus } from '../types';
import { shouldShowOrderStrip } from '../utils/orderStrip';
import './OrderStatusStrip.css';

const STRIP_STEPS = [
  'Onay Bekleniyor',
  'Hazırlanıyor',
  'Yola Çıktı',
  'Teslim Edildi',
] as const;

const STATUS_STEP_INDEX: Record<OrderStatus, number> = {
  'Onay Bekliyor': 0,
  'Kabul Edildi': 0,
  'Hazırlanıyor': 1,
  'Yola Çıktı': 2,
  'Teslim Edildi': 3,
  Reddedildi: -1,
};

export function OrderStatusStrip() {
  const { activeOrder, dismissDeliveredStrip } = useOrders();

  if (!shouldShowOrderStrip(activeOrder)) return null;

  const currentIndex = STATUS_STEP_INDEX[activeOrder!.status];
  const isAccepted = activeOrder!.status === 'Kabul Edildi';
  const isDelivered = activeOrder!.status === 'Teslim Edildi';

  return (
    <div className="order-strip" role="status" aria-live="polite">
      <div className="order-strip__inner container">
        <div className="order-strip__info">
          <span className="order-strip__label">Sipariş Durumu</span>
          <strong className="order-strip__status">{activeOrder!.status}</strong>
        </div>

        <div className="order-strip__steps">
          {STRIP_STEPS.map((step, index) => {
            const isComplete =
              index < currentIndex || (index === 0 && isAccepted);
            const isCurrent =
              index === currentIndex && !isAccepted
                ? true
                : index === 1 && isAccepted;

            return (
              <div
                key={step}
                className={`order-strip__step ${isComplete ? 'order-strip__step--complete' : ''} ${isCurrent ? 'order-strip__step--current' : ''}`}
              >
                <div className="order-strip__dot">
                  {isComplete ? '✓' : index + 1}
                </div>
                <span>{step}</span>
              </div>
            );
          })}
        </div>

        {isDelivered && (
          <button
            type="button"
            className="order-strip__close"
            onClick={dismissDeliveredStrip}
            aria-label="Sipariş durumunu kapat"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
