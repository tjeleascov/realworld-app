import { pages } from "@cypress-pages/pages";
import BankAccountData from "@test-data/data/bank-account-data";

describe("Bank account spec", () => {
  beforeEach(() => {
    cy.loginWithExistingUser();
  });

  it("Create a new Bank Account", function () {
    const newBank = new BankAccountData();
    pages.leftSideMenu.clickBankAccounts();
    pages.bankAccounts.clickCreate();
    pages.newBankAccount.createNewBankAccount(newBank);
    pages.bankAccounts.verifyThatBankAccountIsDisplayed(newBank.getBankName());
  });

  it("Delete a Bank Account", function () {
    const newBank = new BankAccountData();
    pages.leftSideMenu.clickBankAccounts();
    pages.bankAccounts.clickCreate();
    pages.newBankAccount.createNewBankAccount(newBank);

    pages.bankAccounts.deleteLastAccountFromTheList();
    pages.bankAccounts.verifyThatBankAccountButtonIsHidden();
    pages.bankAccounts.verifyThatBankAccountIsDeleted(newBank.getBankName());
  });
});
