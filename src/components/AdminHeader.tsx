import { Logo } from './Logo';
import './AdminHeader.css';

export function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="admin-header__inner container">
        <Logo variant="dark" />
        <div className="admin-header__badge">Admin</div>
      </div>
    </header>
  );
}
