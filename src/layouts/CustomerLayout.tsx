import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { CustomerRejectionModal } from '../components/CustomerRejectionModal';
import { OrderStatusStrip } from '../components/OrderStatusStrip';
import { useOrders } from '../context/OrderContext';
import { shouldShowOrderStrip } from '../utils/orderStrip';
import './CustomerLayout.css';

function CustomerLayoutContent() {
  const { activeOrder } = useOrders();
  const hasActiveStrip = shouldShowOrderStrip(activeOrder);

  return (
    <div className={`customer-layout ${hasActiveStrip ? 'customer-layout--with-strip' : ''}`}>
      <Header />
      <Outlet />
      <CartDrawer />
      <CustomerRejectionModal />
      <OrderStatusStrip />
    </div>
  );
}

export function CustomerLayout() {
  return <CustomerLayoutContent />;
}
