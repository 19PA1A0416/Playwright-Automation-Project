import { loginErrors, users } from '../src/data/users.data';
import { test } from '../src/fixtures/test.fixture';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('signs in with valid credentials and shows the product catalog', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectLoaded();
  });

  test('rejects a locked-out user', async ({ loginPage }) => {
    await loginPage.loginAs(users.lockedOut);
    await loginPage.expectError(loginErrors.lockedOut);
  });

  test('requires a username', async ({ loginPage }) => {
    await loginPage.login('', users.standard.password);
    await loginPage.expectError(loginErrors.usernameRequired);
  });

  test('requires a password', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, '');
    await loginPage.expectError(loginErrors.passwordRequired);
  });
});
