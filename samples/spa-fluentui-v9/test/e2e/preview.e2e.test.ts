/**
 * A pull request's preview deployment: served from a Static Web Apps preview host (here the test
 * build, answered for that host by Playwright), the app says that sign-in may not work and demo
 * mode is the way in. The test host itself (production-like) shows no banner.
 */
import { describe, expect, it } from "vitest";
import { axeViolations, problems, startDemo, useBrowser } from "./browser";

const { open } = useBrowser();

const PREVIEW = "https://explorer-427.westeurope.azurestaticapps.net";
const BANNER = "Preview — sign-in may not work";

describe("preview deployments", () => {
  it("shows the preview banner on a preview host only", async () => {
    const session = await open();
    const { page, context } = session;
    await page.getByRole("button", { name: "Explore with demo data" }).waitFor();
    await expect(page.getByText(BANNER).count()).resolves.toBe(0);

    // The preview host, answered by the test build with its headers (CSP included).
    const origin = new URL(page.url()).origin;
    await context.route(`${PREVIEW}/**`, async (route) => {
      const url = new URL(route.request().url());
      const response = await route.fetch({ url: `${origin}${url.pathname}${url.search}` });
      await route.fulfill({ response });
    });
    await page.goto(`${PREVIEW}/`);
    await page.getByText(BANNER).waitFor();
    await page.getByRole("link", { name: "production site" }).waitFor();
    expect(await axeViolations(page)).toEqual([]);

    await startDemo(page);
    await page.getByRole("banner").waitFor();
    await page.getByText(BANNER).waitFor();
    expect(await axeViolations(page)).toEqual([]);
    expect(await problems(session)).toEqual([]);
  });
});
