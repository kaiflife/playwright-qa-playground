import { expect, Locator, Page } from "@playwright/test";

export class LoginEduTBankPage {
  private page: Page;
  private readonly loginUrl: string;
  private readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL ?? "";
    this.loginUrl = process.env.LOGIN_URL ?? "";

    if (!this.baseUrl || !this.loginUrl) {
      throw new Error("Критические переменные окружения не заданы!");
    }
  }

  private get personalPageLink(): Locator {
    return this.page.locator("a").filter({ hasText: /^Личный кабинет$/ });
  }

  private get emailInput(): Locator {
    return this.page.locator(
      '[test-automation-id="7360bacc-2a7b-11ee-be56-0242ac120002"]',
    );
  }

  private get passwordInput(): Locator {
    return this.page.locator(
      '[test-automation-id="751aac4e-9b40-4667-91ab-8b73a9bbbbf7"]',
    );
  }

  private get continueEmailButton(): Locator {
    return this.page
      .locator('[test-automation-id="7423e08e-2241-11ee-be56-0242ac120002"]')
      .locator("visible=true");
  }

  private get loginSubmitButton(): Locator {
    return this.page
      .locator('[test-automation-id="75a541cc-dec6-4fa1-bd84-092e21440f9c"]')
      .locator("visible=true");
  }

  private get loginSubmitButtonLoading(): Locator {
    return this.page
      .locator(
        '[test-automation-id="75a541cc-dec6-4fa1-bd84-092e21440f9c"][class*="_loading"]',
      )
      .locator("visible=true");
  }

  private get defaultProfileIcon(): Locator {
    return this.page.locator(".user-default-icon").locator("visible=true");
  }

  async navigate() {
    await this.page.goto("/");
    await expect(this.page).toHaveURL(this.baseUrl);
    await expect(this.personalPageLink).toBeVisible();
  }

  async clickPersonalPage() {
    const pagePromise = this.page.context().waitForEvent("page");

    await this.personalPageLink.click();

    this.page = await pagePromise;

    await expect(this.continueEmailButton).toBeVisible();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickContinueEmail() {
    await this.continueEmailButton.click();
  }

  async clickLogin() {
    await this.loginSubmitButton.click();

    await expect(this.loginSubmitButtonLoading).toBeHidden();

    await this.page.waitForURL(new RegExp(`${this.loginUrl}/my-study`), {
      waitUntil: "domcontentloaded",
    });
  }

  async successLogin(email: string, password: string) {
    await this.clickPersonalPage();
    await this.fillEmail(email);
    await this.clickContinueEmail();
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
