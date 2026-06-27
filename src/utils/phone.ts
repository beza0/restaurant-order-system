/**
 * Türkiye telefon numarası doğrulama.
 * Kabul edilen formatlar: 05XX XXX XX XX, 0216 XXX XX XX, +90 5XX XXX XX XX
 */
export function normalizeTurkishPhoneDigits(phone: string): string | null {
  let digits = phone.replace(/[\s()-]/g, '');

  if (digits.startsWith('+90')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('90') && digits.length >= 12) {
    digits = digits.slice(2);
  }

  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  if (!/^\d{10}$/.test(digits)) {
    return null;
  }

  return digits;
}

export function isValidTurkishPhone(phone: string): boolean {
  const digits = normalizeTurkishPhoneDigits(phone);
  if (!digits) return false;

  // Cep: 5XX | Sabit hat: 2XX, 3XX, 4XX
  return /^[2-5]\d{9}$/.test(digits);
}

export function formatTurkishPhone(phone: string): string {
  const digits = normalizeTurkishPhoneDigits(phone);
  if (!digits) return phone.trim();

  const withZero = `0${digits}`;
  return `${withZero.slice(0, 4)} ${withZero.slice(4, 7)} ${withZero.slice(7, 9)} ${withZero.slice(9, 11)}`;
}
