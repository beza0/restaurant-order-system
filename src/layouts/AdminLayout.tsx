import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import './AdminLayout.css';

export function AdminLayout() {
  return (
    <div className="admin-app">
      <AdminHeader />
      <Outlet />
    </div>
  );
}
