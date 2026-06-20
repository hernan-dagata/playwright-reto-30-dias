import { test, expect } from '@playwright/test';
import { SideMenuOption, SidePanel } from '../components/SidePanel';

test('Login to HRM with valid credentials', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    const sidePanel = new SidePanel(page);
    await sidePanel.beVisibleOption(SideMenuOption.ADMIN);
    expect(page.url()).toContain('index.php/dashboard/index');
});

test('Login to HRM with invalid credentials', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();

    expect(page.url()).not.toContain('index.php/dashboard/index');
    await expect(page.getByRole('link', { name: 'Admin' })).not.toBeVisible();
    await expect(page.getByRole('alert').filter({ hasText: 'Invalid credentials' })).toBeVisible();

});