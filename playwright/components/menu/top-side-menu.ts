import Button from "@playwright-component/common/button";
import Component from "@playwright-component/common/component";
import { test, Page } from "@playwright/test";

export default class TopSideMenu extends Component {
  private readonly newTransactionButton: Button;
  private readonly notificationsButton: Button;

  public constructor(page: Page) {
    super(page, page.locator("header"));

    this.newTransactionButton = new Button(
      page,
      this.root.locator(this.getByDataTest("nav-top-new-transaction"))
    );
    this.notificationsButton = new Button(
      page,
      this.root.locator(this.getByDataTest("nav-top-notifications-link"))
    );
  }

  public async clickNewTransaction(): Promise<void> {
    await test.step("Click on New Transaction button in On the Top Side Menu", async () => {
      await this.newTransactionButton.click();
    });
  }

  public async clickNotification(): Promise<void> {
    await test.step("Click on Notification button in On the Top Side Menu", async () => {
      await this.notificationsButton.click();
    });
  }
}
