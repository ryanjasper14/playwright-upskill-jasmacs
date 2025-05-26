import { test, expect } from '@playwright/test';

test.describe('Date Picker', () => {
  test('should fill today\'s date dynamically', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Datepicker.html');

    const dateInput = page.locator('#datepicker2');

    // Dynamically generate today's date in MM/DD/YYYY
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = `${mm}/${dd}/${yyyy}`;

    // Interact with the input
    await expect(dateInput).toBeVisible();
    await dateInput.click();
    await dateInput.fill(formattedDate);
    await dateInput.press('Enter');

    // Verify
    await expect(dateInput).toHaveValue(formattedDate);
  });
});
