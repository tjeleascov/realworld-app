import { test } from "@playwright-shared/fixstures";
import TestUserDataBuilder from "data/builder/test-user-builder";

test.describe("Authorize tests", () => {
  test("Login with valid existing user", async ({ pages }) => {
    const validUser = TestUserDataBuilder.existingLoginUser().build();
    await pages.login.open();
    await pages.login.loginAsUser(validUser);
    await pages.home.leftSideMenu.verifyUsernameEqualsTo(validUser.getUserName());
    await pages.home.leftSideMenu.verifyFullNameEqualsTo(validUser);
    await pages.home.leftSideMenu.verifyUserBalanceIsVisbile();
  });

  test("Signup with new valid user", async ({ pages }) => {
    const newUser = TestUserDataBuilder.newUser().build();

    await pages.login.open();
    await pages.login.clickSignUp();
    await pages.signup.verifyPageContainsUrl();
    await pages.signup.signUpAsUser(newUser);
    await pages.login.loginAsUser(newUser);
    await pages.home.leftSideMenu.verifyUsernameEqualsTo(newUser.getUserName());
    await pages.home.leftSideMenu.verifyFullNameEqualsTo(newUser);
    await pages.home.leftSideMenu.verifyUserBalanceIsVisbile();
  });
});
