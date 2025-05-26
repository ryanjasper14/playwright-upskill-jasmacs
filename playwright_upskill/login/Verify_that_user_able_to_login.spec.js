import { config } from 'dotenv';
const { test, expect } = require('@playwright/test');
config(); // Load environment variables from .env file

test.describe('Verify_that_user_able_to_login', () => {


    test('Login page UI elements are visible', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        // Check input fields
        await expect(page.locator('#user-name')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();

        // Check login button
        await expect(page.locator('#login-button')).toBeVisible();
        await expect(page.locator('#login-button')).toHaveText('Login');

        // Check logo and header text (if any)
        await expect(page.locator('.login_logo')).toBeVisible();
        await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

        // Optional: Check placeholder text
        await expect(page.locator('#user-name')).toHaveAttribute('placeholder', 'Username');
        await expect(page.locator('#password')).toHaveAttribute('placeholder', 'Password');

    });

    test('Empty login fields show required error', async ({ page }) => {
        // Visit the website login page
        await page.goto('https://www.saucedemo.com');
        // Click login without filling in any fields
        await page.click('#login-button');
        // Check for error message
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username is required'); // Adjust based on actual site text
    });

    test('Login with invalid credentials', async ({ page }) => {

        // Visit the website login page
        await page.goto('https://www.saucedemo.com');

        // Fill in invalid credentials
        await page.fill('#user-name', 'invalid_user');
        await page.fill('#password', 'invalid_pass');

        // Click login
        await page.click('#login-button');

        // Check for error message
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username and password do not match'); // or the actual error message text

    })

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
    })

});