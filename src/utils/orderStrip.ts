import type { Order } from '../types';

export function shouldShowOrderStrip(order: Order | null): boolean {
  if (!order || order.status === 'Reddedildi') return false;
  if (order.status === 'Teslim Edildi' && order.deliveryDismissed) return false;
  return true;
}
