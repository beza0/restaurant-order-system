import type { Order } from '../types';
import { isOrderFromToday } from './date';

const ORDERS_KEY = 'kzd_orders';
const ACTIVE_ORDER_KEY = 'kzd_active_order_id';

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getActiveOrderId(): string | null {
  return localStorage.getItem(ACTIVE_ORDER_KEY);
}

export function setActiveOrderId(id: string | null): void {
  if (id) {
    localStorage.setItem(ACTIVE_ORDER_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_ORDER_KEY);
  }
}

export function addOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  setActiveOrderId(order.id);
}

export function updateOrder(orderId: string, updates: Partial<Order>): Order | null {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  orders[index] = { ...orders[index], ...updates };
  saveOrders(orders);
  return orders[index];
}

export function getOrderById(orderId: string): Order | null {
  return getOrders().find((o) => o.id === orderId) ?? null;
}

/** Gece 00:00 sonrası önceki günün siparişlerini temizler. */
export function purgeOldOrders(): void {
  const orders = getOrders();
  const todayOrders = orders.filter((o) => isOrderFromToday(o.createdAt));

  if (todayOrders.length === orders.length) return;

  saveOrders(todayOrders);

  const activeId = getActiveOrderId();
  if (activeId && !todayOrders.some((o) => o.id === activeId)) {
    setActiveOrderId(null);
  }
}

export function formatPrice(price: number): string {
  return price.toLocaleString('tr-TR') + ' TL';
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
