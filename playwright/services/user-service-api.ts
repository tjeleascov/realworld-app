import { APIRequestContext } from "@playwright/test";
import { UrlEndpoints } from "@test-data/enums";

export class UserService {
  constructor(private apiContext: APIRequestContext) {}

  public async getUsers() {
    const response = await this.apiContext.get(UrlEndpoints.USERS);
    return response.json();
  }

  public async getUserByUsername(username: string) {
    const response = await this.apiContext.get(UrlEndpoints.USERS_BY_ID + username);
    return response.json();
  }
}
