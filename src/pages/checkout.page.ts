import { expect, type Locator, type Page } from '@playwright/test';
import type { Customer } from '../data/checkout.data';
import type { Product } from '../data/products.data';
import { formatCents, sauceDemoTaxCents, sumCents } from '../utils/money';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.errorMessage = page.getByTestId('error');
  }

  async expectInformationStep(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html/);
    await expect(this.page.getByTestId('title')).toHaveText('Checkout: Your Information');
  }

  async fillShippingInfo(info: Customer): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
    await this.continueButton.click();
  }

  async continueWithoutInfo(): Promise<void> {
    await this.continueButton.click();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectOverview(selectedProducts: readonly Product[]): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html/);
    await expect(this.page.getByTestId('title')).toHaveText('Checkout: Overview');

    for (const product of selectedProducts) {
      const row = this.page.locator('.cart_item').filter({
        has: this.page.getByText(product.name, { exact: true }),
      });
      await expect(row.getByTestId('inventory-item-name')).toHaveText(product.name);
      await expect(row.getByTestId('inventory-item-price')).toHaveText(formatCents(product.priceCents));
    }

    const subtotalCents = sumCents(selectedProducts.map((product) => product.priceCents));
    const taxCents = sauceDemoTaxCents(subtotalCents);
    const totalCents = subtotalCents + taxCents;

    await expect(this.page.getByTestId('subtotal-label')).toHaveText(
      `Item total: ${formatCents(subtotalCents)}`,
    );
    await expect(this.page.getByTestId('tax-label')).toHaveText(`Tax: ${formatCents(taxCents)}`);
    await expect(this.page.getByTestId('total-label')).toHaveText(`Total: ${formatCents(totalCents)}`);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html/);
    await expect(this.page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
    await expect(this.page.getByTestId('complete-text')).toContainText('Your order has been dispatched');
  }
}
