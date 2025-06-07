import { test, expect, APIRequestContext } from "@playwright/test";
import { TransactionService } from "@services/transaction-service-api";
import { UserService } from "@services/user-service-api";
import { loggedInUserApiContext } from "@shared/apiUtilities";
import TestUserDataBuilder from "@test-data/builder/test-user-builder";
import NewTransactionData from "@test-data/data/new-transaction-data";
import { TransactionType } from "@test-data/enums";
import { Strings } from "@test-data/enums";

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
    let newTrasnsaction = new NewTransactionData(TransactionType.PAY);
    let recievedUser = await userService.getUsers();
    recieverId = recievedUser.results[0].id;

    let newTransaction = await transactionService.createTransaction(newTrasnsaction, recieverId);
    transactionId = newTransaction.transaction.id;
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test("Create a comment for transaction", async () => {
    const commentResponse = await transactionService.createACommentForTransaction(
      transactionId,
      Strings.COMMENT
    );

    expect(commentResponse).toBe("OK");

    let allComments = await transactionService.getAllCommentsForTransaction(transactionId);
    expect(allComments.comments[0].content).toBe(Strings.COMMENT);
  });
});
