import { test, expect, APIRequestContext } from "@playwright/test";
import { TransactionService } from "@playwright-services/transaction-service-api";
import { UserService } from "@playwright-services/user-service-api";
import { loggedInUserApiContext } from "@playwright-shared/apiUtilities";
import TestUserDataBuilder from "data/builder/test-user-builder";
import NewTransactionData from "data/data/new-transaction-data";
import { TransactionType } from "data/enums";
import { Strings } from "data/enums";

test.describe("Transaction tests", async () => {
  let apiContext: APIRequestContext;
  let transactionService: TransactionService;
  let userService: UserService;
  let transactionId: string;
  let recieverId: string;

  test.beforeAll(async () => {
    const testUser = TestUserDataBuilder.existingLoginUser().build();
    apiContext = await loggedInUserApiContext(testUser);
    transactionService = new TransactionService(apiContext);
    userService = new UserService(apiContext);

    let newTrasnsactionData = new NewTransactionData(TransactionType.PAY);
    let recievedUserBody = await userService.getUsers();
    recieverId = recievedUserBody.results[0].id;

    let newTransaction = await transactionService.createTransaction(
      newTrasnsactionData,
      recieverId
    );

    transactionId = newTransaction.transaction.id;
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test("Create a comment for transaction", async () => {
    const commentBody = await transactionService.createACommentForTransaction(
      transactionId,
      Strings.COMMENT
    );

    expect(commentBody).toBe("OK");

    let allCommentsBody = await transactionService.getAllCommentsForTransaction(transactionId);
    expect(allCommentsBody.comments[0].content).toBe(Strings.COMMENT);
  });
});
