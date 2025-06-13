import Button from "@playwright-component/common/button";
import Input from "@playwright-component/common/input";
import BasePage from "@playwright-pages/base-page";
import { expect, test, Locator, Page } from "@playwright/test";
import NewTransactionData from "@test-data/data/new-transaction-data";
import TestUserData from "@test-data/data/test-user-data";
import { TransactionType } from "@test-data/enums";

export default class TransactionDetailPage extends BasePage {
  private readonly transactionSenderLocator: Locator;
  private readonly transactionActionLocator: Locator;
  private readonly transactionRecieverLocator: Locator;
  private readonly transactionNoteLocator: Locator;
  private readonly transactionAmountLocator: Locator;
  private readonly likeButton: Button;
  private readonly likeAmountLocator: Locator;
  private readonly commentInput: Input;
  private readonly commentsLocator: Locator;

  public constructor(page: Page) {
    super(page);
    this.transactionSenderLocator = page.locator(
      `span${this.getByDataTestStartsWith("transaction-sender")}`
    );
    this.transactionActionLocator = page.locator(
      this.getByDataTestStartsWith("transaction-action")
    );
    this.transactionRecieverLocator = page.locator(
      `span${this.getByDataTestStartsWith("transaction-receiver")}`
    );
    this.transactionNoteLocator = page.locator(this.getByDataTest("transaction-description"));
    this.transactionAmountLocator = page.locator(
      this.getByDataTestStartsWith("transaction-amount")
    );
    this.likeButton = new Button(
      page,
      page.locator(this.getByDataTestStartsWith("transaction-like-button"))
    );
    this.likeAmountLocator = page.locator(this.getByDataTestStartsWith("transaction-like-count"));
    this.commentInput = new Input(page, page.getByPlaceholder("Write a comment..."));
    this.commentsLocator = page.locator(this.getByDataTestStartsWith("comment-list-item"));
  }

  public async clickLike(): Promise<void> {
    await test.step(`Click on the like button`, async () => {
      await this.likeButton.click();
    });
  }

  public async sendComment(comment: string): Promise<void> {
    await test.step(`Send a new comment with: ${comment}`, async () => {
      await this.commentInput.clearFillAndSubmit(comment);
    });
  }

  public async getAmountOfLikes(): Promise<string> {
    return await this.likeAmountLocator.innerText();
  }

  public async verifySenderFullnameIsEqualTo(user: TestUserData): Promise<void> {
    const fullname = user.getFirstName() + " " + user.getLastName();
    await test.step(`The sender fullname is equal to : ${fullname}`, async () => {
      await expect(this.transactionSenderLocator).toHaveText(fullname);
    });
  }

  public async verifyActionIsEqualTo(transactionType: TransactionType): Promise<void> {
    await test.step(`The transaction type is equal to : ${transactionType}`, async () => {
      await expect(this.transactionActionLocator).toHaveText(transactionType);
    });
  }

  public async verifyRecieverFullnameIsEqualTo(user: string): Promise<void> {
    await test.step(`The reciever fullname is equal to : ${user}`, async () => {
      await expect(this.transactionRecieverLocator).toHaveText(user);
    });
  }

  public async verifyNoteIsEqualTo(note: string): Promise<void> {
    await test.step(`The transaction note is equal to : ${note}`, async () => {
      await expect(this.transactionNoteLocator).toHaveText(note);
    });
  }

  public async verifyLikeAmountIsEqualTo(beforeLikeButton: string): Promise<void> {
    const afterLikeButton = Number(beforeLikeButton) + 1;
    await test.step(`The like amount is equal to : ${afterLikeButton}`, async () => {
      await expect(this.likeAmountLocator).toHaveText(afterLikeButton.toString());
    });
  }

  public async verifyTransactionAmountIsEqualTo(transaction: NewTransactionData): Promise<void> {
    const sign = transaction.getTransactionType() === TransactionType.PAY ? "-" : "+";
    const amount = `${sign}$${transaction.getAmount()}.00`;
    await test.step(`The transaction amount is equal to : ${amount}`, async () => {
      await expect(this.transactionAmountLocator).toHaveText(amount);
    });
  }

  public async verifyCommentEqualsTo(comment: string) {
    await test.step(`The comment equalsTo : ${comment}`, async () => {
      await expect(this.commentsLocator).toHaveText(comment);
    });
  }
}
