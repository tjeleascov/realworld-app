import faker from "@faker-js/faker";
import { test } from "@shared/fixstures";
import TestUserDataBuilder from "@test-data/builder/test-user-builder";
import NewTransactionData from "@test-data/data/new-transaction-data";
import { TransactionType } from "@test-data/enums";

test.describe("Transaction tests", () => {
  const COMMENT_TRANSACTION = faker.random.word();
  const validUser = TestUserDataBuilder.existingLoginUser().build();

  test.beforeEach(async ({ pages }) => {
    await pages.login.open();
    await pages.login.loginAsUser(validUser);
  });
  test("Make a new 'Payment' type of transaction and verify history", async ({ pages }) => {
    const payTransaction = new NewTransactionData(TransactionType.PAY);
    await pages.home.topSideMenu.clickNewTransaction();
    await pages.newTransaction.clickOnTheFirstTransactionContact();
    await pages.newTransaction.makeNewTransactionWithFirstContactAndSubmit(payTransaction);
    await pages.newTransaction.verifySuccessfulTransactionBarIsVsible();

    await pages.home.leftSideMenu.clickHome();
    await pages.home.verifyFirstTransactionIsVisilbe();
    await pages.home.clickFriends();
    await pages.home.verifyFirstTransactionIsVisilbe();
    await pages.home.clickMine();
    await pages.home.verifyFirstTransactionIsVisilbe();
  });

  test("Make a new 'Request' type of transaction and verify history", async ({ pages }) => {
    const payTransaction = new NewTransactionData(TransactionType.REQUEST);
    await pages.home.topSideMenu.clickNewTransaction();
    const recieverFullname = await pages.newTransaction.getFullNameOfFirstTransactionContact();
    await pages.newTransaction.clickOnTheFirstTransactionContact();
    await pages.newTransaction.makeNewTransactionWithFirstContactAndSubmit(payTransaction);
    await pages.newTransaction.verifySuccessfulTransactionBarIsVsible();

    await pages.newTransaction.clickOnReturnToTransaction();
    await pages.home.clickOnFirstTransaction();
    await pages.transactionDetail.verifySenderFullnameIsEqualTo(validUser);
    await pages.transactionDetail.verifyActionIsEqualTo(payTransaction.getTransactionType());
    await pages.transactionDetail.verifyRecieverFullnameIsEqualTo(recieverFullname);
    await pages.transactionDetail.verifyNoteIsEqualTo(payTransaction.getNote());
    await pages.transactionDetail.verifyTransactionAmountIsEqualTo(payTransaction);
    const beforeLikeButton = await pages.transactionDetail.getAmountOfLikes();
    await pages.transactionDetail.clickLike();
    await pages.transactionDetail.verifyLikeAmountIsEqualTo(beforeLikeButton);
    await pages.transactionDetail.sendComment(COMMENT_TRANSACTION);
    await pages.transactionDetail.verifyCommentEqualsTo(COMMENT_TRANSACTION);
  });
});
