import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the login page and perform login
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user'); // Enter username
  await page.fill('#password', 'secret_sauce');  // Enter password
  await page.click('#login-button');  // Click login button

  // Wait for an element on the page that indicates a successful login
  // For example, wait for the inventory list to appear (this confirms login success)
  await page.waitForSelector('.inventory_list', { timeout: 60000 });  // 60s timeout

  // Save the storage state (cookies, localStorage, etc.) to a file
  await page.context().storageState({ path: 'setup/loginState.json' });

  // Close the browser
  await browser.close();
}

export default globalSetup;