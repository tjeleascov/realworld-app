import TestUserData from "data/data/test-user-data";

export default class TestUserDataBuilder {
  private testUserData: TestUserData;

  private constructor() {
    this.testUserData = new TestUserData();
  }

  public static existingLoginUser(): TestUserDataBuilder {
    const builder = new TestUserDataBuilder();
    builder.testUserData
      .setUserName("Katharina_Bernier")
      .setPassword("s3cret")
      .setFirstName("Edgar")
      .setLastName("Johns");
    return builder;
  }

  public static newUser(): TestUserDataBuilder {
    const builder = new TestUserDataBuilder();
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

  public withEmail(email: string): this {
    this.testUserData.setEmail(email);
    return this;
  }

  public withPhoneNumber(phoneNumber: string): this {
    this.testUserData.setPhoneNumber(phoneNumber);
    return this;
  }

  public build(): TestUserData {
    return this.testUserData;
  }
}
