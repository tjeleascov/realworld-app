import Button from "@component/common/button";
import Input from "@component/common/input";
import BasePage from "@pages/base-page";
import { expect, test, Page, Locator } from "@playwright/test";
import NewTransactionData from "@test-data/data/new-transaction-data";
import { TransactionType } from "@test-data/enums";

export default class NewTransactionPage extends BasePage {
  private readonly firstTransactionContactButton: Button;
  private readonly requestButton: Button;
  private readonly payButton: Button;
  private readonly returnToTransactionButton: Button;
  private readonly amountInput: Input;
  private readonly addNoteInput: Input;
  private readonly successTransactionLocator: Locator;
  public constructor(page: Page) {
    super(page);

    this.firstTransactionContactButton = new Button(
      page,
      page.locator(this.getByDataTestStartsWith("user-list-item")).first()
    );
    this.requestButton = new Button(page, page.getByRole("button", { name: "Request" }));
    this.payButton = new Button(page, page.getByRole("button", { name: "Pay" }));
    this.returnToTransactionButton = new Button(
      page,
      page.getByRole("button", { name: "Return To Transactions" })
    );
    this.amountInput = new Input(page, page.getByRole("textbox", { name: "Amount" }));
    this.addNoteInput = new Input(page, page.getByRole("textbox", { name: "Add a note" }));
    this.successTransactionLocator = page.getByText("Transaction Submitted!");
  }

  public async makeNewTransactionWithFirstContactAndSubmit(
    newTransaction: NewTransactionData
  ): Promise<void> {
    await test.step(
      `Create a New ${newTransaction.getTransactionType()} transaction and submit`,
      async () => {
        await this.amountInput.clearAndFill(newTransaction.getAmount());
        await this.addNoteInput.clearAndFill(newTransaction.getNote());
        if (newTransaction.getTransactionType() === TransactionType.PAY) {
          await this.payButton.click();
        } else {
          await this.requestButton.click();
        }
      }
    );
  }

  public async clickOnTheFirstTransactionContact(): Promise<void> {
    await test.step("Click on the first transaction contact oprion from the list", async () => {
      await this.firstTransactionContactButton.click();
    });
  }

  public async clickOnReturnToTransaction(): Promise<void> {
    await test.step("Click on the return to transaction button", async () => {
      await this.returnToTransactionButton.click();
    });
  }

  public async getFullNameOfFirstTransactionContact(): Promise<string> {
    const nameLocator = this.firstTransactionContactButton
      .getLocator()
      .locator(".MuiListItemText-primary");
    return await nameLocator.innerText();
  }

  public async verifySuccessfulTransactionBarIsVsible(): Promise<void> {
    await test.step("Verify that Successful Transaction bar is visible", async () => {
      await expect(this.successTransactionLocator).toBeVisible();
    });
  }
}
