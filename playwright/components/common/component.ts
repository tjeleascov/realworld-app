import { Locator, Page } from "@playwright/test";

export default abstract class Component {
  constructor(protected readonly page: Page, protected readonly root: Locator) {}

  public async clickOutside(): Promise<void> {
    await this.page.locator("body").click();
  }

  public getLocator(): Locator {
    return this.root;
  }

  public async hover(): Promise<void> {
    await this.root.hover();
  }

  public async waitForNotVisible(): Promise<void> {
    await this.root.waitFor({ state: "hidden" });
  }

  public async isVisible(): Promise<void> {
    await this.root.isVisible();
  }

  public async isNotVisible(): Promise<boolean> {
    return await this.root.isHidden();
  }

  protected async click(): Promise<void> {
    await this.root.click();
  }

  protected async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  protected async waitForReady(): Promise<void> {
    await this.page.waitForLoadState("load");
    await this.page.waitForLoadState("domcontentloaded");
  }

  protected getValueSelectorByLabel(label: string): string {
    return `[label="${label}"] .value:first-of-type`;
  }

  protected getElementByText(text: string): string {
    return `text=${text}`;
  }

  protected getByDataTest(label: string): string {
    return `[data-test="${label}"]`;
  }
}
