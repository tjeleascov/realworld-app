import Button from "@component/common/button";
import BasePage from "@pages/base-page";
import { test, Page } from "@playwright/test";
import TestUserData from "@test-data/data/test-user-data";
import { User } from "src/models";

export default class HomePage extends BasePage {
  private readonly everyoneButton: Button;
  private readonly friendsButton: Button;
  private readonly mineButton: Button;
  private readonly firstTransactionButton: Button;

  public constructor(page: Page) {
    super(page);

    this.everyoneButton = new Button(page, page.locator(this.getByDataTest("nav-public-tb")));
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

  public async verifyTransactionHistoryWithAllDetails(
    mainUser: TestUserData,
    secondUser: User
  ): Promise<void> {}
}
