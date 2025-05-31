import { test } from "@shared/fixstures";
import TestUserDataBuilder from "@test-data/builder/test-user-builder";
import BankAccountData from "@test-data/data/bank-account-data";

test.describe("Bank tests", () => {
  test.beforeEach(async ({ pages }) => {
    const validUser = TestUserDataBuilder.existingLoginUser().build();
    await pages.login.open();
    await pages.login.loginAsUser(validUser);
  });

  test("Create A New Bank Account", async ({ pages }) => {
    const newBank = new BankAccountData();

    await pages.home.leftSideMenu.clickBankAccounts();
    await pages.bankAccounts.clickCreate();
    await pages.newBankAccount.createNewBankAccount(newBank);
    await pages.bankAccounts.deleteLastAccountFromTheList();
    await pages.bankAccounts.verifyThatBankAccountIsDisplayed(newBank.getBankName());
  });

  test("Delete a Bank Account", async ({ pages }) => {
    const newBank = new BankAccountData();

    await pages.home.leftSideMenu.clickBankAccounts();
    await pages.bankAccounts.clickCreate();
    await pages.newBankAccount.createNewBankAccount(newBank);
    await pages.bankAccounts.deleteLastAccountFromTheList();
    await pages.bankAccounts.verifyThatBankAccountIsDeleted(newBank.getBankName());
    await pages.bankAccounts.verifyThatBankAccountButtonIsHidden();
  });
});
