import { test, expect } from "@playwright/test";

test('Get all usernames registered in HRM', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();


    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

    const rows = page.getByRole('table').getByRole('row');
    const usernames: string[] = [];

    for (let i = 1; i < await rows.count(); i++) {
        const username = await rows.nth(i).getByRole('cell').nth(1).innerText();
        usernames.push(username);
    }

    console.log(usernames);
});

test('Get all employees names registered in HRM', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();


    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

    const rows = page.getByRole('table').getByRole('row');
    const employeeNames: string[] = [];

    for (let i = 1; i < await rows.count(); i++) {
        const employeeName = await rows.nth(i).getByRole('cell').nth(3).innerText();
        employeeNames.push(employeeName);
    }

    console.log(employeeNames);
});