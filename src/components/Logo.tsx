import './Logo.css';

interface LogoProps {
  variant?: 'light' | 'dark';
}

export function Logo({ variant = 'light' }: LogoProps) {
  return (
    <div className={`logo logo--${variant}`}>
      <span className="logo__icon">K</span>
      <span className="logo__text">Kardeşler Zurna Dürüm</span>
    </div>
  );
}
