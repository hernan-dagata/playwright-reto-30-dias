import { test, expect } from '@playwright/test';

test('Check left menu options', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    expect(page.url()).toContain('index.php/dashboard/index');
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

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

test('Navegate throught the left panel', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    expect(page.url()).toContain('index.php/dashboard/index');
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItems = await leftMenuItems.count();

    for (let i = 0; i < currentMenuItems; i++) {
        const menuItemText = leftMenuItems.nth(i);
        const menuItemTextValue = await menuItemText.innerText();
        console.log("Current menu item:", menuItemTextValue);
        await menuItemText.click();
        if (menuItemTextValue == "Maintenance") {
            await page.goBack();
        }
    }
});

test('Check all the qualifications options', async ({ page }) => {
    const expectedPages = [
        { option: 'Skills', path: '/web/index.php/admin/viewSkills' },
        { option: 'Education', path: '/web/index.php/admin/viewEducation' },
        { option: 'Licenses', path: '/web/index.php/admin/viewLicenses' }
    ];

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    expect(page.url()).toContain('index.php/dashboard/index');
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click();
    const qualificationOptions = page.getByRole('menu').locator('li');

    for(let expectedPage of expectedPages) {
        const menuOption = qualificationOptions.filter({ hasText: expectedPage.option });
        console.log("Current option:", await menuOption.innerText());
        await menuOption.click();
        await expect(page).toHaveURL(new RegExp(expectedPage.path));
        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click();
    }
});

test('Check all the Configuration options', async ({ page }) => {
    const expectedPages = [
        { option: 'Email Configuration', path: '/web/index.php/admin/listMailConfiguration' },
        { option: 'Email Subscriptions', path: '/web/index.php/admin/viewEmailNotification' },
        { option: 'Localization', path: '/web/index.php/admin/localization' }
    ];

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    expect(page.url()).toContain('index.php/dashboard/index');
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Configuration').click();
    const configurationOptions = page.getByRole('menu').locator('li');

    for(let expectedPage of expectedPages) {
        const menuOption = configurationOptions.filter({ hasText: expectedPage.option });
        console.log("Current option:", await menuOption.innerText());
        await menuOption.click();
        await expect(page).toHaveURL(new RegExp(expectedPage.path));
        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Configuration').click();
    }
});