import BankAccountData from "@test-data/data/bank-account-data";
import { UrlEndpoints } from "@test-data/enums";
import { APIRequestContext } from "playwright/test";

export class BankAccountService {
  constructor(private apiContext: APIRequestContext) {}

  public async createBankAccount(data: BankAccountData) {
    const response = await this.apiContext.post(UrlEndpoints.BANK_ACCOUNTS, {
      data: {
        bankName: data.getBankName(),
        accountNumber: data.getAccountNumber(),
        routingNumber: data.getRoutingNumber(),
      },
    });
    return response.json();
  }

  public async getBankAccounts() {
    const response = await this.apiContext.get(UrlEndpoints.BANK_ACCOUNTS);
    return response.json();
  }

  public async getBankAccountById(id: string) {
    const response = await this.apiContext.get(UrlEndpoints.BANK_ACCOUNTS + id);
    return response.json();
  }

  public async deleteBankAccount(id: string) {
    const response = await this.apiContext.delete(`${UrlEndpoints.BANK_ACCOUNTS}${id}`);
    return response.json();
  }
}
