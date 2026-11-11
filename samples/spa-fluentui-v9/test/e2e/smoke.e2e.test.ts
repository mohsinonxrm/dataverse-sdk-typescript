/**
 * Browser smoke tests: the build, served with the site's response headers (its strict
 * Content-Security-Policy among them, test/e2e/globalSetup.ts), driven in Chromium with
 * Playwright. They run in demo mode, so they need no org and no secrets.
 *
 * Run with `pnpm --filter spa-fluentui-v9-sample test:e2e`. PLAYWRIGHT_CHROMIUM_PATH picks a
 * Chromium other than the one installed with Playwright.
 */
import { describe, expect, it } from "vitest";
import type { BrowserContext, Page } from "playwright";
import { ROUTES } from "../../src/routes";
import { axeViolations, problems, startDemo, useBrowser } from "./browser";

const { baseUrl, open } = useBrowser();

const CLIENT_ID = "11111111-2222-3333-4444-555555555555";
const TENANT = "contoso.onmicrosoft.com";
const LOGIN = "https://login.microsoftonline.com";

/**
 * The code editor's (Monaco's) size budget, in bytes before compression: its chunk is loaded the
 * first time code is shown. (The rest of the app's chunks are measured in a production build;
 * these tests run React's development build.)
 */
const EDITOR_BUDGET = 3_150_000;

/**
 * Mocks Microsoft sign-in: MSAL's metadata requests are answered, and the authorize URLs MSAL
 * redirects to are recorded (and answered with an empty page).
 */
async function mockMicrosoftSignIn(context: BrowserContext): Promise<string[]> {
  const authorize: string[] = [];
  await context.route(`${LOGIN}/**`, async (route) => {
    const url = route.request().url();
    if (url.includes("/discovery/instance")) {
      return route.fulfill({
        json: {
          tenant_discovery_endpoint: `${LOGIN}/${TENANT}/v2.0/.well-known/openid-configuration`,
          "api-version": "1.1",
          metadata: [
            {
              preferred_network: "login.microsoftonline.com",
              preferred_cache: "login.windows.net",
              aliases: ["login.microsoftonline.com", "login.windows.net"],
            },
          ],
        },
      });
    }
    if (url.includes("openid-configuration")) {
      return route.fulfill({
        json: {
          authorization_endpoint: `${LOGIN}/${TENANT}/oauth2/v2.0/authorize`,
          token_endpoint: `${LOGIN}/${TENANT}/oauth2/v2.0/token`,
          end_session_endpoint: `${LOGIN}/${TENANT}/oauth2/v2.0/logout`,
          issuer: `${LOGIN}/${TENANT}/v2.0`,
          jwks_uri: `${LOGIN}/${TENANT}/discovery/v2.0/keys`,
        },
      });
    }
    authorize.push(url);
    return route.fulfill({ contentType: "text/html", body: "<title>Sign in</title>" });
  });
  return authorize;
}

/** Opens the environment picker from the account menu. */
async function openPicker(page: Page): Promise<void> {
  await page.getByRole("button", { name: /^Account:/ }).click();
  await page.getByRole("menuitem", { name: "Switch environment" }).click();
  await page.getByRole("heading", { level: 1, name: "Choose an environment" }).waitFor();
}

describe("spa-fluentui-v9", () => {
  it("asks for the app registration before Microsoft sign-in; the environment is optional", async () => {
    const session = await open();
    const { page } = session;
    await page.getByRole("heading", { level: 1, name: "Dataverse SDK explorer" }).waitFor();
    await page.getByRole("button", { name: "Sign in with Microsoft" }).click();
    await page.getByText("Enter the application (client) id of your app registration.").waitFor();
    await expect(page.getByText("Enter your environment's URL.").count()).resolves.toBe(0);
    await page.getByLabel("Environment URL").fill("https://example.com");
    await page.getByRole("button", { name: "Sign in with Microsoft" }).click();
    await page.getByText(/ending in \.dynamics\.com/).waitFor();
    // Nothing was sent anywhere: the page is still the site.
    expect(new URL(page.url()).origin).toBe(new URL(baseUrl).origin);
    expect(await axeViolations(page)).toEqual([]);
    expect(await problems(session)).toEqual([]);
  });

  it("signs in without an environment URL, with the Global Discovery Service scope", async () => {
    const session = await open();
    const { page, context } = session;
    const authorize = await mockMicrosoftSignIn(context);
    await page.getByLabel("Environment URL").fill("");
    await page.getByLabel("Application (client) ID").fill(CLIENT_ID);
    await page.getByLabel("Tenant").fill(TENANT);
    const before = await problems(session);
    await page.getByRole("button", { name: "Sign in with Microsoft" }).click();
    await page.waitForURL(/login\.microsoftonline\.com/);
    expect(before).toEqual([]);
    const scope = new URL(authorize[0] ?? "").searchParams.get("scope") ?? "";
    // The same Dynamics CRM user_impersonation permission, for the environment list.
    expect(scope).toContain("https://globaldisco.crm.dynamics.com/user_impersonation");
    expect(scope).not.toContain("contoso");
    expect(session.errors).toEqual([]);
  });

  it("switches environment from the account menu with the picker, in demo mode", async () => {
    const session = await open();
    const { page } = session;
    await startDemo(page);
    const banner = page.getByRole("banner");
    await openPicker(page);
    // The demo's Global Discovery Service: three environments, one disabled.
    const list = page.getByRole("list", { name: "Your environments" });
    const dev = list.getByRole("button", { name: /^Contoso Dev/ });
    await dev.waitFor();
    await expect(list.getByRole("button").count()).resolves.toBe(3);
    await expect(list.getByRole("button", { name: /^Fabrikam Test/ }).isDisabled()).resolves.toBe(
      true
    );
    await expect(
      list.getByRole("button", { name: /^Contoso \(demo\)/ }).textContent()
    ).resolves.toContain("in use");
    expect(await axeViolations(page)).toEqual([]);

    // Back, unchanged.
    await page.getByRole("button", { name: /^Back to/ }).click();
    await page.getByRole("heading", { level: 1, name: "Overview" }).waitFor();
    await banner.getByText("contoso.crm.dynamics.com").waitFor();

    // Pick another one; a reload stays in it.
    await openPicker(page);
    await dev.click();
    await page.getByRole("heading", { level: 1, name: "Overview" }).waitFor();
    await banner.getByText("contoso-dev.crm.dynamics.com").waitFor();
    await page.reload();
    await page.getByRole("heading", { level: 1, name: "Overview" }).waitFor();
    await banner.getByText("contoso-dev.crm.dynamics.com").waitFor();

    // Or type its URL.
    await openPicker(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByText("Enter your environment's URL.").waitFor();
    await page.getByLabel("Environment URL").fill("https://fabrikam.crm4.dynamics.com/main.aspx");
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("heading", { level: 1, name: "Overview" }).waitFor();
    await banner.getByText("fabrikam.crm4.dynamics.com").waitFor();
    expect(await problems(session)).toEqual([]);
  });

  it("signs in with Microsoft to the environment and app registration typed in", async () => {
    // Microsoft sign-in is mocked; the test checks the redirect MSAL starts, under the site's CSP.
    const session = await open();
    const { page, context } = session;
    const authorize = await mockMicrosoftSignIn(context);
    await page.getByLabel("Environment URL").fill("https://contoso.crm.dynamics.com/main.aspx");
    await page.getByLabel("Application (client) ID").fill(CLIENT_ID);
    await page.getByLabel("Tenant").fill(TENANT);
    // The admin consent link is for this app registration.
    const consent = new URL(
      (await page
        .getByRole("link", { name: "grant admin consent for this app" })
        .getAttribute("href")) ?? ""
    );
    expect(consent.pathname).toBe(`/${TENANT}/adminconsent`);
    expect(consent.searchParams.get("client_id")).toBe(CLIENT_ID);
    // Before leaving the site: no CSP violation from MSAL's requests.
    const before = await problems(session);
    await page.getByRole("button", { name: "Sign in with Microsoft" }).click();
    await page.waitForURL(/login\.microsoftonline\.com/);
    expect(before).toEqual([]);
    const url = new URL(authorize[0] ?? "");
    expect(url.pathname).toBe(`/${TENANT}/oauth2/v2.0/authorize`);
    expect(url.searchParams.get("client_id")).toBe(CLIENT_ID);
    expect(url.searchParams.get("redirect_uri")).toBe(new URL(baseUrl).origin);
    expect(url.searchParams.get("scope")).toContain(
      "https://contoso.crm.dynamics.com/user_impersonation"
    );
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
    expect(session.errors).toEqual([]);
  });

  it("opens every page from the navigation", async () => {
    const session = await open();
    const { page } = session;
    await startDemo(page);
    const nav = page.getByRole("navigation");
    for (const route of ROUTES) {
      await nav.getByRole("link", { name: route.title, exact: true }).click();
      await page.getByRole("heading", { level: 1, name: route.title }).waitFor();
      expect(new URL(page.url()).pathname).toBe(route.path);
      await expect(
        nav.getByRole("link", { name: route.title, exact: true }).getAttribute("aria-current")
      ).resolves.toBe("page");
      // Every form control on the page has an accessible name.
      const unlabelled = await page.evaluate(() =>
        [...document.querySelectorAll("main input, main textarea, main [role=combobox]")]
          // Hidden from assistive technology (the code editor's IME text area).
          .filter((el) => !el.closest('[aria-hidden="true"]'))
          .filter((el) => {
            const labels = (el as HTMLInputElement).labels;
            return (
              !labels?.length &&
              !el.getAttribute("aria-label") &&
              !el.getAttribute("aria-labelledby")
            );
          })
          .map((el) => el.outerHTML.slice(0, 80))
      );
      expect(unlabelled, route.path).toEqual([]);
    }
    expect(await problems(session)).toEqual([]);
  });

  it("runs every scenario against the demo environment", async () => {
    const session = await open();
    const { page } = session;
    await startDemo(page);
    for (const route of ROUTES) {
      await page.goto(new URL(route.path, baseUrl).href);
      await page.getByRole("heading", { level: 1, name: route.title }).waitFor();
      const scenarios = page.locator("main [data-scenario]");
      const count = await scenarios.count();
      for (let i = 0; i < count; i++) {
        const card = scenarios.nth(i);
        const run = card.locator('form button[type="submit"]');
        if (await run.isDisabled()) continue;
        await run.click();
        const dialog = page.getByRole("alertdialog");
        if (await dialog.isVisible().catch(() => false)) {
          await dialog.getByRole("button").last().click();
        }
        // The card's live region says how the run ended.
        await card
          .getByRole("status")
          .filter({ hasText: /Finished|Failed/ })
          .waitFor({ timeout: 20_000 });
        const status = (await card.getByRole("status").textContent()) ?? "";
        const title = (await card.getAttribute("data-scenario")) ?? "";
        const outcome = status.startsWith("Failed") ? "failed" : "finished";
        const expected =
          (await card.getAttribute("data-expect")) === "error" ? "failed" : "finished";
        expect(`${route.path} ${title}: ${outcome}`).toBe(`${route.path} ${title}: ${expected}`);
      }
    }
    expect(await problems(session)).toEqual([]);
  });

  it("loads the code editor only when code is shown, within the site's size budget", async () => {
    const session = await open();
    const { page } = session;
    const scripts = () =>
      page.evaluate(() =>
        performance
          .getEntriesByType("resource")
          .map((e) => new URL(e.name).pathname)
          .filter((path) => path.endsWith(".js"))
      );
    const isEditor = (path: string) => /\/CodeEditor-[\w-]+\.js$/.test(path);
    await page.getByRole("heading", { level: 1, name: "Dataverse SDK explorer" }).waitFor();
    // The sign-in page doesn't download Monaco.
    expect((await scripts()).filter(isEditor)).toEqual([]);
    const size = async (path = "") =>
      (await (await page.request.get(new URL(path, baseUrl).href)).body()).length;

    // The overview shows code: the editor is loaded then, as one chunk, with its worker.
    await startDemo(page);
    await page.locator("main .monaco-editor").first().waitFor();
    const editor = (await scripts()).filter(isEditor);
    expect(editor).toHaveLength(1);
    expect(await size(editor[0])).toBeLessThan(EDITOR_BUDGET);
    expect(await problems(session)).toEqual([]);
  });
  it("serves the app's routes from index.html (the SPA fallback)", async () => {
    const session = await open("/documentation");
    await startDemo(session.page, "Documentation");
    expect(new URL(session.page.url()).pathname).toBe("/documentation");
    expect(await problems(session)).toEqual([]);
  });

  it("switches between the light and dark theme and remembers the choice", async () => {
    const session = await open();
    const { page } = session;
    await startDemo(page);
    const provider = page.locator(".fui-FluentProvider").first();
    const before = await provider.getAttribute("data-theme");
    const background = () => provider.evaluate((el) => getComputedStyle(el).backgroundColor);
    const light = await background();
    await page.getByRole("button", { name: "Dark theme" }).click();
    const after = before === "dark" ? "light" : "dark";
    await expect(provider.getAttribute("data-theme")).resolves.toBe(after);
    expect(await background()).not.toBe(light);
    await page.reload();
    await page.getByRole("heading", { level: 1 }).first().waitFor();
    await expect(
      page.locator(".fui-FluentProvider").first().getAttribute("data-theme")
    ).resolves.toBe(after);
    expect(await problems(session)).toEqual([]);
  });

  it("collapses the navigation at narrow widths and opens it from the header", async () => {
    const session = await open("/", { width: 390, height: 844 });
    const { page } = session;
    await startDemo(page);
    const link = page.getByRole("navigation").getByRole("link", { name: "Error handling" });
    await link.waitFor({ state: "hidden" });
    await page
      .getByRole("button", { name: /navigation/i })
      .first()
      .click();
    await link.click();
    await page.getByRole("heading", { level: 1, name: "Error handling" }).waitFor();
    // The overlay closes after a choice, and the page doesn't scroll sideways.
    await link.waitFor({ state: "hidden" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(await problems(session)).toEqual([]);
  });

  it("works from the keyboard: skip link, navigation and focus after navigating", async () => {
    const session = await open();
    const { page } = session;
    await startDemo(page);
    // The skip link is the first stop, shown when focused; Tab goes on to the header.
    const skip = page.getByRole("link", { name: "Skip to content" });
    await skip.focus();
    await expect(skip.isVisible()).resolves.toBe(true);
    await page.keyboard.press("Tab");
    await expect(
      page.evaluate(() => document.activeElement?.getAttribute("aria-controls"))
    ).resolves.toBe("app-nav");
    await skip.focus();
    await page.keyboard.press("Enter");
    await expect(page.evaluate(() => document.activeElement?.id)).resolves.toBe("main");
    await page.getByRole("navigation").getByRole("link", { name: "Queries" }).focus();
    await page.keyboard.press("Enter");
    await page.getByRole("heading", { level: 1, name: "Queries" }).waitFor();
    // Focus moves to the new page, so the next Tab starts there.
    await expect(page.evaluate(() => document.activeElement?.id)).resolves.toBe("main");
    expect(await problems(session)).toEqual([]);
  });

  it("signs out of demo mode", async () => {
    const session = await open();
    const { page } = session;
    await startDemo(page);
    await page.getByRole("button", { name: /^Account:/ }).click();
    await page.getByRole("menuitem", { name: "Sign out" }).click();
    await page.getByRole("button", { name: "Explore with demo data" }).waitFor();
    expect(await problems(session)).toEqual([]);
  });
});
