import { LoginEduTBankPage } from "@/pages";
import { test, expect } from "@playwright/test";

test.describe("Тестирование входа в демо банк", () => {
  let loginEduTbank: LoginEduTBankPage;

  test.beforeEach(async ({ page }) => {
    loginEduTbank = new LoginEduTBankPage(page, "admin");

    await loginEduTbank.navigate();
  });

  test("Success login bank", async ({ page }) => {
    await loginEduTbank.successLogin();
  });
});
