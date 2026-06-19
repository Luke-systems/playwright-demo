import { Page, Locator } from '@playwright/test';

/** Page object for the products/inventory screen after login. */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  /**
   * Add an item to the cart by its display name, e.g. "Sauce Labs Backpack".
   * SauceDemo's add-to-cart buttons use ids like `add-to-cart-sauce-labs-backpack`.
   */
  async addItemToCart(itemName: string) {
    const slug = itemName.toLowerCase().replace(/\s+/g, '-');
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
