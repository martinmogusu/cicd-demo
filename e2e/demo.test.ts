import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});

test('renders input and button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByLabel('Enter your name')).toBeVisible();
  await expect(page.getByRole('button', { name: /get started/i })).toBeVisible();
});

test('shows welcome message after submitting name', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Enter your name').fill('Alice');
  await page.getByRole('button', { name: /get started/i }).click();
  await expect(page.getByText(/welcome, alice/i)).toBeVisible();
});

test('dismisses welcome message', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Enter your name').fill('Bob');
  await page.getByRole('button', { name: /get started/i }).click();
  await expect(page.getByText(/welcome, bob/i)).toBeVisible();
  await page.getByLabel('Dismiss').click();
  await expect(page.getByText(/welcome, bob/i)).not.toBeVisible();
});
