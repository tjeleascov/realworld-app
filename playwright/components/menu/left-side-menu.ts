import Button from "@component/common/button";
import Component from "@component/common/component";
import { test, expect, Locator, Page } from "@playwright/test";
import TestUserData from "@test-data/data/test-user-data";

export default class LeftSideMenu extends Component {
  private readonly homeButton: Button;
  private readonly myAccountButton: Button;
  private readonly bankAccountsButton: Button;
  private readonly notificationsButton: Button;
  private readonly logoutButton: Button;
  private readonly userNameLocator: Locator;
  private readonly fullNameLocator: Locator;
  private readonly userBalanceLocator: Locator;

  public constructor(page: Page) {
    super(page, page.locator("[data-test='sidenav']"));

    this.homeButton = new Button(page, page.getByRole("button", { name: "Home" }));
    this.myAccountButton = new Button(page, page.getByRole("button", { name: "My Account" }));
    this.bankAccountsButton = new Button(page, page.getByRole("button", { name: "Bank Accounts" }));
    this.notificationsButton = new Button(
      page,
      page.getByRole("button", { name: "Notifications" })
    );
    this.logoutButton = new Button(page, page.getByRole("button", { name: "Logout" }));
    this.userNameLocator = page.locator(this.getByDataTest("sidenav-username"));
    this.fullNameLocator = page.locator(this.getByDataTest("sidenav-user-full-name"));
    this.userBalanceLocator = page.locator(this.getByDataTest("sidenav-user-balance"));
  }

  public async clickHome(): Promise<void> {
    await test.step("Click on Home button in Left Side Menu", async () => {
      await this.homeButton.click();
    });
  }

  public async clickMyAccount(): Promise<void> {
    await test.step("Click on My Account button in Left Side Menu", async () => {
      await this.myAccountButton.click();
    });
  }

  public async clickBankAccounts(): Promise<void> {
    await test.step("Click on Bank Accounts button in Left Side Menu", async () => {
      await this.bankAccountsButton.click();
    });
  }

  public async clickNotifications(): Promise<void> {
    await test.step("Click on Notifications button in Left Side Menu", async () => {
      await this.notificationsButton.click();
    });
  }

  public async clickLogout(): Promise<void> {
    await test.step("Click on Logout button in Left Side Menu", async () => {
      await this.logoutButton.click();
    });
  }

  public async verifyUsernameEqualsTo(expectedUsername: string): Promise<void> {
    await test.step(`"Username" equals to "${expectedUsername}"`, async () => {
      await expect(this.userNameLocator).toHaveText("@" + expectedUsername);
    });
  }

  public async verifyFullNameEqualsTo(fullName: TestUserData): Promise<void> {
    const expectedFullName = fullName.getFirstName() + " " + fullName.getLastName().slice(0, 1);
    await test.step(`"FullName" equals to "${expectedFullName}"`, async () => {
      await expect(this.fullNameLocator).toHaveText(expectedFullName);
    });
  }

  public async verifyUserBalanceIsVisbile(): Promise<void> {
    await test.step(`Verify that user balance is visilbe`, async () => {
      await expect(this.userBalanceLocator).toBeVisible();
    });
  }
}
