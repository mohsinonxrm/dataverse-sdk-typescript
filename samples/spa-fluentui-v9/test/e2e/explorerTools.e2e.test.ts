/**
 * The explorer's tools in the browser, in demo mode: the Token tab, the Web API version picker,
 * the table browser and the environment dropdown, each by keyboard where it matters, with axe
 * finding no WCAG A/AA violation and no CSP violation.
 */
import { describe, expect, it } from "vitest";
import type { Locator, Page } from "playwright";
import { axeViolations, editorText, problems, startDemo, useBrowser } from "./browser";

const { open } = useBrowser();

const responseCard = (page: Page) => page.getByRole("region", { name: "Response", exact: true });
const requestCard = (page: Page) => page.getByRole("region", { name: "Request", exact: true });
const responsePanel = (page: Page) => responseCard(page).getByRole("tabpanel");
const code = (page: Page) => editorText(responsePanel(page));
const status = (page: Page) => responseCard(page).getByRole("status");
const runButton = (page: Page) => page.getByRole("button", { name: "Run", exact: true });
const urlField = (page: Page) => page.getByLabel("URL", { exact: true });

/** Waits for the animations in `locator` (a drawer sliding in) to end, so axe sees it settled. */
const settled = (locator: Locator) =>
  locator.evaluate((el) => Promise.all(el.getAnimations({ subtree: true }).map((a) => a.finished)));

async function openExplorer(page: Page): Promise<void> {
  await startDemo(page);
  await page.getByRole("navigation").getByRole("link", { name: "Explorer", exact: true }).click();
  await page.getByRole("heading", { level: 1, name: "Explorer" }).waitFor();
}

async function runAndWait(page: Page): Promise<"finished" | "failed"> {
  await runButton(page).click();
  await status(page)
    .filter({ hasText: /Finished|Failed/ })
    .waitFor({ timeout: 20_000 });
  return (await status(page).textContent())?.startsWith("Failed") ? "failed" : "finished";
}

describe("explorer tools", () => {
  it("decodes the access token in the Token tab, without its signature", async () => {
    const session = await open();
    const { page, context } = session;
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await openExplorer(page);
    await page.getByRole("tab", { name: "Token" }).click();
    const panel = responsePanel(page);
    await panel.getByText("Demo token").waitFor();
    const claims = panel.getByRole("table", { name: "Token claims" });
    await claims
      .getByRole("row", { name: /Audience \(aud\) https:\/\/contoso\.crm\.dynamics\.com/ })
      .waitFor();
    await claims.getByRole("row", { name: /User \(upn\) avery\.demo@contoso\.com/ }).waitFor();
    await claims.getByRole("row", { name: /Expires \(exp\) .* in (59 minutes|1 hour)/ }).waitFor();
    await expect
      .poll(() => editorText(panel.locator('[data-code-block="json"]').nth(1)))
      .toContain('"scp": "user_impersonation"');
    await panel.getByText("The signature, the token's third part, isn't shown.").waitFor();
    expect(await axeViolations(page)).toEqual([]);

    // The raw token only on request, and never on the page.
    await panel.getByRole("button", { name: "Copy the raw token" }).click();
    await page.locator(".fui-ToastTitle", { hasText: "Access token copied" }).waitFor();
    const raw = await page.evaluate(() => navigator.clipboard.readText());
    expect(raw.split(".")).toHaveLength(3);
    expect(await page.content()).not.toContain(raw.split(".")[1]);
    expect(await problems(session)).toEqual([]);
  });

  it("uses the Web API version picked for the environment", async () => {
    const session = await open();
    const { page } = session;
    await openExplorer(page);
    await page.locator('[data-sample="top-accounts"]').click();
    await page.getByLabel("Web API version").selectOption("v9.1");
    await expect.poll(() => code(page)).toContain('apiVersion: "v9.1"');
    await requestCard(page).getByText("https://contoso.crm.dynamics.com/api/data/v9.1/").waitFor();
    await page.getByRole("tab", { name: "Preview" }).click();
    const preview = () => editorText(requestCard(page).getByRole("tabpanel", { name: "Preview" }));
    await expect
      .poll(preview)
      .toContain("GET https://contoso.crm.dynamics.com/api/data/v9.1/accounts?");
    expect(await runAndWait(page)).toBe("finished");
    await page.getByRole("tab", { name: "Requests" }).click();
    // The request list shows the path; its title, the full URL.
    await responseCard(page)
      .locator('[title^="https://contoso.crm.dynamics.com/api/data/v9.1/accounts?"]')
      .first()
      .waitFor();

    // Kept for this environment in this browser.
    await page.reload();
    await page.getByRole("heading", { level: 1, name: "Explorer" }).waitFor();
    await expect(page.getByLabel("Web API version").inputValue()).resolves.toBe("v9.1");
    await page.getByLabel("Web API version").selectOption("v9.2");
    await expect.poll(() => code(page)).not.toContain("apiVersion");
    expect(await problems(session)).toEqual([]);
  });

  it("browses the tables and queries one", async () => {
    const session = await open();
    const { page } = session;
    await openExplorer(page);
    await page.getByRole("button", { name: "Browse tables" }).click();
    const drawer = page.getByRole("dialog", { name: "Tables" });
    await drawer.getByText(/^\d+ tables$/).waitFor();
    await drawer.getByRole("searchbox", { name: "Filter tables" }).fill("contact");
    await drawer.getByText(/^1 of \d+ tables match$/).waitFor();
    await settled(drawer);
    expect(await axeViolations(page)).toEqual([]);
    // Keyboard: the table's link opens it.
    await drawer.getByRole("button", { name: "Open contact" }).focus();
    await page.keyboard.press("Enter");

    const detail = page.getByRole("dialog", { name: "Contact" });
    const columns = detail.getByRole("grid", { name: "Columns of contact" });
    await columns.getByRole("row", { name: /emailaddress1 Email String Optional 100/ }).waitFor();
    await detail.getByRole("checkbox", { name: "Select emailaddress1" }).check();
    await detail.getByRole("checkbox", { name: "Select parentcustomerid" }).check();
    await detail
      .getByText("GET contacts?$select=emailaddress1,_parentcustomerid_value&$top=10")
      .waitFor();
    await detail.getByRole("tab", { name: /^Keys/ }).click();
    await detail
      .getByRole("grid", { name: "Alternate keys of contact" })
      .getByText("new_emailkey")
      .waitFor();
    await detail.getByRole("tab", { name: /^Relationships/ }).click();
    await detail
      .getByRole("grid", { name: "Relationships of contact" })
      .getByText("contact_customer_accounts")
      .first()
      .waitFor();
    expect(await axeViolations(page)).toEqual([]);

    await detail.getByRole("button", { name: "Query this table" }).click();
    await detail.waitFor({ state: "detached" });
    await expect(urlField(page).inputValue()).resolves.toBe(
      "contacts?$select=emailaddress1,_parentcustomerid_value&$top=10"
    );
    await expect(status(page).textContent()).resolves.toBe("Not run yet.");
    expect(await runAndWait(page)).toBe("finished");
    await page.getByRole("tab", { name: "Response", exact: true }).click();
    await expect.poll(() => code(page)).toContain('"emailaddress1"');
    expect(await problems(session)).toEqual([]);
  });

  it("switches the environment from the explorer, keeping the request", async () => {
    const session = await open();
    const { page } = session;
    await openExplorer(page);
    await urlField(page).fill("contacts?$select=fullname&$top=1");
    expect(await runAndWait(page)).toBe("finished");

    // Keyboard: the dropdown opens, and its options load.
    const dropdown = page.getByRole("combobox", { name: "Environment" });
    await dropdown.focus();
    await page.keyboard.press("Enter");
    const listbox = page.getByRole("listbox");
    await listbox.getByRole("option", { name: /Contoso Dev/ }).waitFor();
    await expect(
      listbox.getByRole("option", { name: /Fabrikam Test/ }).getAttribute("aria-disabled")
    ).resolves.toBe("true");
    expect(await axeViolations(page)).toEqual([]);
    await listbox.getByRole("option", { name: /Contoso Dev/ }).click();

    await page.getByRole("banner").getByText("contoso-dev.crm.dynamics.com").waitFor();
    await page
      .locator(".fui-ToastTitle", { hasText: "Switched to contoso-dev.crm.dynamics.com" })
      .waitFor();
    await expect(urlField(page).inputValue()).resolves.toBe("contacts?$select=fullname&$top=1");
    await expect(status(page).textContent()).resolves.toBe("Not run yet.");
    await requestCard(page)
      .getByText("https://contoso-dev.crm.dynamics.com/api/data/v9.2/")
      .waitFor();
    expect(await runAndWait(page)).toBe("finished");

    // All environments: the full picker.
    await dropdown.click();
    await page.getByRole("option", { name: "All environments…" }).click();
    await page.getByRole("heading", { level: 1, name: "Choose an environment" }).waitFor();
    expect(await problems(session)).toEqual([]);
  });
});
