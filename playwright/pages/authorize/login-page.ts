import type { Page } from "@playwright/test";
import { test } from "@playwright/test";

import Button from "@component/common/button";
import Input from "@component/common/input";
import BasePage from "@pages/base-page";
import TestUserData from "@test-data/data/test-user-data";

export default class LoginPage extends BasePage {
  private readonly usernameInput: Input;
  private readonly passwordInput: Input;
  private readonly loginButton: Button;

  public constructor(page: Page) {
    super(page);
    this.usernameInput = new Input(page, page.getByRole("textbox", { name: "Username" }));
    this.passwordInput = new Input(page, page.getByRole("textbox", { name: "Password" }));
    this.loginButton = new Button(page, page.getByRole("button", { name: "Sign In" }));
  }

  public async loginAsUser(user: TestUserData): Promise<void> {
    await test.step(`Login into the application as a user: ${JSON.stringify(user)}`, async () => {
      if (!user.getPassword()) {
        throw new Error(
          `The password for the user "${user.getUserName()}" is not specified. Please provide`
        );
      }

      await this.usernameInput.clearAndFill(user.getUserName());
      await this.passwordInput.clearAndFill(user.getPassword());
      await this.loginButton.click();
    });
  }
}
