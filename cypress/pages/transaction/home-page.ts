export default class HomePage {
  private get everyoneButton() {
    return cy.getBySel("nav-public-tab");
  }

  private get friendsButton() {
    return cy.getBySel("nav-contacts-tab");
  }

  private get mineButton() {
    return cy.getBySel("nav-personal-tab");
  }

  private get firstTransactionButton() {
    return cy.getBySelLike("transaction-item").first();
  }

  clickEveryone() {
    this.everyoneButton.click();
  }

  clickFriends() {
    this.friendsButton.click();
  }

  clickMine() {
    this.mineButton.click();
  }

  clickOnFirstTransaction() {
    this.firstTransactionButton.click();
  }

  verifyFirstTransactionIsVisible() {
    this.firstTransactionButton.should("be.visible");
  }
}
