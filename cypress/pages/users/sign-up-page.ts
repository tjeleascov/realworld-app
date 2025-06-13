import TestUserData from "@test-data/data/test-user-data";

export default class SignupPage {
  get firstNameInput() {
    return cy.getById("firstName");
  }

  get lastNameInput() {
    return cy.getById("lastName");
  }

  get usernameInput() {
    return cy.getById("username");
  }

  get passwordInput() {
    return cy.getById("password");
  }

  get confirmPasswordInput() {
    return cy.getById("confirmPassword");
  }

  get signUpButton() {
    return cy.getBySel("signup-submit");
  }

  signUpAsUser(newUser: TestUserData) {
    this.firstNameInput.type(newUser.getFirstName());
    this.lastNameInput.type(newUser.getLastName());
    this.usernameInput.type(newUser.getUserName());
    this.passwordInput.type(newUser.getPassword());
    this.confirmPasswordInput.type(newUser.getPassword());
    this.signUpButton.click();
  }
}
