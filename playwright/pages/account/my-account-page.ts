import Button from "@component/common/button";
import Input from "@component/common/input";
import BasePage from "@pages/base-page";
import test, { Page } from "@playwright/test";
import TestUserData from "@test-data/data/test-user-data";

export default class MyAccountPage extends BasePage {
  private readonly firstNameInput: Input;
  private readonly lastNameInput: Input;
  private readonly emailInput: Input;
  private readonly phoneInput: Input;
  private readonly saveButton: Button;
  public constructor(page: Page) {
    super(page);

    this.firstNameInput = new Input(page, page.getByPlaceholder("First Name"));
    this.lastNameInput = new Input(page, page.getByPlaceholder("Last Name"));
    this.emailInput = new Input(page, page.getByPlaceholder("Email"));
    this.phoneInput = new Input(page, page.getByPlaceholder("Phone Number"));
    this.saveButton = new Button(page, page.getByRole("button", { name: "Save" }));
  }

  public async updateUserDataAndSaveChanges(updatedUser: TestUserData): Promise<void> {
    await test.step(
      `Update the user information with: ${JSON.stringify(updatedUser)}`,
      async () => {
        await this.fillFirstName(updatedUser.getFirstName());
        await this.fillLastName(updatedUser.getLastName());
        await this.fillEmail(updatedUser.getEmail());
        await this.fillPhone(updatedUser.getPhoneNumber());
        await this.clickSave();
      }
    );
  }

  public async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.clearAndFill(firstName);
  }

  public async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.clearAndFill(lastName);
  }

  public async fillEmail(email: string): Promise<void> {
    await this.emailInput.clearAndFill(email);
  }

  public async fillPhone(phone: string): Promise<void> {
    await this.phoneInput.clearAndFill(phone);
  }

  public async clickSave(): Promise<void> {
    await this.saveButton.click();
  }
}
