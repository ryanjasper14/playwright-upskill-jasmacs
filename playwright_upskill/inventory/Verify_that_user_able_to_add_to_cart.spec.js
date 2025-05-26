const { test, expect } = require('@playwright/test');

test('Verify that user can add item to cart', async ({ page }) => {

  // Visit the website inventory page
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Add to cart the item
  await page.click('#add-to-cart-sauce-labs-backpack');
  // Go to cart
  await page.click('.shopping_cart_link');
  // Expect 1 item in cart
  await expect(page.locator('.cart_item')).toHaveCount(1);
});

test('Verify that user can go back to shopping list', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/cart.html');

  // To go back to inventory page
  await page.click('#continue-shopping');

});

test('Verify that user can add item again to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Wait for the button to be visible
  await page.waitForSelector('#add-to-cart-sauce-labs-bike-light', { state: 'visible' });

  // Add item to cart again
  await page.click('#add-to-cart-sauce-labs-bike-light');

  // Go to cart
  await page.click('.shopping_cart_link');

  // Expect 2 items in cart
  await expect(page.locator('.cart_item')).toHaveCount(1);

});

test('Verify that user can add 2 items in the cart', async ({ page }) => {

  // Visit the website inventory page
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Add 1st  item to cart
  await page.click('#add-to-cart-sauce-labs-backpack');

  // add 2nd item to cart
  await page.click('#add-to-cart-sauce-labs-bike-light');

  // Go to cart
  await page.click('.shopping_cart_link');

  // Expect 2 items in cart
  await expect(page.locator('.cart_item')).toHaveCount(2);

});
