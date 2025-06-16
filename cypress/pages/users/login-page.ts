import TestUserData from "@test-data/data/test-user-data";

export default class LoginPage {
  private get usernameInput() {
    return cy.getBySel("signin-username");
  }

  private get passwordInput() {
    return cy.getBySel("signin-password");
  }

  private get loginButton() {
    return cy.getBySel("signin-submit");
  }

  private get signUpButton() {
    return cy.contains("Don't have an account? Sign Up");
  }

  loginAsUser(user: TestUserData) {
    this.fillUsername(user.getUserName());
    this.fillPassword(user.getPassword());
    this.clickLogin();
  }

  fillUsername(username: string) {
    this.usernameInput.clear().type(username);
  }

  fillPassword(password: string) {
    this.passwordInput.clear().type(password);
  }

  clickLogin() {
    this.loginButton.click();
  }

  clickSignUp() {
    this.signUpButton.click();
  }
}
