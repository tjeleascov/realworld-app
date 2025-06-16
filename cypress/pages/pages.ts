import LoginPage from "@cypress-pages/users/login-page";
import BankAccountsPage from "@cypress-pages/bank/bank-accounts-page";
import HomePage from "@cypress-pages/transaction/home-page";
import LeftSideMenu from "@cypress-pages/menu/left-side-menu";
import MyAccountPage from "@cypress-pages/users/my-account-page";
import NewBankAccountPage from "@cypress-pages/bank/new-bank-account-page";
import NewTransactionPage from "@cypress-pages/transaction/new-transaction-page";
import SignupPage from "@cypress-pages/users/sign-up-page";
import TopSideMenu from "@cypress-pages/menu/top-side-menu";
import TransactionDetailPage from "@cypress-pages/transaction/transaction-details-page";

export class Pages {
  login: LoginPage;
  signup: SignupPage;
  leftSideMenu: LeftSideMenu;
  bankAccounts: BankAccountsPage;
  newBankAccount: NewBankAccountPage;
  home: HomePage;
  transactionDetail: TransactionDetailPage;
  newTransaction: NewTransactionPage;
  topSideMenu: TopSideMenu;
  myAccount: MyAccountPage;

  constructor() {
    this.login = new LoginPage();
    this.leftSideMenu = new LeftSideMenu();
    this.signup = new SignupPage();
    this.bankAccounts = new BankAccountsPage();
    this.newBankAccount = new NewBankAccountPage();
    this.home = new HomePage();
    this.transactionDetail = new TransactionDetailPage();
    this.newTransaction = new NewTransactionPage();
    this.topSideMenu = new TopSideMenu();
    this.myAccount = new MyAccountPage();
  }
}

export const pages = new Pages();
