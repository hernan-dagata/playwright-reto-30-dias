import { test, expect, Page } from '@playwright/test';
import { LoginPage } from "../pageobjests/LoginPage";
import { SideMenuOption, SidePanel } from '../components/SidePanel';

test('Check left menu options', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');
    const sidePanel = new SidePanel(page);
    await sidePanel.beVisibleOption(SideMenuOption.ADMIN);

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

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');

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

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');
    const sidePanel = new SidePanel(page);
    await sidePanel.clickOption(SideMenuOption.ADMIN);

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

    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');
    const sidePanel = new SidePanel(page);
    await sidePanel.clickOption(SideMenuOption.ADMIN);
    
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

test('Verify that the filter displays only the selected option', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');
    const sidePanel = new SidePanel(page);
    await sidePanel.filterBy(SideMenuOption.MY_INFO);
    await sidePanel.beVisibleOption(SideMenuOption.MY_INFO);
    await sidePanel.notBeVisibleOption(SideMenuOption.ADMIN);
});