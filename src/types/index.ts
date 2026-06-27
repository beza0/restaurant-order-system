export type MenuCategory = 'durumler' | 'menuler' | 'tatlilar' | 'icecekler';

export type OrderStatus =
  | 'Onay Bekliyor'
  | 'Kabul Edildi'
  | 'Hazırlanıyor'
  | 'Yola Çıktı'
  | 'Teslim Edildi'
  | 'Reddedildi';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  rejectionSeen?: boolean;
  deliveryDismissed?: boolean;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}
