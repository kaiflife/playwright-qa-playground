import { ButtonsPage } from "@/pages";
import { test, expect } from "@playwright/test";

test.describe("Тестирование кнопок", () => {
  let buttonsPage: ButtonsPage;
  let baseUrl: string;

  test.beforeEach(async ({ page }) => {
    buttonsPage = new ButtonsPage(page);
    baseUrl = process.env.BASE_URL ?? "";

    if (!baseUrl) {
      throw new Error("Переменная BASE_URL не задана в окружении!");
    }

    await buttonsPage.navigate();
  });

  test("Click go home button", async ({ page }) => {
    await buttonsPage.clickGoHome();

    await expect(page).toHaveURL(baseUrl);
  });
});
