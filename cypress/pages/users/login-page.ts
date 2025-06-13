import TestUserData from "@test-data/data/test-user-data";

export default class LoginPage {
  get usernameInput() {
    return cy.getBySel("signin-username");
  }

  get passwordInput() {
    return cy.getBySel("signin-password");
  }

  get loginButton() {
    return cy.getBySel("signin-submit");
  }

  get signUpButton() {
    return cy.contains("Don't have an account? Sign Up");
  }

  loginAsUser(user: TestUserData) {
    this.usernameInput.clear().type(user.getUserName());
    this.passwordInput.clear().type(user.getPassword());
    this.loginButton.click();
  }
}
