import { test } from "@shared/fixstures";
import TestUserDataBuilder from "@test-data/builder/test-user-builder";

test.describe("Login tests", () => {
  test("login with valid user", async ({ pages }) => {
    const validUser = TestUserDataBuilder.existingLoginUser().build();

    await pages.login.open();
    await pages.login.loginAsUser(validUser);
    await pages.home.leftSideMenu.verifyUsernameEqualsTo(validUser.getUserName());
  });
});
