import { test, Page } from "playwright/test";

import Button from "@component/common/button";
import Input from "@component/common/input";
import BasePage from "@pages/base-page";
import TestUserData from "@test-data/data/test-user-data";

export default class SignupPage extends BasePage {
  protected readonly url: string = "/signup";
  private readonly firstNameInput: Input;
  private readonly lastNameInput: Input;
  private readonly usernameInput: Input;
  private readonly passwordInput: Input;
  private readonly confirmPasswordInput: Input;
  private readonly signupButton: Button;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = new Input(page, page.getByRole("textbox", { name: "First Name" }));
    this.lastNameInput = new Input(page, page.getByRole("textbox", { name: "Last Name" }));
    this.usernameInput = new Input(page, page.getByRole("textbox", { name: "Username" }));
    this.passwordInput = new Input(
      page,
      page.locator(this.getByDataTest("signup-password")).getByRole("textbox", { name: "Password" })
    );
    this.confirmPasswordInput = new Input(
      page,
      page.getByRole("textbox", { name: "Confirm Password" })
    );
    this.signupButton = new Button(page, page.locator(this.getByDataTest("signup-submit")));
  }

  public async signUpAsUser(newUser: TestUserData): Promise<void> {
    await test.step(
      `Sign-up into the application as a new user: ${JSON.stringify(newUser)}`,
      async () => {
        await this.firstNameInput.clearAndFill(newUser.getFirstName());
        await this.lastNameInput.clearAndFill(newUser.getLastName());
        await this.usernameInput.clearAndFill(newUser.getUserName());
        await this.passwordInput.clearAndFill(newUser.getPassword());
        await this.confirmPasswordInput.clearAndFill(newUser.getPassword());
        await this.signupButton.click();
      }
    );
  }
}
