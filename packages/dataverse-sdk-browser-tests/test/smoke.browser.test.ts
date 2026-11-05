/**
 * Browser smoke tests (#38): build app/ with Vite like a consumer SPA, serve it with a strict
 * Content-Security-Policy, and drive it in Chromium with Playwright.
 *
 * `it.fails("#NN: …")` pins a known browser bug; flip it to `it` in the PR that fixes the issue.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { build, preview, type PreviewServer } from "vite";
import { chromium, type Browser, type Page } from "playwright";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

let server: PreviewServer;
let browser: Browser;
let page: Page;
const pageErrors: string[] = [];
const consoleErrors: string[] = [];

beforeAll(async () => {
  await build({
    root: join(root, "app"),
    configFile: join(root, "vite.config.ts"),
    logLevel: "warn",
  });
  server = await preview({
    root: join(root, "app"),
    configFile: join(root, "vite.config.ts"),
    preview: { port: 0, host: "127.0.0.1" },
    logLevel: "warn",
  });
  const url = server.resolvedUrls?.local[0];
  if (!url) throw new Error("preview server has no URL");

  // Use the Chromium that ships with the installed Playwright; PLAYWRIGHT_CHROMIUM_PATH overrides it.
  browser = await chromium.launch(
    process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : {}
  );
  page = await browser.newPage();
  page.on("pageerror", (e) => pageErrors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  await page.goto(url);
  await page.waitForSelector("body[data-ready='true']", { state: "attached", timeout: 15_000 });
});

afterAll(async () => {
  await browser.close();
  await new Promise<void>((resolve) => {
    server.httpServer.close(() => {
      resolve();
    });
  });
});

describe("browser bundle", () => {
  it("every browser package loads under script-src 'self' with no errors or CSP violations", async () => {
    const loaded = await page.evaluate(() => window.__smoke.loaded());
    expect(loaded).toEqual({
      DataverseClient: "function",
      MsalBrowserTokenProvider: "function",
      DiscoveryClient: "function",
      BatchRequestBuilder: "function",
      FileColumnClient: "function",
      MetadataClient: "function",
    });
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
    expect(await page.evaluate(() => window.__smoke.cspViolations())).toEqual([]);
  });

  it("the production bundle contains no eval or new Function (#20)", () => {
    const js = readdirSync(join(dist, "assets"))
      .filter((f) => f.endsWith(".js"))
      .map((f) => readFileSync(join(dist, "assets", f), "utf8"))
      .join("\n");
    expect(js.length).toBeGreaterThan(0);
    expect(js).not.toMatch(/\bnew Function\s*\(/);
    expect(js).not.toMatch(/\beval\s*\(/);
  });
});

describe("browser behaviour", () => {
  it("a GET runs through the real client in Chromium", async () => {
    const r = await page.evaluate(() => window.__smoke.whoAmI());
    expect(r).toEqual({ userId: "u1", authorization: "Bearer test-token" });
    expect(await page.evaluate(() => window.__smoke.cspViolations())).toEqual([]);
  });

  it("#33: with no logger configured, a request writes nothing to the console", async () => {
    expect(await page.evaluate(() => window.__smoke.consoleCallsPerRequest())).toBe(0);
  });

  it.fails("#58: FileColumnClient.upload() works with a Blob in the browser", async () => {
    const steps = await page.evaluate(() => window.__smoke.uploadBlob());
    expect(steps).toEqual(["InitializeFileBlocksUpload", "UploadBlock", "CommitFileBlocksUpload"]);
  });
});
