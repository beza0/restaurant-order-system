import { useState, type FormEvent } from 'react';
import type { OrderFormData } from '../types';
import './OrderForm.css';

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  onCancel: () => void;
}

export function OrderForm({ onSubmit, onCancel }: OrderFormProps) {
  const [form, setForm] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<Partial<OrderFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<OrderFormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = 'İsim zorunludur';
    if (!form.lastName.trim()) newErrors.lastName = 'Soyisim zorunludur';
    if (!form.phone.trim()) newErrors.phone = 'Telefon zorunludur';
    if (!form.address.trim()) newErrors.address = 'Adres zorunludur';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const update = (field: keyof OrderFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>Sipariş Bilgileri</h3>

      <div className="order-form__field">
        <label htmlFor="firstName">İsim *</label>
        <input
          id="firstName"
          type="text"
          value={form.firstName}
          onChange={(e) => update('firstName', e.target.value)}
          placeholder="Adınız"
        />
        {errors.firstName && <span className="order-form__error">{errors.firstName}</span>}
      </div>

      <div className="order-form__field">
        <label htmlFor="lastName">Soyisim *</label>
        <input
          id="lastName"
          type="text"
          value={form.lastName}
          onChange={(e) => update('lastName', e.target.value)}
          placeholder="Soyadınız"
        />
        {errors.lastName && <span className="order-form__error">{errors.lastName}</span>}
      </div>

      <div className="order-form__field">
        <label htmlFor="phone">Telefon *</label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="05XX XXX XX XX"
        />
        {errors.phone && <span className="order-form__error">{errors.phone}</span>}
      </div>

      <div className="order-form__field">
        <label htmlFor="address">Adres *</label>
        <textarea
          id="address"
          value={form.address}
          onChange={(e) => update('address', e.target.value)}
          placeholder="Teslimat adresiniz"
          rows={3}
        />
        {errors.address && <span className="order-form__error">{errors.address}</span>}
      </div>

      <div className="order-form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Geri
        </button>
        <button type="submit" className="btn btn--primary">
          Siparişi Gönder
        </button>
      </div>
    </form>
  );
}
