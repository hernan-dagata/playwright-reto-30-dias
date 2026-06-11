import {test, expect} from '@playwright/test';

test('Check left menu options', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin');
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123');
    await page.getByRole('button', {name: 'Login'}).click();

    expect(page.url()).toContain('index.php/dashboard/index');
    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible();

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItems = await leftMenuItems.count();
    console.log("current menu items:", currentMenuItems);

    const currentMenuItemTexts: string[] = [];

    for (let i = 0; i < currentMenuItems; i++) {
        const menuItemText = await leftMenuItems.nth(i).innerText();
        currentMenuItemTexts.push(menuItemText);
    }

    console.log("menu item texts:", currentMenuItemTexts);

    const expectedMenuItems = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info', 'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Claim', 'Buzz'];
    expect(currentMenuItemTexts).toEqual(expectedMenuItems);
    expect(currentMenuItemTexts[0]).toEqual('Admin');
    expect(currentMenuItemTexts.length).toEqual(expectedMenuItems.length);
});