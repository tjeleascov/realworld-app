import TestUserDataBuilder from "@test-data/builder/test-user-builder";
import { pages } from "@cypress-pages/pages";

describe("Authorize spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Login with valid existing user", function () {
    let loginUser = TestUserDataBuilder.existingLoginUser().build();

    pages.login.loginAsUser(loginUser);
    pages.leftSideMenu.verifyFullNameEqualsTo(loginUser);
    pages.leftSideMenu.verifyUsernameEqualsTo(loginUser.getUserName());
    pages.leftSideMenu.verifyUserBalanceIsVisbile();
  });

  it("Signup with new valid user", function () {
    let newUser = TestUserDataBuilder.newUser().build();
    pages.login.clickSignUp();

    pages.signup.signUpAsUser(newUser);
    pages.login.loginAsUser(newUser);
    pages.leftSideMenu.verifyFullNameEqualsTo(newUser);
    pages.leftSideMenu.verifyUsernameEqualsTo(newUser.getUserName());
    pages.leftSideMenu.verifyUserBalanceIsVisbile();
  });
});
