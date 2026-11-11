/**
 * What the e2e files share: a Chromium per file, a fresh context per test that records page
 * errors, console errors and Content-Security-Policy violations, and the axe accessibility check.
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, inject } from "vitest";
import { chromium, type Browser, type BrowserContext, type Locator, type Page } from "playwright";

export interface Session {
  context: BrowserContext;
  page: Page;
  /** Page errors, console errors and CSP violations, which every test expects to stay empty. */
  errors: string[];
}

declare global {
  interface Window {
    __cspViolations?: string[];
  }
}

export function useBrowser() {
  let browser: Browser;
  const sessions: Session[] = [];
  const baseUrl = inject("baseUrl");

  beforeAll(async () => {
    browser = await chromium.launch(
      process.env.PLAYWRIGHT_CHROMIUM_PATH
        ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
        : {}
    );
  });

  afterAll(async () => {
    for (const s of sessions) await s.context.close();
    await browser.close();
  });

  async function open(path = "/", viewport = { width: 1280, height: 900 }): Promise<Session> {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    // Init scripts run before the page's own and aren't subject to its CSP.
    await context.addInitScript(() => {
      window.__cspViolations = [];
      document.addEventListener("securitypolicyviolation", (e) => {
        window.__cspViolations?.push(`${e.violatedDirective}: ${e.blockedURI}`);
      });
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(`console: ${m.text()}`);
    });
    const session = { context, page, errors };
    sessions.push(session);
    await page.goto(new URL(path, baseUrl).href);
    return session;
  }

  return { baseUrl, open };
}

/** Errors so far, CSP violations included. */
export async function problems({ page, errors }: Session): Promise<string[]> {
  const violations = await page.evaluate(() => window.__cspViolations ?? []);
  return [...errors, ...violations.map((v) => `csp: ${v}`)];
}

export async function startDemo(page: Page, heading = "Overview"): Promise<void> {
  await page.getByRole("button", { name: "Explore with demo data" }).click();
  await page.getByRole("heading", { level: 1, name: heading }).waitFor();
}

const axeSource = readFileSync(
  createRequire(import.meta.url).resolve("axe-core/axe.min.js"),
  "utf8"
);

interface AxeResult {
  violations: Array<{ id: string; impact: string | null; nodes: Array<{ target: unknown[] }> }>;
}

/**
 * The WCAG 2.1 A and AA rules axe finds broken on the page, as `rule: selector` lines. axe is
 * evaluated through the DevTools protocol, which the page's CSP doesn't apply to.
 */
export async function axeViolations(page: Page): Promise<string[]> {
  await page.evaluate(axeSource);
  const result = await page.evaluate(() =>
    (
      window as unknown as {
        axe: { run: (context: unknown, options: unknown) => Promise<AxeResult> };
      }
    ).axe.run(
      // Tabster's focus guards (Fluent's focus management) are focusable and aria-hidden on
      // purpose: they move focus on, and are never read.
      { include: [document], exclude: [["[data-tabster-dummy]"]] },
      { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } }
    )
  );
  return result.violations.flatMap((v) =>
    v.nodes.map((n) => `${v.id} (${v.impact ?? "?"}): ${JSON.stringify(n.target)}`)
  );
}

/**
 * The text of the code editor in `container` (a Monaco editor: the lines it has rendered, which
 * are the visible ones, joined without line breaks). Monaco renders spaces as no-break spaces.
 */
export async function editorText(container: Locator): Promise<string> {
  const lines = container.locator(".monaco-editor .view-lines").first();
  return ((await lines.textContent()) ?? "").replaceAll(String.fromCharCode(0xa0), " ");
}
