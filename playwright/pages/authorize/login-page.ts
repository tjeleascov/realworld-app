import type { Page } from "@playwright/test";
import { test } from "@playwright/test";

import Button from "@playwright-component/common/button";
import Input from "@playwright-component/common/input";
import BasePage from "@playwright-pages/base-page";
import TestUserData from "@test-data/data/test-user-data";

export default class LoginPage extends BasePage {
  private readonly usernameInput: Input;
  private readonly passwordInput: Input;
  private readonly loginButton: Button;
  private readonly signUpButton: Button;

  public constructor(page: Page) {
    super(page);
    this.usernameInput = new Input(page, page.getByRole("textbox", { name: "Username" }));
    this.passwordInput = new Input(page, page.getByRole("textbox", { name: "Password" }));
    this.loginButton = new Button(page, page.getByRole("button", { name: "Sign In" }));
    this.signUpButton = new Button(page, page.getByText("Don't have an account? Sign Up"));
  }

  public async loginAsUser(user: TestUserData): Promise<void> {
    await test.step(`Login into the application as a user: ${JSON.stringify(user)}`, async () => {
      if (!user.getPassword()) {
        throw new Error(
          `The password for the user "${user.getUserName()}" is not specified. Please provide`
        );
      }

      await this.fillUsername(user.getUserName());
      await this.fillPassword(user.getPassword());
      await this.clickLogin();
    });
  }

  public async fillUsername(username: string): Promise<void> {
    await test.step(`Fill in username: ${username}`, async () => {
      await this.usernameInput.clearAndFill(username);
    });
  }

  public async fillPassword(password: string): Promise<void> {
    await test.step(`Fill in password`, async () => {
      await this.passwordInput.clearAndFill(password);
    });
  }

  public async clickLogin(): Promise<void> {
    await test.step("Click login button", async () => {
      await this.loginButton.click();
    });
  }

  public async clickSignUp(): Promise<void> {
    await test.step(`Click on the 'Don't have an account? Sign Up' button`, async () => {
      await this.clickOutside();
      await this.signUpButton.click();
    });
  }
}
