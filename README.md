# Kardeşler Zurna Dürüm

Modern, mobil uyumlu restoran web sitesi — müşteri arayüzü ve admin paneli.

## Özellikler

- **Ana Sayfa:** Hero, tanıtım, menü ve iletişim bölümleri
- **Menü:** Kategorili ürün kartları (Dürümler, Menüler, İçecekler)
- **Sepet:** Ürün ekleme, adet yönetimi, sipariş oluşturma
- **Sipariş Takibi:** Canlı durum güncellemeleri
- **Admin Paneli:** Sipariş kabul/red ve durum yönetimi

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın.

Admin paneli: `http://localhost:5173/admin`

## Teknolojiler

- React 19 + TypeScript
- Vite
- React Router
- localStorage (sipariş verisi)

## Sipariş Akışı

1. Müşteri menüden ürünleri sepete ekler
2. Sipariş formunu doldurur → durum: **Onay Bekliyor**
3. Admin panelinden sipariş kabul/red edilir
4. Kabul edilen siparişler: **Hazırlanıyor** → **Yola Çıktı**
5. Reddedilen siparişler müşteriye modal ile bildirilir
