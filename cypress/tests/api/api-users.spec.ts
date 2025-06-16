import TestUserDataBuilder from "@test-data/builder/test-user-builder";
import { UrlEndpoints } from "@test-data/enums";

describe("Users API Tests", () => {
  beforeEach(function () {
    const user = TestUserDataBuilder.existingLoginUser().build();
    cy.loginByApi(user.getUserName(), user.getPassword()).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Get list of users", function () {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}${UrlEndpoints.USERS}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.be.an("array");
      for (const user of response.body.results) {
        expect(user).to.have.property("username");
        expect(user).to.have.property("password");
      }
    });
  });

  it("Get a user profile by username", function () {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}${UrlEndpoints.USERS}`,
    }).then((response) => {
      const username = response.body.results[0].username;
      const firstName = response.body.results[0].firstName;
      const lastName = response.body.results[0].lastName;

      cy.request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}${UrlEndpoints.USERS_BY_ID}${username}`,
      }).then((response) => {
        expect(response.body.user.firstName).to.equal(firstName);
        expect(response.body.user.lastName).to.equal(lastName);
      });
    });
  });
});
