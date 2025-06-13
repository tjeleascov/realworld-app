import { TransactionType } from "@test-data/enums";
import NewTransactionData from "@test-data/data/new-transaction-data";

export default class TransactionDetailPage {
  get transactionSender() {
    return cy.get('span[data-test^="transaction-sender"]');
  }

  get transactionAction() {
    return cy.getBySelLike("transaction-action");
  }

  get transactionReceiver() {
    return cy.get('span[data-test^="transaction-receiver"]');
  }

  get transactionNote() {
    return cy.getBySel("transaction-description");
  }

  get transactionAmount() {
    return cy.getBySelLike("transaction-amount");
  }

  get likeButton() {
    return cy.getBySelLike("transaction-like-button");
  }

  get likeAmount() {
    return cy.getBySelLike("transaction-like-count");
  }

  get commentInput() {
    return cy.getBySelLike("transaction-comment-input");
  }

  get comments() {
    return cy.getBySelLike("comment-list-item");
  }

  clickLike() {
    this.likeButton.click();
  }

  sendComment(comment: string) {
    this.commentInput.clear().type(comment).type("{enter}");
  }

  getAmountOfLikes() {
    return this.likeAmount.invoke("text").then((text) => text.trim());
  }

  verifyActionIsEqualTo(transactionType: TransactionType) {
    this.transactionAction.should("contain.text", transactionType);
  }

  verifyRecieverFullnameIsEqualTo(name: string) {
    this.transactionReceiver.should("have.text", name);
  }

  verifyNoteIsEqualTo(note: string) {
    this.transactionNote.should("have.text", note);
  }

  verifyLikeAmountIsEqualTo(beforeLikeButton: string) {
    const expected = (Number(beforeLikeButton) + 1).toString();

    this.likeAmount.invoke("text").then((actualText) => {
      expect(actualText.trim()).to.eq(expected);
    });
  }

  verifyTransactionAmountIsEqualTo(transaction: NewTransactionData) {
    const sign = transaction.getTransactionType() === TransactionType.PAY ? "-" : "+";
    const amount = `${sign}$${transaction.getAmount()}.00`;
    this.transactionAmount.should("have.text", amount);
  }

  verifyCommentEqualsTo(comment: string) {
    this.comments.should("contain.text", comment);
  }
}
