import TestUserData from "@test-data/data/test-user-data";

export default class SignupPage {
  private get firstNameInput() {
    return cy.getById("firstName");
  }

  private get lastNameInput() {
    return cy.getById("lastName");
  }

  private get usernameInput() {
    return cy.getById("username");
  }

  private get passwordInput() {
    return cy.getById("password");
  }

  private get confirmPasswordInput() {
    return cy.getById("confirmPassword");
  }

  private get signUpButton() {
    return cy.getBySel("signup-submit");
  }

  signUpAsUser(newUser: TestUserData) {
    this.fillFirstName(newUser.getFirstName());
    this.fillLastName(newUser.getLastName());
    this.fillUsername(newUser.getUserName());
    this.fillPassword(newUser.getPassword());
    this.fillConfirmPassword(newUser.getPassword());
    this.clickSignUpButton();
  }

  fillFirstName(firstName: string) {
    this.firstNameInput.clear().type(firstName);
  }

  fillLastName(lastName: string) {
    this.lastNameInput.clear().type(lastName);
  }

  fillUsername(username: string) {
    this.usernameInput.clear().type(username);
  }

  fillPassword(password: string) {
    this.passwordInput.clear().type(password);
  }

  fillConfirmPassword(password: string) {
    this.confirmPasswordInput.clear().type(password);
  }

  clickSignUpButton() {
    this.signUpButton.click();
  }
}
