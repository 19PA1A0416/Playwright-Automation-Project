export type Product = {
  name: string;
  /** Price stored in cents so totals never depend on floating-point math. */
  priceCents: number;
  /** Matches the data-test suffix Sauce Demo uses on add/remove buttons. */
  slug: string;
};

export const products = {
  backpack: {
    name: 'Sauce Labs Backpack',
    priceCents: 2999,
    slug: 'sauce-labs-backpack',
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    priceCents: 999,
    slug: 'sauce-labs-bike-light',
  },
} as const satisfies Record<string, Product>;
