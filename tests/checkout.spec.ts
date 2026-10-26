import { checkoutErrors, customer } from '../src/data/checkout.data';
import { products } from '../src/data/products.data';
import { test } from '../src/fixtures/test.fixture';
import { loginAsStandardShopper } from '../src/flows/shopper.flow';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginAsStandardShopper(loginPage, inventoryPage);
  });

  test('completes a purchase and confirms the order total', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    const selected = [products.backpack, products.bikeLight];

    for (const product of selected) {
      await inventoryPage.addToCart(product);
    }

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(selected.length);
    for (const product of selected) {
      await cartPage.expectProduct(product);
    }

    await cartPage.startCheckout();
    await checkoutPage.expectInformationStep();
    await checkoutPage.fillShippingInfo(customer);
    await checkoutPage.expectOverview(selected);
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test('requires customer information before continuing', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.startCheckout();
    await checkoutPage.expectInformationStep();

    await checkoutPage.continueWithoutInfo();
    await checkoutPage.expectError(checkoutErrors.firstNameRequired);
  });
});
