const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../../pages/InventoryPage'); // Import the InventoryPage class
const { CartPage } = require('../../pages/CartPage'); // Import the CartPage class

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html'); // go directly to a logged-in page
  });

  test('should add 1 item to cart', async ({ page }) => {
    // Go to the inventory page directly
    const inventory = new InventoryPage(page);
    // Add an item to the cart 
    const cart = new CartPage(page);

    await inventory.addBackpackToCart();
    await inventory.goToCart();

    await expect(cart.getItemCount()).toHaveCount(1);
  });

  test('should go back to shopping from cart page', async ({ page }) => {
    const cart = new CartPage(page);
    await page.goto('https://www.saucedemo.com/cart.html');
    await cart.continueShopping();

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should add a second item to cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addBikeLightToCart();
    await inventory.goToCart();

    // This assumes the cart was empty before
    await expect(cart.getItemCount()).toHaveCount(1);
  });

  test('should add 2 items to cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addBackpackToCart();
    await inventory.addBikeLightToCart();
    await inventory.goToCart();

    await expect(cart.getItemCount()).toHaveCount(2);
  });

  test('should remove items from cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addBackpackToCart();
    await inventory.addBikeLightToCart();
    await inventory.goToCart();

    // Remove items one by one
    await inventory.removeBackpackFromCart();
    await expect(cart.getItemCount()).toHaveCount(1); // 1 item left

    await inventory.removeBikeLightFromCart();
    await expect(cart.getItemCount()).toHaveCount(0); // No items left
  });

  test('should fill in checkout information', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addBackpackToCart();
    await inventory.addBikeLightToCart();
    await inventory.goToCart();
    await expect(cart.getItemCount()).toHaveCount(2);
    await cart.goToCheckout();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await cart.fillFirstName('Ryan Jasper');
    await cart.fillLastName('Macapobre');
    await cart.fillZipCode('6038');

    await cart.clickContinueCheckout();
    const items = page.locator('.inventory_item');
    const itemCount = await items.count();

    for (let i = 0; i < itemCount; i++) {
      const item = items.nth(i);
      const name = await item.locator('.inventory_item_name').innerText();
      const desc = await item.locator('.inventory_item_desc').innerText();
      const price = await item.locator('.inventory_item_price').innerText();
    }

  });

});
