import type { Page } from "playwright/test";

import Button from "@component/common/button";
import Input from "@component/common/input";
import BasePage from "@pages/base-page";
import TestUserData from "@test-data/data/test-user-data";

export default class SignupPage extends BasePage {
  private readonly firstNameField: Input;
  private readonly lastNameField: Input;
  private readonly usernameField: Input;
  private readonly passwordField: Input;
  private readonly confirmPasswordField: Input;
  private readonly signupButton: Button;

  constructor(page: Page) {
    super(page);

    this.firstNameField = new Input(page, page.getByLabel(""));
    this.lastNameField = new Input(page, page.getByLabel(""));
    this.usernameField = new Input(page, page.getByLabel(""));
    this.passwordField = new Input(page, page.getByLabel(""));
    this.confirmPasswordField = new Input(page, page.getByLabel(""));
    this.signupButton = new Button(page, page.getByLabel(""));
  }

  public async signUpAsUser(newUser: TestUserData): Promise<void> {
    await test.step(
      `Sign-up into the application as a new user: ${JSON.stringify(newUser)}`,
      async () => {
        await this.firstNameField.clearAndFill(newUser.getFirstName());
        await this.lastNameField.clearAndFill(newUser.getLastName());
        await this.usernameField.clearAndFill(newUser.getUserName());
        await this.passwordField.clearAndFill(newUser.getUserName());
        await this.confirmPasswordField.clearAndFill(newUser.getPassword());
        await this.signupButton.click();
      }
    );
  }
}
