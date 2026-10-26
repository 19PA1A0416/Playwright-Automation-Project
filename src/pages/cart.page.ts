import { expect, type Locator, type Page } from '@playwright/test';
import type { Product } from '../data/products.data';
import { formatCents } from '../utils/money';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByTestId('checkout');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html/);
    await expect(this.page.getByTestId('title')).toHaveText('Your Cart');
  }

  itemRow(product: Product): Locator {
    return this.page.locator('.cart_item').filter({
      has: this.page.getByText(product.name, { exact: true }),
    });
  }

  async expectProduct(product: Product): Promise<void> {
    const row = this.itemRow(product);
    await expect(row).toBeVisible();
    await expect(row.locator('.cart_quantity')).toHaveText('1');
    await expect(row.getByTestId('inventory-item-name')).toHaveText(product.name);
    await expect(row.getByTestId('inventory-item-price')).toHaveText(formatCents(product.priceCents));
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.page.locator('.cart_item')).toHaveCount(count);
  }

  async remove(product: Product): Promise<void> {
    await this.itemRow(product).getByTestId(`remove-${product.slug}`).click();
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
