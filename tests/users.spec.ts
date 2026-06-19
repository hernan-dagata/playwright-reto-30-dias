import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageobjests/LoginPage";

test('Get all usernames registered in HRM', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');

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

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');

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

test('Select specific user for editing', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');

    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

    const rows = page.getByRole('table').getByRole('row');
    await expect(rows.first()).toBeVisible();
    console.log(`Rows found: ${await rows.count()}`);
    const usernames: string[] = [];
    for (let i = 1; i < await rows.count(); i++) { 
        var username = await rows.nth(i).getByRole('cell').nth(1).innerText(); 
        if (username !== 'Admin') { 
            usernames.push(username); 
        } 
    }
    console.log(usernames);
    const randomIndex = Math.floor(Math.random() * usernames.length);
    var userForEditing = usernames[randomIndex];
    console.log(`Randomly selected user for editing: ${userForEditing}`);
    const pencilButton = page.getByRole('table').getByRole('row').filter({ hasText: userForEditing }).locator('button').filter({ has: page.locator('i.bi-pencil-fill') });
    await pencilButton.click();
    expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(userForEditing);
});
