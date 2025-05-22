import TestUserData from "@test-data/data/test-user-data";
import { faker } from "@faker-js/faker";

export default class TestUserDataBuilder {
  private testUserData: TestUserData;

  private constructor() {
    this.testUserData = new TestUserData();
  }

  public static existingLoginUser(): TestUserDataBuilder {
    const builder = new TestUserDataBuilder();
    builder.testUserData.setUserName("Katharina_Bernier").setPassword("s3cret");
    return builder;
  }

  public static invalidLoginUser(): TestUserDataBuilder {
    const builder = new TestUserDataBuilder();
    builder.testUserData.setUserName("nonexistent_user").setPassword("wrong_password");
    return builder;
  }

  public static newSignupUser(): TestUserDataBuilder {
    const builder = new TestUserDataBuilder();
    builder.testUserData
      .setFirstName(faker.name.firstName())
      .setLastName(faker.name.lastName())
      .setUserName(faker.internet.userName())
      .setPassword(faker.internet.password());
    return builder;
  }

  public static newInvalidSignupUser(): TestUserDataBuilder {
    const builder = new TestUserDataBuilder();
    builder.testUserData.setFirstName("").setLastName("").setUserName("x").setPassword("123");
    return builder;
  }

  public withFirstName(firstName: string): this {
    this.testUserData.setFirstName(firstName);
    return this;
  }

  public withLastName(lastName: string): this {
    this.testUserData.setLastName(lastName);
    return this;
  }

  public withUserName(userName: string): this {
    this.testUserData.setUserName(userName);
    return this;
  }

  public withPassword(password: string): this {
    this.testUserData.setPassword(password);
    return this;
  }

  public build(): TestUserData {
    return this.testUserData;
  }
}
