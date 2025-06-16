import { Strings } from "@test-data/enums";

export default class BankAccountsPage {
  private get createButton() {
    return cy.getBySel("bankaccount-new");
  }

  private get lastBankAccountLocator() {
    return cy.getBySelLike("bankaccount-list-item").last().find("p");
  }

  private get lastDeleteBankAccountButton() {
    return cy.getBySelLike("bankaccount-list-item").last().find("button");
  }

  deleteLastAccountFromTheList() {
    this.lastBankAccountLocator.invoke("text").then((text) => {
      if (text.includes(Strings.DELETED)) {
        throw new Error(`The last bank account is already deleted!`);
      } else {
        this.lastDeleteBankAccountButton.click();
      }
    });
  }

  clickCreate() {
    this.createButton.click({ force: true });
  }

  verifyThatBankAccountIsDisplayed(bankName: string) {
    this.lastBankAccountLocator.invoke("text").then((text) => {
      expect(text.trim()).to.equal(bankName);
    });
  }

  verifyThatBankAccountIsDeleted(bankName: string) {
    const deletedBankText = `${bankName} ${Strings.DELETED}`;
    this.lastBankAccountLocator.invoke("text").then((text) => {
      expect(text.trim()).to.equal(deletedBankText);
    });
  }

  verifyThatBankAccountButtonIsHidden() {
    this.lastDeleteBankAccountButton.should("not.exist");
  }
}
