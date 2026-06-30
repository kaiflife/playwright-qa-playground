import { InputFieldsPage } from "@/pages";
import { test, expect } from "@playwright/test";

test.describe("Тестирование полей ввода", () => {
  let inputPage: InputFieldsPage;

  test.beforeEach(async ({ page }) => {
    inputPage = new InputFieldsPage(page);
    await inputPage.navigate();
  });

  test("Input fields Section One", async () => {
    const textToAppend = " my text ";

    await inputPage.appendTextToMovieInput(textToAppend);
    await expect(inputPage.movieInput).toHaveValue(textToAppend);
  });

  test("Input fields Section Two", async () => {
    const restInputText = " and you too!";

    await inputPage.appendTextAndTab(restInputText);

    await expect(inputPage.appendInput).toHaveValue(
      `I am good${restInputText}`,
    );
    await expect(inputPage.appendInput).not.toBeFocused();
  });

  test("Input fields Section Three", async () => {
    await inputPage.verifyInput.waitFor({ state: "visible" });
    await expect(inputPage.verifyInput).toHaveValue("QA PlayGround");
  });

  test("Input fields Section Four", async () => {
    await inputPage.clearInputFields();
    await expect(inputPage.clearInput).toHaveValue("");
  });

  test("Input fields Section Five", async () => {
    await expect(inputPage.disabledInput).toBeDisabled();
    await inputPage.expectInputToHaveCursorStyle(
      inputPage.disabledInput,
      "not-allowed",
    );
  });

  test("Input fields Section Six", async () => {
    await inputPage.typeIntoReadonlyInput("This text is changed");
    await expect(inputPage.readonlyInput).toHaveValue("This text is readonly");
  });
});
