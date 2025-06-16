import Component from "@playwright-component/common/component";

export default class Input extends Component {
  public async clearAndFill(text: string | number): Promise<void> {
    await this.clear();
    await this.root.fill(`${text}`);
  }

  public async clearFillAndSubmit(text: string | number): Promise<void> {
    await this.clearAndFill(text);
    await this.pressEnter();
  }

  public async pressEnter(): Promise<void> {
    await this.root.press("Enter");
  }

  public async clear(): Promise<void> {
    await this.root.clear();
  }
}
