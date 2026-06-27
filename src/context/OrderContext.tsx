import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Order, OrderFormData, OrderStatus } from '../types';
import {
  addOrder as persistOrder,
  getActiveOrderId,
  getOrderById,
  getOrders,
  updateOrder as persistUpdateOrder,
} from '../utils/storage';
import { useCart } from './CartContext';

interface OrderContextValue {
  orders: Order[];
  activeOrder: Order | null;
  showRejectionModal: boolean;
  dismissRejectionModal: () => void;
  createOrder: (form: OrderFormData) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  acceptOrder: (orderId: string) => void;
  rejectOrder: (orderId: string) => void;
  refreshOrders: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const { items, total, clearCart } = useCart();
  const [orders, setOrders] = useState<Order[]>(() => getOrders());
  const [activeOrderId, setActiveOrderIdState] = useState<string | null>(() =>
    getActiveOrderId()
  );
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const refreshOrders = useCallback(() => {
    setOrders(getOrders());
    setActiveOrderIdState(getActiveOrderId());
  }, []);

  useEffect(() => {
    const interval = setInterval(refreshOrders, 1500);
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'kzd_orders' || e.key === 'kzd_active_order_id') {
        refreshOrders();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, [refreshOrders]);

  const activeOrder = useMemo(
    () => (activeOrderId ? getOrderById(activeOrderId) : null),
    [activeOrderId, orders]
  );

  useEffect(() => {
    if (
      activeOrder?.status === 'Reddedildi' &&
      !activeOrder.rejectionSeen
    ) {
      setShowRejectionModal(true);
    }
  }, [activeOrder]);

  const dismissRejectionModal = useCallback(() => {
    if (activeOrderId) {
      persistUpdateOrder(activeOrderId, { rejectionSeen: true });
      refreshOrders();
    }
    setShowRejectionModal(false);
  }, [activeOrderId, refreshOrders]);

  const createOrder = useCallback(
    (form: OrderFormData): Order | null => {
      if (items.length === 0) return null;

      const order: Order = {
        id: crypto.randomUUID(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        total,
        status: 'Onay Bekliyor',
        createdAt: new Date().toISOString(),
        rejectionSeen: false,
      };

      persistOrder(order);
      clearCart();
      refreshOrders();
      return order;
    },
    [items, total, clearCart, refreshOrders]
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      persistUpdateOrder(orderId, { status });
      refreshOrders();
    },
    [refreshOrders]
  );

  const acceptOrder = useCallback(
    (orderId: string) => updateOrderStatus(orderId, 'Kabul Edildi'),
    [updateOrderStatus]
  );

  const rejectOrder = useCallback(
    (orderId: string) => updateOrderStatus(orderId, 'Reddedildi'),
    [updateOrderStatus]
  );

  const value = useMemo(
    () => ({
      orders,
      activeOrder,
      showRejectionModal,
      dismissRejectionModal,
      createOrder,
      updateOrderStatus,
      acceptOrder,
      rejectOrder,
      refreshOrders,
    }),
    [
      orders,
      activeOrder,
      showRejectionModal,
      dismissRejectionModal,
      createOrder,
      updateOrderStatus,
      acceptOrder,
      rejectOrder,
      refreshOrders,
    ]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
}
