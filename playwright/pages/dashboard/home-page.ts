import LeftSideMenu from "@component/menu/left-side-menu";
import BasePage from "@pages/base-page";
import type { Page } from "@playwright/test";

export default class HomePage extends BasePage {
  public readonly leftSideMenu: LeftSideMenu;
  public constructor(page: Page) {
    super(page);
    const leftSideLocator = page.locator(this.getByDataTest("sidenav"));

    this.leftSideMenu = new LeftSideMenu(page, leftSideLocator);
  }
}
