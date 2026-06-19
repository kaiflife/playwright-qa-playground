import { test, expect } from "@playwright/test";

test("Input fields Section One", async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/input-fields");
  const sectionOneText = " my text ";

  const input = page.getByTestId("input-movie-name");
  await input.waitFor({ state: "visible" });
  await input.click();

  await page.keyboard.press("End");
  await page.keyboard.type(sectionOneText);

  await expect(input).toHaveValue(sectionOneText);
});

test("Input fields Section Two", async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/input-fields");
  const restInputText = " and you too!";

  const input = page.getByTestId("input-append-text");

  await input.click();
  await page.keyboard.type(restInputText);
  await page.keyboard.press("Tab");

  await expect(input).toHaveValue(`I am good${restInputText}`);
  await expect(input).not.toBeFocused();
});

test("Input fields Section Three", async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/input-fields");

  const input = page.getByTestId("input-verify-text");
  await input.waitFor({ state: "visible" });

  await expect(input).toHaveValue("QA PlayGround");
});

test("Input fields Section Four", async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/input-fields");

  const input = page.getByTestId("input-clear-text");
  await input.clear();

  await expect(input).toHaveValue("");
});

test("Input fields Section Five", async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/input-fields");

  const input = page.getByTestId("input-disabled");

  expect(input).toBeDisabled();

  const cursorStyle = await input.evaluate((element) => {
    return window.getComputedStyle(element).cursor;
  });

  await expect(cursorStyle).toBe("not-allowed");
});

test("Input fields Section Six", async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/input-fields");

  const input = page.getByTestId("input-readonly");
  await input.click();
  await page.keyboard.type("This text is changed");

  await expect(input).toHaveValue("This text is readonly");
});
