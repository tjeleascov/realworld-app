import TestUserData from "@test-data/data/test-user-data";

export default class MyAccountPage {
  get firstNameInput() {
    return cy.getBySel("user-settings-firstName-input");
  }

  get lastNameInput() {
    return cy.getBySel("user-settings-lastName-input");
  }

  get emailInput() {
    return cy.getBySel("user-settings-email-input");
  }

  get phoneInput() {
    return cy.getBySel("user-settings-phoneNumber-input");
  }

  get saveButton() {
    return cy.getBySel("user-settings-submit");
  }

  fillFirstName(firstName: string) {
    this.firstNameInput.clear().type(firstName);
  }

  fillLastName(lastName: string) {
    this.lastNameInput.clear().type(lastName);
  }

  fillEmail(email: string) {
    this.emailInput.clear().type(email);
  }

  fillPhone(phone: string) {
    this.phoneInput.clear().type(phone);
  }

  clickSave() {
    this.saveButton.click();
  }

  updateUserDataAndSaveChanges(updatedUser: TestUserData) {
    cy.log(`Update the user information with: ${JSON.stringify(updatedUser)}`);

    this.fillFirstName(updatedUser.getFirstName());
    this.fillLastName(updatedUser.getLastName());
    this.fillEmail(updatedUser.getEmail());
    this.fillPhone(updatedUser.getPhoneNumber());
    this.clickSave();
  }
}
