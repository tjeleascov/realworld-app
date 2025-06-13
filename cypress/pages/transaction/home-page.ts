export default class HomePage {
  get everyoneButton() {
    return cy.getBySel("nav-public-tab");
  }

  get friendsButton() {
    return cy.getBySel("nav-contacts-tab");
  }

  get mineButton() {
    return cy.getBySel("nav-personal-tab");
  }

  get firstTransactionButton() {
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
