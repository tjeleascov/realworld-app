import NewTransactionData from "@test-data/data/new-transaction-data";
import { TransactionType } from "@test-data/enums";

export default class NewTransactionPage {
  private get firstTransactionContactButton() {
    return cy.getBySelLike("user-list-item").first();
  }

  private get requestButton() {
    return cy.getBySel("transaction-create-submit-request");
  }

  private get payButton() {
    return cy.getBySel("transaction-create-submit-payment");
  }

  private get returnToTransactionButton() {
    return cy.getBySel("new-transaction-return-to-transactions");
  }

  private get amountInput() {
    return cy.getById("amount");
  }

  private get addNoteInput() {
    return cy.getById("transaction-create-description-input");
  }

  private get successTransactionLocator() {
    return cy.contains("Transaction Submitted!");
  }

  makeNewTransactionWithFirstContactAndSubmit(newTransaction: NewTransactionData) {
    this.fillAmount(newTransaction.getAmount());
    this.fillNote(newTransaction.getNote());

    if (newTransaction.getTransactionType() === TransactionType.PAY) {
      this.clickPayButton();
    } else {
      this.clickRequestButton();
    }
  }

  fillAmount(amount: string) {
    this.amountInput.clear().type(amount);
  }

  fillNote(note: string) {
    this.addNoteInput.clear().type(note);
  }

  clickFirstContact() {
    this.firstTransactionContactButton.click();
  }

  clickPayButton() {
    this.payButton.click();
  }

  clickRequestButton() {
    this.requestButton.click();
  }

  clickReturnToTransactions() {
    this.returnToTransactionButton.click();
  }

  clickOnTheFirstTransactionContact() {
    this.firstTransactionContactButton.click();
  }

  clickOnReturnToTransaction() {
    this.returnToTransactionButton.click();
  }

  getFullNameOfFirstTransactionContact() {
    return this.firstTransactionContactButton
      .find(".MuiListItemText-primary")
      .invoke("text")
      .then((text) => text.trim());
  }

  verifySuccessfulTransactionBarIsVsible() {
    this.successTransactionLocator.should("be.visible");
  }
}
