import faker from "@faker-js/faker";

export default class TestUserData {
    private firstName!: string;
    private lastName!: string;
    private password!: string;
    private userName!: string;
    private email!: string;
    private phoneNumber!: string;

    public constructor () {
        this.setFirstName(faker.name.firstName());
        this.setLastName(faker.name.lastName());
        this.setPassword(faker.internet.password());
        this.setUserName(faker.internet.userName());
        this.setEmail(faker.internet.email());
        this.setPhoneNumber(faker.phone.phoneNumberFormat());
    }

    public setFirstName(firstName: string): this {
        this.firstName = firstName;
        return this;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setLastName(lastName: string): this {
        this.lastName = lastName;
        return this;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setPassword(password: string): this {
        this.password = password;
        return this;
    }

    public getPassword(): string {
        return this.password;
    }

    public setUserName(userName: string): this {
        this.userName = userName;
        return this;
    }

    public getUserName(): string {
        return this.userName;
    }
    
    public setEmail(email: string): this {
        this.email = email;
        return this;
    }

    public getEmail(): string {
        return this.email;
    }

    public setPhoneNumber(phoneNumber: string): this {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }
}
