import { Locator, Page } from "@playwright/test";

export class ButtonsPage {
  private readonly page: Page;

  public readonly goHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.goHomeButton = page.getByTestId("btn-goto-home");
  }

  async navigate() {
    await this.page.goto("/practice/buttons");
  }

  async clickGoHome() {
    await this.goHomeButton.click();
  }
}
