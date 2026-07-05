import { expect, Locator, Page } from "@playwright/test";

export class LoginEduTBankPage {
  private readonly page: Page;
  private readonly email: string;
  private readonly password: string;
  private readonly loginUrl: string;
  private readonly baseUrl: string;

  public readonly loginButton: Locator;

  constructor(page: Page, role: string) {
    this.loginUrl = process.env.LOGIN_URL ?? "";
    this.baseUrl = process.env.BASE_URL ?? "";

    if (!this.baseUrl) {
      throw new Error("Переменная BASE_URL не задана в окружении!");
    }

    if (!this.loginUrl) {
      throw new Error("Переменная LOGIN_URL не задана в окружении!");
    }

    const isUser = role === "user";

    this.email = isUser ? (process.env.USER_EMAIL ?? "") : "";
    this.password = isUser ? (process.env.USER_PASSWORD ?? "") : "";

    this.page = page;

    this.loginButton = page.getByText("Личный кабинет");
  }

  async navigate() {
    await this.page.goto("/");
    await expect(this.page).toHaveURL(this.baseUrl);
  }

  async clickLogin() {
    await this.loginButton.click();
    await expect(this.page).toHaveURL(`${this.loginUrl}/sign-in`);
  }

  async successLogin() {
    const emailInput = await this.page.locator(
      '[test-automation-id="7360bacc-2a7b-11ee-be56-0242ac120002"]',
    );
    await emailInput.fill(this.email);

    const passwordInput = await this.page.locator(
      '[test-automation-id="751aac4e-9b40-4667-91ab-8b73a9bbbbf7"]',
    );
    await passwordInput.fill(this.password);

    await this.clickLogin();
  }
}
