import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { RejectionModal } from './components/RejectionModal';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <CartDrawer />
          <RejectionModal />
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
