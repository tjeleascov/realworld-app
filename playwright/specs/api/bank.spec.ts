import { test, expect, APIRequestContext } from "@playwright/test";
import { BankAccountService } from "@playwright-services/bank-service-api";
import { loggedInUserApiContext } from "@playwright-shared/apiUtilities";
import TestUserDataBuilder from "@test-data/builder/test-user-builder";
import BankAccountData from "@test-data/data/bank-account-data";

test.describe("Bank tests", async () => {
  let apiContext: APIRequestContext;
  let bankService: BankAccountService;
  let bankId: string;

  test.beforeAll(async () => {
    const testUser = TestUserDataBuilder.existingLoginUser().build();
    apiContext = await loggedInUserApiContext(testUser);
    bankService = new BankAccountService(apiContext);

    const bankAccountData = new BankAccountData();
    const newBankBody = await bankService.createBankAccount(bankAccountData);
    bankId = newBankBody.account.id;
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test("Get list of bank accounts", async () => {
    const bankBody = await bankService.getBankAccounts();

    expect(bankBody).toHaveProperty("results");
    for (const bank of bankBody.results) {
      expect(bank).toHaveProperty("id");
      expect(bank).toHaveProperty("bankName");
    }
  });

  test("Delete bank account", async () => {
    const bankDeleteBody = await bankService.deleteBankAccount(bankId);

    expect(Object.keys(bankDeleteBody).length).toBe(0);

    const bankBody = await bankService.getBankAccountById(bankId);

    expect(bankBody.account.isDeleted).toBe(true);
  });
});
