import Button from "@playwright-component/common/button";
import BasePage from "@playwright-pages/base-page";
import test, { expect, Locator, Page } from "@playwright/test";
import { Strings } from "@test-data/enums";

export default class BankAccountsPage extends BasePage {
  private readonly createButton: Button;
  private readonly lastDeleteBankAccountButton: Button;
  private readonly lastBankAccountLocator: Locator;
  public constructor(page: Page) {
    super(page);
    this.createButton = new Button(page, page.locator(this.getByDataTest("bankaccount-new")));
    this.lastBankAccountLocator = page
      .locator(this.getByDataTestStartsWith("bankaccount-list-item"))
      .last()
      .locator("p");
    this.lastDeleteBankAccountButton = new Button(
      page,
      page.locator(this.getByDataTestStartsWith("bankaccount-list-item")).last().getByRole("button")
    );
  }

  public async deleteLastAccountFromTheList(): Promise<void> {
    await test.step(`Bank Accounts -> Delete Last Bank Account`, async () => {
      if ((await this.lastBankAccountLocator.innerText()).includes(Strings.DELETED)) {
        throw new Error(`The last bank account is already deleteted!`);
      }
      await this.lastDeleteBankAccountButton.click();
    });
  }
  public async clickCreate(): Promise<void> {
    await test.step(`Bank Accounts -> Click on the create button`, async () => {
      await this.createButton.click();
    });
  }

  public async verifyThatBankAccountIsDisplayed(bankName: string): Promise<void> {
    await test.step(`Verify that Bank Account Has been created`, async () => {
      await expect(this.lastBankAccountLocator).toHaveText(bankName);
    });
  }

  public async verifyThatBankAccountIsDeleted(bankName: string): Promise<void> {
    const deletedBankText = `${bankName} ${Strings.DELETED}`;
    await test.step(`Verify that Bank Account Has been deleted`, async () => {
      await expect(this.lastBankAccountLocator).toHaveText(deletedBankText);
    });
  }

  public async verifyThatBankAccountButtonIsHidden(): Promise<void> {
    await test.step(`Verify that Bank Account Button is hidden`, async () => {
      await expect(this.lastDeleteBankAccountButton.getLocator()).toBeHidden();
    });
  }
}
