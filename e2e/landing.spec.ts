import { test, expect } from "@playwright/test";

test("homepage has a waitlist button", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/eShaman/);

  // create a locator
  const waitlistButton = page.getByRole("button", {
    name: "Join the Waitlist",
  });

  // Expect an attribute "to be strictly equal" to the value.
  await expect(waitlistButton).toBeVisible();
});
