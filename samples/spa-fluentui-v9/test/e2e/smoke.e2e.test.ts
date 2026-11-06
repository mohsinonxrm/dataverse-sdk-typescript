/**
 * Browser smoke tests: build the app with Vite, serve the build with `vite preview`, and drive
 * it in Chromium with Playwright. They run in demo mode, so they need no org and no secrets.
 *
 * Run with `pnpm --filter spa-fluentui-v9-sample test:e2e`. PLAYWRIGHT_CHROMIUM_PATH picks a
 * Chromium other than the one installed with Playwright.
 */
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { build, preview, type PreviewServer } from "vite";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { ROUTES } from "../../src/routes";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = mkdtempSync(join(tmpdir(), "spa-e2e-"));

let server: PreviewServer;
let browser: Browser;
let baseUrl: string;

interface Session {
  context: BrowserContext;
  page: Page;
  errors: string[];
}

const sessions: Session[] = [];

/** On the Error handling page every scenario fails on purpose, except a throttle that is retried. */
const SUCCEED_ON_ERRORS_PAGE = ["Throttling (429)"];

async function open(viewport = { width: 1280, height: 900 }): Promise<Session> {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  const session = { context, page, errors };
  sessions.push(session);
  await page.goto(baseUrl);
  return session;
}

async function startDemo(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Explore with demo data" }).click();
  await page.getByRole("heading", { level: 1, name: "Overview" }).waitFor();
}

beforeAll(async () => {
  // envDir points at a folder without .env, so a developer's sign-in settings don't apply.
  const shared = {
    root,
    configFile: join(root, "vite.config.ts"),
    envDir: join(root, "test/e2e"),
    logLevel: "warn" as const,
  };
  await build({ ...shared, build: { outDir, emptyOutDir: true, sourcemap: false } });
  server = await preview({
    ...shared,
    build: { outDir },
    preview: { port: 0, host: "127.0.0.1", strictPort: false },
  });
  const url = server.resolvedUrls?.local[0];
  if (!url) throw new Error("preview server has no URL");
  baseUrl = url;
  browser = await chromium.launch(
    process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : {}
  );
});

afterAll(async () => {
  for (const s of sessions) await s.context.close();
  await browser.close();
  await new Promise<void>((done) => server.httpServer.close(() => done()));
});

describe("spa-fluentui-v9", () => {
  it("shows the sign-in page, with sign-in disabled when it isn't configured", async () => {
    const { page, errors } = await open();
    await page.getByRole("heading", { level: 1, name: "Dataverse SDK showcase" }).waitFor();
    await expect(
      page.getByRole("button", { name: "Sign in with Microsoft" }).isDisabled()
    ).resolves.toBe(true);
    await page.getByText("Sign-in isn't configured").waitFor();
    expect(errors).toEqual([]);
  });

  it("opens every page from the navigation", async () => {
    const { page, errors } = await open();
    await startDemo(page);
    const nav = page.getByRole("navigation");
    for (const route of ROUTES) {
      await nav.getByRole("link", { name: route.title, exact: true }).click();
      await page.getByRole("heading", { level: 1, name: route.title }).waitFor();
      expect(new URL(page.url()).pathname).toBe(route.path);
      await expect(
        nav.getByRole("link", { name: route.title, exact: true }).getAttribute("aria-current")
      ).resolves.toBe("page");
    }
    expect(errors).toEqual([]);
  });

  it("runs every scenario against the demo environment", async () => {
    const { page, errors } = await open();
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
          route.path === "/diagnostics/errors" && !SUCCEED_ON_ERRORS_PAGE.includes(title)
            ? "failed"
            : "finished";
        expect(`${route.path} ${title}: ${outcome}`).toBe(`${route.path} ${title}: ${expected}`);
      }
    }
    expect(errors).toEqual([]);
  });

  it("switches between the light and dark theme and remembers the choice", async () => {
    const { page, errors } = await open();
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
    expect(errors).toEqual([]);
  });

  it("collapses the navigation at narrow widths and opens it from the header", async () => {
    const { page, errors } = await open({ width: 390, height: 844 });
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
    expect(errors).toEqual([]);
  });

  it("signs out of demo mode", async () => {
    const { page, errors } = await open();
    await startDemo(page);
    await page.getByRole("button", { name: /^Account:/ }).click();
    await page.getByRole("menuitem", { name: "Sign out" }).click();
    await page.getByRole("button", { name: "Explore with demo data" }).waitFor();
    expect(errors).toEqual([]);
  });
});
