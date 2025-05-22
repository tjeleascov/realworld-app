import Button from "@component/common/button";
import Component from "@component/common/component";
import { test, expect, Locator, Page } from "@playwright/test";

export default class LeftSideMenu extends Component {
  private readonly homeButton: Button;
  private readonly myAccountButton: Button;
  private readonly bankAccountsButton: Button;
  private readonly notificationsButton: Button;
  private readonly logoutButton: Button;
  private readonly userNameLocator: Locator;

  public constructor(page: Page, root: Locator) {
    super(page, root);

    this.homeButton = new Button(page, this.root.getByRole("button", { name: "Home" }));
    this.myAccountButton = new Button(page, this.root.getByRole("button", { name: "My Account" }));
    this.bankAccountsButton = new Button(
      page,
      this.root.getByRole("button", { name: "Bank Accounts" })
    );
    this.notificationsButton = new Button(
      page,
      this.root.getByRole("button", { name: "Notifications" })
    );
    this.logoutButton = new Button(page, this.root.getByRole("button", { name: "Logout" }));
    this.userNameLocator = page.locator(this.getByDataTest("sidenav-username"));
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
}
