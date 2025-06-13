import BankAccountData from "@test-data/data/bank-account-data";

export default class NewBankAccountPage {
  get bankNameInput() {
    return cy.getById("bankaccount-bankName-input");
  }

  get routingNumberInput() {
    return cy.getById("bankaccount-routingNumber-input");
  }

  get accountNumberInput() {
    return cy.getById("bankaccount-accountNumber-input");
  }

  get saveButton() {
    return cy.getBySel("bankaccount-submit");
  }

  createNewBankAccount(newBankAccount: BankAccountData) {
    this.bankNameInput.clear().type(newBankAccount.getBankName());
    this.routingNumberInput.clear().type(newBankAccount.getRoutingNumber());
    this.accountNumberInput.clear().type(newBankAccount.getAccountNumber());
    this.saveButton.click();
  }
}
