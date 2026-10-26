import { products } from '../src/data/products.data';
import { test } from '../src/fixtures/test.fixture';
import { loginAsStandardShopper } from '../src/flows/shopper.flow';

test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginAsStandardShopper(loginPage, inventoryPage);
  });

  test('adds selected products and validates names, prices, and quantities', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await inventoryPage.expectCartCount(2);

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(2);
    await cartPage.expectProduct(products.backpack);
    await cartPage.expectProduct(products.bikeLight);
  });

  test('removes a product and updates the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await inventoryPage.openCart();

    await cartPage.remove(products.bikeLight);
    await cartPage.expectItemCount(1);
    await cartPage.expectProduct(products.backpack);
  });
});
