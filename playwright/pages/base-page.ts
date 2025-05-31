import LeftSideMenu from "@component/menu/left-side-menu";
import TopSideMenu from "@component/menu/top-side-menu";
import { test, expect, Page } from "@playwright/test";

export default abstract class BasePage {
  public readonly leftSideMenu: LeftSideMenu;
  public readonly topSideMenu: TopSideMenu;
  protected readonly url: string = "/";

  constructor(protected readonly page: Page) {
    this.leftSideMenu = new LeftSideMenu(page);
    this.topSideMenu = new TopSideMenu(page);
  }

  public async open(): Promise<void> {
    await test.step(`Open url ${this.url}`, async () => {
      await this.page.goto(this.url, { waitUntil: "load" });
      await this.page.waitForLoadState("networkidle");
    });
  }

  public async reloadPage(): Promise<void> {
    await test.step(`Reload page`, async () => {
      await this.page.reload();
    });
  }

  public async verifyPageContainsUrl(): Promise<void> {
    await test.step(`Verify Page contains url "${this.url}"`, async () => {
      await expect(this.page).toHaveURL(new RegExp(this.url));
    });
  }

  public async clickOutside(): Promise<void> {
    await this.page.locator("body").click();
  }

  protected getByDataTest(label: string): string {
    return `[data-test="${label}"]`;
  }

  protected getByDataTestStartsWith(label: string): string {
    return `[data-test^="${label}"]`;
  }
}
