import TestUserData from "@test-data/data/test-user-data";

export default class LeftSideMenu {
  get homeButton() {
    return cy.getBySel("sidenav-home");
  }

  get myAccountButton() {
    return cy.getBySel("sidenav-user-settings");
  }

  get bankAccountsButton() {
    return cy.getBySel("sidenav-bankaccounts");
  }

  get notificationsButton() {
    return cy.getBySel("sidenav-notifications");
  }

  get logoutButton() {
    return cy.getBySel("sidenav-signout");
  }

  get fullnameLocator() {
    return cy.getBySel("sidenav-user-full-name");
  }

  get usernameLocator() {
    return cy.getBySel("sidenav-username");
  }

  get balanceLocator() {
    return cy.getBySel("sidenav-user-balance");
  }

  clickHome() {
    this.homeButton.click();
  }

  clickMyAccount() {
    this.myAccountButton.click();
  }

  clickBankAccounts() {
    this.bankAccountsButton.click();
  }

  clickNotifications() {
    this.notificationsButton.click();
  }

  clickLogout() {
    this.logoutButton.click();
  }

  verifyUsernameEqualsTo(expectedUsername: string) {
    this.usernameLocator.should("have.text", "@" + expectedUsername);
  }

  verifyFullNameEqualsTo(fullName: TestUserData) {
    const expectedFullName = fullName.getFirstName() + " " + fullName.getLastName().slice(0, 1);
    this.fullnameLocator.should("have.text", expectedFullName);
  }

  verifyUserBalanceIsVisbile() {
    this.balanceLocator.should("be.visible");
  }
}
