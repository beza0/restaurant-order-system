const TIMEZONE = 'Europe/Istanbul';

export function getIstanbulDateKey(date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function isOrderFromToday(createdAt: string): boolean {
  return getIstanbulDateKey(new Date(createdAt)) === getIstanbulDateKey();
}

export function getMsUntilNextMidnightIstanbul(): number {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  const second = Number(parts.find((p) => p.type === 'second')?.value ?? 0);

  const elapsedMs = ((hour * 60 + minute) * 60 + second) * 1000;
  return 24 * 60 * 60 * 1000 - elapsedMs;
}
