import BankAccountData from "@test-data/data/bank-account-data";

export default class NewBankAccountPage {
  private get bankNameInput() {
    return cy.getById("bankaccount-bankName-input");
  }

  private get routingNumberInput() {
    return cy.getById("bankaccount-routingNumber-input");
  }

  private get accountNumberInput() {
    return cy.getById("bankaccount-accountNumber-input");
  }

  private get saveButton() {
    return cy.getBySel("bankaccount-submit");
  }

  createNewBankAccount(newBankAccount: BankAccountData) {
    this.fillBankName(newBankAccount.getBankName());
    this.fillRoutingNumber(newBankAccount.getRoutingNumber());
    this.fillAccountNumber(newBankAccount.getAccountNumber());
    this.clickSave();
  }

  fillBankName(bankName: string) {
    this.bankNameInput.clear().type(bankName);
  }

  fillRoutingNumber(routingNumber: string) {
    this.routingNumberInput.clear().type(routingNumber);
  }

  fillAccountNumber(accountNumber: string) {
    this.accountNumberInput.clear().type(accountNumber);
  }

  clickSave() {
    this.saveButton.click();
  }
}
