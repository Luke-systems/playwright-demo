import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('a user can complete an end-to-end purchase', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart('Sauce Labs Backpack');
    await inventory.openCart();

    const cart = new CartPage(page);
    await expect(cart.cartItems).toHaveCount(1);
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.fillInformation('Luke', 'Martinez', '90210');
    await checkout.finish();

    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
  });

  test('checkout requires customer information', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart('Sauce Labs Backpack');
    await inventory.openCart();

    const cart = new CartPage(page);
    await cart.checkout();

    // Continue without filling in the form — SauceDemo should block it.
    const checkout = new CheckoutPage(page);
    await checkout.continueButton.click();
    await expect(page.getByTestId('error')).toContainText('First Name is required');
  });
});
