import { LoginEduTBankPage } from "@/pages";
import { test, expect } from "@playwright/test";

test.describe("Тестирование входа в тбанк образование", () => {
  let loginEduTbank: LoginEduTBankPage;

  test.beforeEach(async ({ page }) => {
    loginEduTbank = new LoginEduTBankPage(page);

    await loginEduTbank.navigate();
  });

  test("Success login edu tbank", async () => {
    const email = process.env.USER_EMAIL ?? "";
    const password = process.env.USER_PASSWORD ?? "";

    if (!email) {
      throw new Error("Переменная email не задана в окружении!");
    }

    if (!password) {
      throw new Error("Переменная password не задана в окружении!");
    }

    await loginEduTbank.successLogin(email, password);
  });
});
