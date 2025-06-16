export default class TopSideMenu {
  private get newTransactionButton() {
    return cy.getBySel("nav-top-new-transaction");
  }
  private get notificcationsButton() {
    return cy.getBySel("nav-top-new-transaction");
  }

  clickNewTransaction() {
    this.newTransactionButton.click();
  }

  clickNotification() {
    this.notificcationsButton.click();
  }
}
