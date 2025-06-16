import NewTransactionData from "@test-data/data/new-transaction-data";
import { TransactionType } from "@test-data/enums";
import { pages } from "@cypress-pages/pages";
import faker from "@faker-js/faker";

describe("Transaction creation tests", () => {
  beforeEach(() => {
    cy.loginWithExistingUser();
  });

  it("Make a new 'Payment' type of transaction and verify history for all pages", function () {
    const payTransaction = new NewTransactionData(TransactionType.PAY);
    pages.topSideMenu.clickNewTransaction();
    pages.newTransaction.clickOnTheFirstTransactionContact();
    pages.newTransaction.makeNewTransactionWithFirstContactAndSubmit(payTransaction);
    pages.newTransaction.verifySuccessfulTransactionBarIsVsible();

    pages.leftSideMenu.clickHome();
    pages.home.verifyFirstTransactionIsVisible();
    pages.home.clickFriends();
    pages.home.verifyFirstTransactionIsVisible();
    pages.home.clickMine();
    pages.home.verifyFirstTransactionIsVisible();
  });

  it("Make a new 'Request' type of transaction and verify details of transaction", function () {
    let recieverFullname = "";
    const payTransaction = new NewTransactionData(TransactionType.REQUEST);
    pages.topSideMenu.clickNewTransaction();

    pages.newTransaction.getFullNameOfFirstTransactionContact().then((text) => {
      recieverFullname = text;
    });
    pages.newTransaction.clickOnTheFirstTransactionContact();
    pages.newTransaction.makeNewTransactionWithFirstContactAndSubmit(payTransaction);
    pages.newTransaction.verifySuccessfulTransactionBarIsVsible();

    pages.newTransaction.clickOnReturnToTransaction();
    pages.home.clickOnFirstTransaction();
    pages.transactionDetail.verifyActionIsEqualTo(payTransaction.getTransactionType());
    cy.then(() => {
      pages.transactionDetail.verifyRecieverFullnameIsEqualTo(recieverFullname);
    });
    pages.transactionDetail.verifyNoteIsEqualTo(payTransaction.getNote());
    pages.transactionDetail.verifyTransactionAmountIsEqualTo(payTransaction);
  });
});

describe("Transaction details tests", () => {
  beforeEach(() => {
    cy.loginWithExistingUser();
    const payTransaction = new NewTransactionData(TransactionType.REQUEST);
    pages.topSideMenu.clickNewTransaction();
    pages.newTransaction.clickOnTheFirstTransactionContact();
    pages.newTransaction.makeNewTransactionWithFirstContactAndSubmit(payTransaction);
    pages.newTransaction.verifySuccessfulTransactionBarIsVsible();
    pages.newTransaction.clickOnReturnToTransaction();
    pages.home.clickOnFirstTransaction();
  });

  it("Verify the 'Like' functionality", function () {
    let beforeLikeAmount = "";
    pages.transactionDetail.getAmountOfLikes().then((text) => {
      beforeLikeAmount = text;
    });

    pages.transactionDetail.clickLike();

    cy.then(() => {
      pages.transactionDetail.verifyLikeAmountIsEqualTo(beforeLikeAmount);
    });
  });

  it("Verify the 'Comment' functionality", function () {
    const COMMENT_TRANSACTION = faker.random.word();
    pages.transactionDetail.fillComment(COMMENT_TRANSACTION);
    pages.transactionDetail.verifyCommentEqualsTo(COMMENT_TRANSACTION);
  });
});
