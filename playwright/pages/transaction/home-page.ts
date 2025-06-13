import Button from "@playwright-component/common/button";
import BasePage from "@playwright-pages/base-page";
import { test, Page } from "@playwright/test";

export default class HomePage extends BasePage {
  private readonly everyoneButton: Button;
  private readonly friendsButton: Button;
  private readonly mineButton: Button;
  private readonly firstTransactionButton: Button;

  public constructor(page: Page) {
    super(page);

    this.everyoneButton = new Button(page, page.locator(this.getByDataTest("nav-public-tab")));
    this.friendsButton = new Button(page, page.locator(this.getByDataTest("nav-contacts-tab")));
    this.mineButton = new Button(page, page.locator(this.getByDataTest("nav-personal-tab")));
    this.firstTransactionButton = new Button(
      page,
      page.locator(this.getByDataTestStartsWith("transaction-item")).first()
    );
  }

  public async clickEveryone(): Promise<void> {
    await test.step("Click on Everyone Button on the Home Page", async () => {
      await this.everyoneButton.click();
    });
  }

  public async clickFriends(): Promise<void> {
    await test.step("Click on Friends Button on the Home Page", async () => {
      await this.friendsButton.click();
    });
  }

  public async clickMine(): Promise<void> {
    await test.step("Click on Mine Button on the Home Page", async () => {
      await this.mineButton.click();
    });
  }

  public async clickOnFirstTransaction(): Promise<void> {
    await test.step("Click on First Transaction in the Row", async () => {
      await this.firstTransactionButton.click();
    });
  }

  public async verifyFirstTransactionIsVisilbe(): Promise<void> {
    await test.step("The first transaction in the row is visilbe", async () => {
      await this.firstTransactionButton.isVisible();
    });
  }
}
