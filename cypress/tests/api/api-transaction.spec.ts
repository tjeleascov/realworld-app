import TestUserDataBuilder from "@test-data/builder/test-user-builder";
import NewTransactionData from "@test-data/data/new-transaction-data";
import { Strings, TransactionType, UrlEndpoints } from "@test-data/enums";

describe("Transaction tests", () => {
  beforeEach(function () {
    const user = TestUserDataBuilder.existingLoginUser().build();
    let newTransactionData = new NewTransactionData(TransactionType.PAY);
    return cy.loginByApi(user.getUserName(), user.getPassword()).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);

      return cy
        .request({
          method: "GET",
          url: `${Cypress.env("apiUrl")}${UrlEndpoints.USERS}`,
        })
        .then((userResponse) => {
          const receiverId = userResponse.body.results[0].id;

          return cy
            .request({
              method: "POST",
              url: `${Cypress.env("apiUrl")}${UrlEndpoints.TRANSACTIONS}`,
              body: {
                transactionType: newTransactionData.getApiTransactionType(),
                receiverId: receiverId,
                description: newTransactionData.getNote(),
                amount: newTransactionData.getApiAmount(),
              },
            })
            .then((transactionResponse) => {
              expect(transactionResponse.status).to.equal(200);
              const transactionId = transactionResponse.body.transaction.id;
              cy.wrap(transactionId).as("transactionId");
            });
        });
    });
  });

  it("Create a comment for transaction", function () {
    cy.get("@transactionId").then((transactionId) => {
      cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}${UrlEndpoints.COMMENTS}${transactionId}`,
        body: {
          content: Strings.COMMENT,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.equal("OK");
      });

      cy.request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}${UrlEndpoints.COMMENTS}${transactionId}`,
      }).then((response) => {
        expect(response.body.comments[0].content).to.equal(Strings.COMMENT);
      });
    });
  });
});
