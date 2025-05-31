import Component from "@component/common/component";

export default class Button extends Component {
  public async click(): Promise<void> {
    await super.click();
    await this.waitForNetworkIdle();
  }

  public async forceClick(): Promise<void> {
    await this.waitForReady();

    await super.waitForNetworkIdle();
    await this.root.click({ force: true });
  }

  public async clickWithoutNetworkIdle(): Promise<void> {
    await this.waitForReady();
    await super.click();
  }
}
