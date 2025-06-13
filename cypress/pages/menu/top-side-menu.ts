export default class TopSideMenu {
  get newTransactionButton() {
    return cy.getBySel("nav-top-new-transaction");
  }
  get notificcationsButton() {
    return cy.getBySel("nav-top-new-transaction");
  }

  clickNewTransaction() {
    this.newTransactionButton.click();
  }

  clickNotification() {
    this.notificcationsButton.click();
  }
}
