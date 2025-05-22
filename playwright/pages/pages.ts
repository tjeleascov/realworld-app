import type { Page } from "@playwright/test";

import LoginPage from "@pages/authorize/login-page";
import SignupPage from "@pages/authorize/signup-page";
import HomePage from "@pages/dashboard/home-page";

export default class Pages {
  public login: LoginPage;
  public signup: SignupPage;
  public home: HomePage;

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.signup = new SignupPage(page);
    this.home = new HomePage(page);
  }
}
