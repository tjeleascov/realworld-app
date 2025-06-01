import { Locator, Page } from "@playwright/test";

export default abstract class Component {
  constructor(protected readonly page: Page, protected readonly root: Locator) {}

  public getLocator(): Locator {
    return this.root;
  }

  public async isVisible(): Promise<void> {
    await this.root.isVisible();
  }

  protected async click(): Promise<void> {
    await this.root.click();
  }

  protected getByDataTest(label: string): string {
    return `[data-test="${label}"]`;
  }
}
