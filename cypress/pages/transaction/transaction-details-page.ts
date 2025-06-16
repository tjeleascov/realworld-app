import { TransactionType } from "@test-data/enums";
import NewTransactionData from "@test-data/data/new-transaction-data";

export default class TransactionDetailPage {
  private get transactionSender() {
    return cy.get('span[data-test^="transaction-sender"]');
  }

  private get transactionAction() {
    return cy.getBySelLike("transaction-action");
  }

  private get transactionReceiver() {
    return cy.get('span[data-test^="transaction-receiver"]');
  }

  private get transactionNote() {
    return cy.getBySel("transaction-description");
  }

  private get transactionAmount() {
    return cy.getBySelLike("transaction-amount");
  }

  private get likeButton() {
    return cy.getBySelLike("transaction-like-button");
  }

  private get likeAmount() {
    return cy.getBySelLike("transaction-like-count");
  }

  private get commentInput() {
    return cy.getBySelLike("transaction-comment-input");
  }

  private get comments() {
    return cy.getBySelLike("comment-list-item");
  }

  clickLike() {
    this.likeButton.click();
  }

  fillComment(comment: string) {
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
