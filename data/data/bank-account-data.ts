import faker from "@faker-js/faker";

export default class BankAccountData {
  private bankName!: string;
  private routingNumber!: string;
  private accountNumber!: string;

    public constructor() {
        this.setBankName(faker.company.companyName());
        this.setRoutingNumber(faker.finance.routingNumber())
        this.setAccountNumber(faker.finance.routingNumber())
    }

  public setBankName(bankName: string): this {
    this.bankName = bankName;
    return this;
  }

  public getBankName(): string {
    return this.bankName;
  }

  public setRoutingNumber(routingNumber: string): this {
    this.routingNumber = routingNumber;
    return this;
  }

  public getRoutingNumber(): string {
    return this.routingNumber;
  }

  public setAccountNumber(accountNumber: string): this {
    this.accountNumber = accountNumber;
    return this;
  }

  public getAccountNumber(): string {
    return this.accountNumber;
  }
}
