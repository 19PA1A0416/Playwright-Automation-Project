import { users } from '../data/users.data';
import type { InventoryPage } from '../pages/inventory.page';
import type { LoginPage } from '../pages/login.page';

/** Signs in as the standard shopper and waits until the product list is ready. */
export async function loginAsStandardShopper(
  loginPage: LoginPage,
  inventoryPage: InventoryPage,
): Promise<void> {
  await loginPage.open();
  await loginPage.loginAs(users.standard);
  await inventoryPage.expectLoaded();
}
