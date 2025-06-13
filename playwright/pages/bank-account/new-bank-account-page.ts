import Button from "@playwright-component/common/button";
import Input from "@playwright-component/common/input";
import BasePage from "@playwright-pages/base-page";
import test, { Page } from "@playwright/test";
import BankAccountData from "@test-data/data/bank-account-data";

export default class NewBankAccountPage extends BasePage {
  private readonly bankNameInput: Input;
  private readonly routingNumberInput: Input;
  private readonly accountNumberInput: Input;
  private readonly saveButton: Button;
  public constructor(page: Page) {
    super(page);

    this.bankNameInput = new Input(page, page.getByPlaceholder("Bank Name"));
    this.routingNumberInput = new Input(page, page.getByPlaceholder("Routing Number"));
    this.accountNumberInput = new Input(page, page.getByPlaceholder("Account Number"));
    this.saveButton = new Button(page, page.getByRole("button", { name: "Save" }));
  }

  public async createNewBankAccount(newBankAccount: BankAccountData): Promise<void> {
    await test.step(`Create a New Bank Account and submit`, async () => {
      await this.fillBankName(newBankAccount.getBankName());
      await this.fillRoutingNumber(newBankAccount.getRoutingNumber());
      await this.fillAccountNumber(newBankAccount.getAccountNumber());
      await this.clickSaveBankAccount();
    });
  }

  public async fillBankName(name: string): Promise<void> {
    await this.bankNameInput.clearAndFill(name);
  }

  public async fillRoutingNumber(routingNumber: string): Promise<void> {
    await this.routingNumberInput.clearAndFill(routingNumber);
  }

  public async fillAccountNumber(accountNumber: string): Promise<void> {
    await this.accountNumberInput.clearAndFill(accountNumber);
  }

  public async clickSaveBankAccount(): Promise<void> {
    await this.saveButton.click();
  }
}
