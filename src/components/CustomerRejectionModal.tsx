import { useEffect, useState } from 'react';
import { useOrders } from '../context/OrderContext';
import './CustomerRejectionModal.css';

export function CustomerRejectionModal() {
  const { activeOrder, markRejectionSeen } = useOrders();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (activeOrder?.status === 'Reddedildi' && !activeOrder.rejectionSeen) {
      setOpen(true);
    }
  }, [activeOrder]);

  const handleDismiss = () => {
    markRejectionSeen();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      <div className="modal-overlay" aria-hidden="true" />
      <div className="rejection-modal" role="alertdialog" aria-labelledby="rejection-title">
        <div className="rejection-modal__icon">✕</div>
        <h2 id="rejection-title">Sipariş Reddedildi</h2>
        <p>Üzgünüz, siparişiniz restoran tarafından reddedildi.</p>
        <button type="button" className="btn btn--primary" onClick={handleDismiss}>
          Tamam
        </button>
      </div>
    </>
  );
}
