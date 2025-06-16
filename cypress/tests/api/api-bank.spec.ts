import TestUserDataBuilder from "@test-data/builder/test-user-builder";
import BankAccountData from "@test-data/data/bank-account-data";
import { UrlEndpoints } from "@test-data/enums";

describe("Bank Account API Tests", () => {
  let bankAccountId = "";

  beforeEach(function () {
    const user = TestUserDataBuilder.existingLoginUser().build();
    cy.loginByApi(user.getUserName(), user.getPassword()).then((response) => {
      expect(response.status).to.eq(200);
    });
    const bankData = new BankAccountData();
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}${UrlEndpoints.BANK_ACCOUNTS}`,
      body: {
        bankName: bankData.getBankName(),
        accountNumber: bankData.getAccountNumber(),
        routingNumber: bankData.getRoutingNumber(),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      bankAccountId = response.body.account.id;
      console.log(bankAccountId);
    });
  });

  it("should get a list of bank accounts", function () {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}${UrlEndpoints.BANK_ACCOUNTS}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an("array");
      for (const result of response.body.results) {
        expect(result).to.have.property("id");
        expect(result).to.have.property("bankName");
      }
    });
  });

  it("should delete the bank account", function () {
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("apiUrl")}${UrlEndpoints.BANK_ACCOUNTS}${bankAccountId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}${UrlEndpoints.BANK_ACCOUNTS}${bankAccountId}`,
    }).then((response) => {
      expect(response.body.account.isDeleted).to.equal(true);
    });
  });
});
