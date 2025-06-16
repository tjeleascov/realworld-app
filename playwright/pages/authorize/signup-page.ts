import { test, Page } from "@playwright/test";

import Button from "@playwright-component/common/button";
import Input from "@playwright-component/common/input";
import BasePage from "@playwright-pages/base-page";
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
    await test.step(`Sign up as new user: ${newUser.getUserName()}`, async () => {
      await this.fillFirstName(newUser.getFirstName());
      await this.fillLastName(newUser.getLastName());
      await this.fillUsername(newUser.getUserName());
      await this.fillPassword(newUser.getPassword());
      await this.fillConfirmPassword(newUser.getPassword());
      await this.clickSignup();
    });
  }

  public async fillFirstName(firstName: string): Promise<void> {
    await test.step(`Fill in first name: ${firstName}`, async () => {
      await this.firstNameInput.clearAndFill(firstName);
    });
  }

  public async fillLastName(lastName: string): Promise<void> {
    await test.step(`Fill in last name: ${lastName}`, async () => {
      await this.lastNameInput.clearAndFill(lastName);
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

  public async fillConfirmPassword(password: string): Promise<void> {
    await test.step(`Fill in confirm password`, async () => {
      await this.confirmPasswordInput.clearAndFill(password);
    });
  }

  public async clickSignup(): Promise<void> {
    await test.step("Click signup button", async () => {
      await this.signupButton.click();
    });
  }
}
