// InputFieldsPage.ts
import { Locator, Page, expect } from "@playwright/test";

export class InputFieldsPage {
  private readonly page: Page;

  // Объявляем локаторы для каждой секции
  public readonly movieInput: Locator;
  public readonly appendInput: Locator;
  public readonly verifyInput: Locator;
  public readonly clearInput: Locator;
  public readonly disabledInput: Locator;
  public readonly readonlyInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Инициализируем локаторы через test-id
    this.movieInput = page.getByTestId("input-movie-name");
    this.appendInput = page.getByTestId("input-append-text");
    this.verifyInput = page.getByTestId("input-verify-text");
    this.clearInput = page.getByTestId("input-clear-text");
    this.disabledInput = page.getByTestId("input-disabled");
    this.readonlyInput = page.getByTestId("input-readonly");
  }

  // Общий метод для открытия страницы
  async navigate() {
    await this.page.goto("/practice/input-fields");
  }

  // Бизнес-действия для тестов
  async appendTextToMovieInput(text: string) {
    await this.movieInput.waitFor({ state: "visible" });
    await this.movieInput.click();
    await this.page.keyboard.press("End");
    await this.page.keyboard.type(text);
  }

  async appendTextAndTab(text: string) {
    await this.appendInput.click();
    await this.page.keyboard.type(text);
    await this.page.keyboard.press("Tab");
  }

  async clearInputFields() {
    await this.clearInput.clear();
  }

  async typeIntoReadonlyInput(text: string) {
    await this.readonlyInput.click();
    await this.page.keyboard.type(text);
  }

  // Кастомная проверка стилей (перенесена из теста в POM)
  async expectInputToHaveCursorStyle(input: Locator, expectedStyle: string) {
    const cursorStyle = await input.evaluate((element) => {
      return window.getComputedStyle(element).cursor;
    });
    expect(cursorStyle).toBe(expectedStyle);
  }
}
