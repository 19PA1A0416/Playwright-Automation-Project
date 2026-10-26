export function formatCents(cents: number): string {
  const sign = cents < 0 ? '-' : '';
  const absolute = Math.abs(cents);
  const dollars = Math.floor(absolute / 100);
  const remainder = (absolute % 100).toString().padStart(2, '0');
  return `${sign}$${dollars}.${remainder}`;
}

export function sumCents(amounts: readonly number[]): number {
  return amounts.reduce((total, amount) => total + amount, 0);
}

/** Sauce Demo charges 8% tax and rounds to the nearest cent. */
export function sauceDemoTaxCents(subtotalCents: number): number {
  return Math.round(subtotalCents * 0.08);
}
