import { APIRequestContext, request as playwrightRequest } from "@playwright/test";
import TestUserData from "@test-data/data/test-user-data";
import { ApiLoginType, UrlEndpoints, UrlLinks } from "@test-data/enums";

export async function getSessionId(user: TestUserData): Promise<string> {
  const requestContext: APIRequestContext = await playwrightRequest.newContext({
    baseURL: UrlLinks.API_BASE_URL,
  });

  const loginResponse = await requestContext.post(UrlEndpoints.LOGIN, {
    data: {
      username: user.getUserName(),
      password: user.getPassword(),
      type: ApiLoginType.LOGIN,
    },
  });

  const cookies = loginResponse.headers()["set-cookie"];
  const sessionId = cookies.split(";")[0];

  await requestContext.dispose();
  return sessionId;
}

export async function loggedInUserApiContext(user: TestUserData): Promise<APIRequestContext> {
  const sessionId = await getSessionId(user);

  return playwrightRequest.newContext({
    baseURL: UrlLinks.API_BASE_URL,
    extraHTTPHeaders: {
      Cookie: sessionId,
    },
  });
}
