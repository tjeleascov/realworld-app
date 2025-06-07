import { APIRequestContext } from "@playwright/test";
import NewTransactionData from "@test-data/data/new-transaction-data";
import { UrlEndpoints } from "@test-data/enums";

export class TransactionService {
  constructor(private apiContext: APIRequestContext) {}

  public async getAllTransactions() {
    const response = await this.apiContext.get(UrlEndpoints.TRANSACTIONS);
    return response.json();
  }

  public async createACommentForTransaction(transactionId: string, comment: string) {
    const response = await this.apiContext.post(UrlEndpoints.COMMENTS + transactionId, {
      data: {
        content: comment,
      },
    });
    return response.text();
  }

  public async createTransaction(transaction: NewTransactionData, recieverId: string) {
    const response = await this.apiContext.post(UrlEndpoints.TRANSACTIONS, {
      data: {
        transactionType: transaction.getApiTransactionType(),
        receiverId: recieverId,
        description: transaction.getNote(),
        amount: transaction.getApiAmount(),
      },
    });
    return response.json();
  }

  public async getAllCommentsForTransaction(transactionId: string) {
    const response = await this.apiContext.get(UrlEndpoints.COMMENTS + transactionId);
    return response.json();
  }
}
