import type { Page } from "@playwright/test";

import LoginPage from "@pages/authorize/login-page";
import SignupPage from "@pages/authorize/signup-page";
import HomePage from "@pages/transaction/home-page";
import TransactionDetailPage from "@pages/transaction/transaction-detail-page";
import NewTransactionPage from "@pages/transaction/new-transaction-page";
import MyAccountPage from "@pages/account/my-account-page";
import BankAccountsPage from "@pages/bank-account/bank-accounts-page";
import NewBankAccountPage from "@pages/bank-account/new-bank-account-page";

export default class Pages {
  public login: LoginPage;
  public signup: SignupPage;
  public home: HomePage;
  public transactionDetail: TransactionDetailPage;
  public newTransaction: NewTransactionPage;
  public myAccount: MyAccountPage;
  public bankAccounts: BankAccountsPage;
  public newBankAccount: NewBankAccountPage;

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.signup = new SignupPage(page);
    this.home = new HomePage(page);
    this.transactionDetail = new TransactionDetailPage(page);
    this.newTransaction = new NewTransactionPage(page);
    this.myAccount = new MyAccountPage(page);
    this.bankAccounts = new BankAccountsPage(page);
    this.newBankAccount = new NewBankAccountPage(page);
  }
}
