import { test } from "@playwright-shared/fixstures";
import TestUserDataBuilder from "data/builder/test-user-builder";

test.describe("Update user", () => {
  const loginUser = TestUserDataBuilder.existingLoginUser().build();

  test.beforeEach(async ({ pages }) => {
    await pages.login.open();
    await pages.login.loginAsUser(loginUser);
  });

  test.afterEach(async ({ pages }) => {
    await pages.myAccount.fillFirstName(loginUser.getFirstName());
    await pages.myAccount.fillLastName(loginUser.getLastName());
    await pages.myAccount.clickSave();
  });

  test("Update existing user", async ({ pages }) => {
    const updatedUser = TestUserDataBuilder.newUser().build();

    await pages.home.leftSideMenu.clickMyAccount();
    await pages.myAccount.updateUserDataAndSaveChanges(updatedUser);
    await pages.myAccount.leftSideMenu.verifyFullNameEqualsTo(updatedUser);
  });
});
