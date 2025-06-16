import TestUserData from "@test-data/data/test-user-data";

export default class MyAccountPage {
  private get firstNameInput() {
    return cy.getBySel("user-settings-firstName-input");
  }

  private get lastNameInput() {
    return cy.getBySel("user-settings-lastName-input");
  }

  private get emailInput() {
    return cy.getBySel("user-settings-email-input");
  }

  private get phoneInput() {
    return cy.getBySel("user-settings-phoneNumber-input");
  }

  private get saveButton() {
    return cy.getBySel("user-settings-submit");
  }

  updateUserDataAndSaveChanges(updatedUser: TestUserData) {
    this.fillFirstName(updatedUser.getFirstName());
    this.fillLastName(updatedUser.getLastName());
    this.fillEmail(updatedUser.getEmail());
    this.fillPhone(updatedUser.getPhoneNumber());
    this.clickSave();
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
}
