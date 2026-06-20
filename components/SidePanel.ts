import { Page, Locator, expect } from '@playwright/test';

export class SidePanel {
    readonly page: Page;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Search');
    }

    private menuOption(option: SideMenuOption): Locator {
        return this.page.getByRole('link', { name: option });
    }

    async clickOption(option: SideMenuOption) {
        await this.menuOption(option).click();
    }

    async beVisibleOption(option: SideMenuOption) {
        await expect(this.menuOption(option)).toBeVisible();
    }

    async notBeVisibleOption(option: SideMenuOption) {
        await expect(this.menuOption(option)).not.toBeVisible();
    }

    async filterBy(option: SideMenuOption) {
    await this.searchInput.fill(option);
}
}

export enum SideMenuOption {
    ADMIN = "Admin",
    PIM = "PIM",
    LEAVE = "Leave",
    TIME = "Time",
    RECRUITMENT = "Recruitment",
    MY_INFO = "My Info",
    PERFORMANCE = "Performance",
    DASHBOARD = "Dashboard",
    DIRECTORY = "Directory",
    MAINTENANCE = "Maintenance",
    CLAIM = "Claim",
    BUZZ = "Buzz"
}