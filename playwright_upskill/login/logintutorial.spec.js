import { config } from 'dotenv';
const { test, expect } = require('@playwright/test');
config(); // Load environment variables from .env file

test('Login with valid credentials', async ({ page }) => {
  //Visit the website login page
  await page.goto('https://www.saucedemo.com');

  // Fill in username and password
  await page.fill('#user-name', process.env.PLAY_USERNAME);
  await page.fill('#password', process.env.PLAY_PASSWORD);

  // login button
  await page.click('#login-button');

  // Verify successful login by checking the URL
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Optional: Check for visibility of a known element
  await expect(page.locator('.inventory_list')).toBeVisible();
});