const { test, expect } = require("@playwright/test");

const opennessAnswers = {
  authority: 5,
  pluralism: 5,
  ritual: 5,
  mysticism: 5,
  inclusion: 5,
  mission: 5,
  structure: 5,
  scripture: 5,
  embodiment: 5,
  justice: 5,
  publicExpression: 3,
  connectionSetting: 3,
  transformation: 4,
  discipline: 5
};

const traditionAnswers = {
  authority: 1,
  pluralism: 1,
  ritual: 1,
  mysticism: 1,
  inclusion: 1,
  mission: 1,
  structure: 1,
  scripture: 1,
  embodiment: 1,
  justice: 1,
  publicExpression: 2,
  connectionSetting: 5,
  transformation: 1,
  discipline: 1
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows validation when questions are incomplete", async ({ page }) => {
  let dialogMessage = "";
  page.once("dialog", async (dialog) => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });

  await page.locator('#assessment-form button[type="submit"]').click();

  expect(dialogMessage).toContain("Please answer every question");
});

test("high-openness profile surfaces non-creedal and unaffiliated options", async ({ page }) => {
  await setAnswers(page, opennessAnswers, ["womenLeadership", "lgbtqAffirming"], "Open, inclusive, low-certainty test run.");
  await submitForm(page);

  const topNames = await page.locator(".result-card h3").allInnerTexts();

  expect(topNames.slice(0, 3)).toEqual(expect.arrayContaining([
    "Atheist / Secular Humanist",
    "Unitarian Universalism"
  ]));
  await expect(page.locator(".result-card")).toHaveCount(3);
});

test("historic-structure profile prioritizes Eastern Orthodox", async ({ page }) => {
  await setAnswers(page, traditionAnswers, [], "Historic continuity test run.");
  await submitForm(page);

  await expect(page.locator(".result-card").first().locator("h3")).toHaveText("Eastern Orthodox");
});

test("preset buttons load a persona into the form", async ({ page }) => {
  await page.getByRole("button", { name: /Load preset: Rebuilding With Openness/i }).click();

  await expect(page.locator("#preset-feedback")).toContainText("Rebuilding With Openness");
  await expect(page.locator('input[name="authority"][value="5"]')).toBeChecked();
  await expect(page.locator('input[name="lgbtqAffirming"]')).toBeChecked();
});

test("reset clears results and selections", async ({ page }) => {
  await setAnswers(page, opennessAnswers, ["womenLeadership"], "Reset verification.");
  await submitForm(page);

  await page.getByRole("button", { name: "Reset", exact: true }).click();

  await expect(page.locator("#results-panel")).toBeHidden();
  await expect(page.locator('input[type="radio"]:checked')).toHaveCount(0);
});

test("share flow appends an anonymized result set", async ({ page }) => {
  await setAnswers(page, opennessAnswers, ["womenLeadership", "lgbtqAffirming"], "Community share verification.");
  await submitForm(page);

  await page.locator("#share-consent").check();
  await page.locator("#share-recent-religion").fill("Former Latter-day Saint");
  await page.locator("#share-gender").fill("Woman");
  await page.locator("#share-age").fill("34");
  await page.locator("#share-race").fill("White");
  await page.locator("#share-city").fill("Boise");
  await page.locator("#share-state-province").fill("Idaho");
  await page.locator("#share-country").fill("United States");
  await page.locator("#share-submit").click();

  await expect(page.locator("#share-status")).toContainText("appended as a new line");
});

test("dashboard page loads as a separate route", async ({ page }) => {
  await page.goto("/dashboard.html");

  await expect(page.getByRole("heading", { name: "Shared responses on a global map." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to assessment" })).toBeVisible();
  await expect(page.locator("#filter-recent-religion")).toBeVisible();
  await expect(page.locator("#filter-gender")).toBeVisible();
  await expect(page.locator("#filter-age-range")).toBeVisible();
});

async function submitForm(page) {
  await page.locator("#assessment-form").evaluate((form) => {
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
}

async function setAnswers(page, answers, activeFilters, reflection) {
  await page.evaluate(({ answers, activeFilters, reflection }) => {
    for (const [name, value] of Object.entries(answers)) {
      const input = document.querySelector(`input[name="${name}"][value="${value}"]`);
      input.checked = true;
    }

    for (const name of activeFilters) {
      const checkbox = document.querySelector(`input[name="${name}"]`);
      checkbox.checked = true;
    }

    const textarea = document.querySelector("#reflection-notes");
    textarea.value = reflection;
  }, { answers, activeFilters, reflection });
}