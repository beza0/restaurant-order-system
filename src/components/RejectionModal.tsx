import { useOrders } from '../context/OrderContext';
import './RejectionModal.css';

export function RejectionModal() {
  const { showRejectionModal, dismissRejectionModal } = useOrders();

  if (!showRejectionModal) return null;

  return (
    <>
      <div className="modal-overlay" aria-hidden="true" />
      <div className="rejection-modal" role="alertdialog" aria-labelledby="rejection-title">
        <div className="rejection-modal__icon">✕</div>
        <h2 id="rejection-title">Sipariş Reddedildi</h2>
        <p>Üzgünüz, siparişiniz restoran tarafından reddedildi.</p>
        <button type="button" className="btn btn--primary" onClick={dismissRejectionModal}>
          Tamam
        </button>
      </div>
    </>
  );
}
