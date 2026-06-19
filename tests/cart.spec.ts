import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Cart', () => {
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    inventory = new InventoryPage(page);
  });

  test('adding one item updates the cart badge', async () => {
    await inventory.addItemToCart('Sauce Labs Backpack');
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('adding multiple items is reflected in the cart', async ({ page }) => {
    await inventory.addItemToCart('Sauce Labs Backpack');
    await inventory.addItemToCart('Sauce Labs Bike Light');
    await expect(inventory.cartBadge).toHaveText('2');

    await inventory.openCart();
    await expect(page.locator('.cart_item')).toHaveCount(2);
  });
});
