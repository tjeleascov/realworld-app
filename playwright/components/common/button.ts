import Component from "@playwright-component/common/component";

export default class Button extends Component {
  public async click(): Promise<void> {
    await super.click();
  }
}
