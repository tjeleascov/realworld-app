import TestUserDataBuilder from "@test-data/builder/test-user-builder";
import { pages } from "@cypress-pages/pages";

describe("Update user", () => {
  beforeEach(() => {
    cy.loginWithExistingUser();
  });

  afterEach(() => {
    const basicUser = TestUserDataBuilder.existingLoginUser().build();
    pages.myAccount.fillFirstName(basicUser.getFirstName());
    pages.myAccount.fillLastName(basicUser.getLastName());
    pages.myAccount.clickSave();
  });

  it("Update existing user", function () {
    const updatedUser = TestUserDataBuilder.newUser().build();

    pages.leftSideMenu.clickMyAccount();
    pages.myAccount.updateUserDataAndSaveChanges(updatedUser);
    pages.leftSideMenu.verifyFullNameEqualsTo(updatedUser);
  });
});
