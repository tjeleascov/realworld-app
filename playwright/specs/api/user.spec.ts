import { test, expect, APIRequestContext } from "@playwright/test";
import { UserService } from "@services/user-service-api";
import { loggedInUserApiContext } from "@shared/apiUtilities";
import TestUserDataBuilder from "@test-data/builder/test-user-builder";

test.describe("User tests", async () => {
  let apiContext: APIRequestContext;
  let userService: UserService;

  test.beforeAll(async () => {
    const testUser = TestUserDataBuilder.existingLoginUser().build();
    apiContext = await loggedInUserApiContext(testUser);
    userService = new UserService(apiContext);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test("Get list of users", async () => {
    let userBody = await userService.getUsers();

    expect(userBody).toHaveProperty("results");
    for (const user of userBody.results) {
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("password");
    }
  });

  test("Get a user profile by username", async () => {
    const userBody = await userService.getUsers();
    const username = userBody.results[0].username;
    const firstName = userBody.results[0].firstName;
    const lastName = userBody.results[0].lastName;

    const usersProfileResponse = await userService.getUserByUsername(username);
    expect(usersProfileResponse.user.firstName).toEqual(firstName);
    expect(usersProfileResponse.user.lastName).toEqual(lastName);
  });
});
