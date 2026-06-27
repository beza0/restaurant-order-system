import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { CustomerLayout } from './layouts/CustomerLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <Routes>
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
