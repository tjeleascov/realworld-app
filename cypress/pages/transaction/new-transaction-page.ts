import NewTransactionData from "@test-data/data/new-transaction-data";
import { TransactionType } from "@test-data/enums";

export default class NewTransactionPage {
  get firstTransactionContactButton() {
    return cy.getBySelLike("user-list-item").first();
  }

  get requestButton() {
    return cy.getBySel("transaction-create-submit-request");
  }

  get payButton() {
    return cy.getBySel("transaction-create-submit-payment");
  }

  get returnToTransactionButton() {
    return cy.getBySel("new-transaction-return-to-transactions");
  }

  get amountInput() {
    return cy.getById("amount");
  }

  get addNoteInput() {
    return cy.getById("transaction-create-description-input");
  }

  get successTransactionLocator() {
    return cy.contains("Transaction Submitted!");
  }

  makeNewTransactionWithFirstContactAndSubmit(newTransaction: NewTransactionData) {
    this.amountInput.clear().type(newTransaction.getAmount());
    this.addNoteInput.clear().type(newTransaction.getNote());
    if (newTransaction.getTransactionType() === TransactionType.PAY) {
      this.payButton.click();
    } else {
      this.requestButton.click();
    }
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
