/**
 * The explorer in the browser, in demo mode: every sample shows its SDK code and runs, the
 * operation catalogs and packages load only when needed, a raw request is previewed, run and kept
 * in the history, links open a sample, and axe finds no WCAG A/AA violation.
 */
import { describe, expect, it } from "vitest";
import type { Page } from "playwright";
import { SAMPLES } from "../../src/explorer/samples";
import { axeViolations, editorText, problems, startDemo, useBrowser } from "./browser";

const { open } = useBrowser();

const CLASS_SUFFIX = { actions: "Action", functions: "Function", messages: "Request" } as const;

const responseCard = (page: Page) => page.getByRole("region", { name: "Response", exact: true });
const requestCard = (page: Page) => page.getByRole("region", { name: "Request", exact: true });
/** The response card's tab panel (response, headers, SDK code or requests). */
const responsePanel = (page: Page) => responseCard(page).getByRole("tabpanel");
/** The text of the editor in the response card's tab panel (the SDK code, or the response). */
const code = (page: Page) => editorText(responsePanel(page));
const status = (page: Page) => responseCard(page).getByRole("status");
const runButton = (page: Page) => page.getByRole("button", { name: "Run", exact: true });

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

describe("explorer", () => {
  it("shows the SDK code of every sample and runs it", async () => {
    const session = await open();
    const { page } = session;
    await openExplorer(page);
    for (const sample of SAMPLES) {
      await page.locator(`[data-sample="${sample.id}"]`).click();
      const expected =
        sample.type === "raw"
          ? `.api("${sample.request.url.split("?")[0] ?? ""}`
          : `new ${sample.operation.name}${CLASS_SUFFIX[sample.operation.kind]}(`;
      await expect.poll(() => code(page), { timeout: 10_000 }).toContain(expected);
      await expect(status(page).textContent()).resolves.toBe("Not run yet.");
      const outcome = await runAndWait(page);
      expect(`${sample.id}: ${outcome}`).toBe(
        `${sample.id}: ${sample.failsOnPurpose ? "failed" : "finished"}`
      );
    }
    expect(await problems(session)).toEqual([]);
  });

  it("loads an operation package's catalog and code only when they are needed", async () => {
    const session = await open();
    const { page } = session;
    const loaded: string[] = [];
    page.on("request", (r) => {
      const name = /\/assets\/((?:catalog|package)-[a-z]+)-/.exec(r.url())?.[1];
      if (name) loaded.push(name);
    });
    await openExplorer(page);
    // The page itself, and a sample, need neither.
    await page.locator('[data-sample="top-accounts"]').click();
    expect(loaded).toEqual([]);

    await page.getByRole("tab", { name: "Operations" }).click();
    await page.getByText(/^\d+ functions; showing the first 50$/).waitFor();
    expect(loaded).toEqual(["catalog-functions"]);

    await page.getByRole("searchbox", { name: "Search the functions" }).fill("RetrieveVersion");
    await page.getByRole("option", { name: /^GET RetrieveVersionFunction/ }).click();
    await expect
      .poll(() => code(page))
      .toContain('import { RetrieveVersionFunction } from "@mohsinonxrm/dataverse-sdk-functions";');
    await expect.poll(() => code(page)).toContain("client.execute(new RetrieveVersionFunction())");
    expect(loaded).toEqual(["catalog-functions", "package-functions"]);

    // The other flavours of the same request.
    await page.getByRole("radio", { name: "OrganizationService" }).check();
    await expect.poll(() => code(page)).toContain("service.execute(new RetrieveVersionFunction())");
    await page.getByRole("radio", { name: "client.api()" }).check();
    await expect.poll(() => code(page)).toContain('client.api("RetrieveVersion").get()');

    expect(await runAndWait(page)).toBe("finished");
    await page.getByRole("tab", { name: "Response", exact: true }).click();
    await expect.poll(() => code(page)).toContain('"Version"');
    await responsePanel(page)
      .getByRole("textbox", { name: "Response body" })
      .waitFor({ state: "attached" });
    await page.getByRole("tab", { name: "Headers", exact: true }).click();
    await responsePanel(page).getByText("odata-version").waitFor();
    // Other packages are still not loaded.
    expect(loaded).toEqual(["catalog-functions", "package-functions"]);
    expect(await axeViolations(page)).toEqual([]);
    expect(await problems(session)).toEqual([]);
  });

  it("asks for an operation's required parameters before it runs", async () => {
    const session = await open();
    const { page } = session;
    await openExplorer(page);
    await page.getByRole("tab", { name: "Operations" }).click();
    await page.getByLabel("Package").selectOption("actions");
    await page.getByRole("searchbox", { name: "Search the actions" }).fill("CanManyToMany");
    await page.getByRole("option", { name: /^POST CanManyToManyAction/ }).click();
    await expect.poll(() => code(page)).toContain("// To run it, fill in: EntityName");
    await expect(runButton(page).isDisabled()).resolves.toBe(true);
    await page.getByLabel(/^EntityName/).fill("account");
    await expect
      .poll(() => code(page))
      .toContain('new CanManyToManyAction({ EntityName: "account" })');
    expect(await runAndWait(page)).toBe("finished");
    expect(await problems(session)).toEqual([]);
  });

  it("previews, runs and remembers a raw request", async () => {
    const session = await open();
    const { page } = session;
    await openExplorer(page);
    await page.getByLabel("URL", { exact: true }).fill("contacts?$select=fullname&$top=2");
    await page.getByRole("tab", { name: "Headers", exact: true }).first().click();
    await page
      .getByRole("textbox", { name: "Headers", exact: true })
      .fill("Prefer: odata.include-annotations=*");
    await page.getByRole("tab", { name: "Preview" }).click();
    const preview = () => editorText(requestCard(page).getByRole("tabpanel", { name: "Preview" }));
    await expect
      .poll(preview)
      .toContain("GET https://contoso.crm.dynamics.com/api/data/v9.2/contacts?");
    await expect(preview()).resolves.toContain("prefer: odata.include-annotations=*");
    await expect(preview()).resolves.toContain("authorization: Bearer (your access token)");
    expect(await axeViolations(page)).toEqual([]);
    await expect.poll(() => code(page)).toContain('.preferRaw("odata.include-annotations=*")');

    expect(await runAndWait(page)).toBe("finished");
    await page.getByRole("tab", { name: "Requests" }).click();
    await responseCard(page).getByText("/contacts?").first().waitFor();

    await page.getByRole("tab", { name: "History" }).click();
    const history = page.getByRole("listbox", { name: "History" });
    await history
      .getByRole("option", { name: /Request/ })
      .first()
      .waitFor();
    // The history survives a reload (this browser only).
    await page.reload();
    await page.getByRole("heading", { level: 1, name: "Explorer" }).waitFor();
    await page.getByRole("tab", { name: "History" }).click();
    await history
      .getByRole("option", { name: /Request/ })
      .first()
      .click();
    await expect(page.getByLabel("URL", { exact: true }).inputValue()).resolves.toBe(
      "contacts?$select=fullname&$top=2"
    );
    await page.getByRole("button", { name: "Clear the history" }).click();
    await page.getByText("Requests you run appear here.").waitFor();
    expect(await problems(session)).toEqual([]);
  });

  it("edits a JSON body: validation, formatting, and Tab moves the focus on", async () => {
    const session = await open();
    const { page } = session;
    await openExplorer(page);
    await page.locator('[data-sample="create-account"]').click();
    const body = requestCard(page).getByRole("textbox", { name: "Body (JSON)" });
    const bodyText = () => editorText(requestCard(page).getByRole("tabpanel"));
    await expect.poll(bodyText).toContain('"name": "Created in the explorer"');
    const error = requestCard(page).getByText(/^Line \d+, column \d+: /);

    // A problem is shown at the field, and the editor is marked invalid.
    await body.focus();
    await page.keyboard.press("Control+End");
    await page.keyboard.insertText(",");
    await error.waitFor();
    await expect(body.getAttribute("aria-invalid")).resolves.toBe("true");
    await expect(runButton(page).isDisabled()).resolves.toBe(true);
    await page.keyboard.press("Backspace");
    await error.waitFor({ state: "detached" });

    // Format indents it.
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Delete");
    // Typed: the editor closes brackets and quotes, and types over them.
    await page.keyboard.type('{"name":"Fabrikam","revenue":5}');
    await expect.poll(bodyText).toBe('{"name":"Fabrikam","revenue":5}');
    await requestCard(page).getByRole("button", { name: "Format" }).click();
    await expect.poll(bodyText).toBe('{  "name": "Fabrikam",  "revenue": 5}');

    // Tab leaves the editors (no keyboard trap), the editable one and the read-only ones.
    const inEditor = () =>
      page.evaluate(() => Boolean(document.activeElement?.closest(".monaco-editor")));
    await body.focus();
    await page.keyboard.press("Tab");
    await expect(inEditor()).resolves.toBe(false);
    const sdkCode = responsePanel(page).getByRole("textbox", { name: "SDK code" });

    await sdkCode.focus();
    await expect(inEditor()).resolves.toBe(true);
    await page.keyboard.press("Tab");
    await expect(inEditor()).resolves.toBe(false);
    await expect(sdkCode.getAttribute("aria-readonly")).resolves.toBe("true");

    expect(await runAndWait(page)).toBe("finished");
    expect(await axeViolations(page)).toEqual([]);
    expect(await problems(session)).toEqual([]);
  });

  it("themes the editors with the app: light, dark and high contrast", async () => {
    const session = await open();
    const { page } = session;
    await page.emulateMedia({ colorScheme: "light" });
    await openExplorer(page);
    const editor = responsePanel(page).locator(".monaco-editor").first();
    const theme = async () => {
      const classes = ((await editor.getAttribute("class")) ?? "").split(/\s+/);
      return ["vs", "vs-dark", "hc-black"].find((t) => classes.includes(t));
    };
    await expect.poll(theme).toBe("vs");
    // The editor is transparent: the code block's Fluent background shows through.
    await expect(
      editor
        .locator(".monaco-editor-background")
        .evaluate((el) => getComputedStyle(el).backgroundColor)
    ).resolves.toBe("rgba(0, 0, 0, 0)");
    await page.getByRole("button", { name: "Dark theme" }).click();
    await expect.poll(theme).toBe("vs-dark");
    await page.emulateMedia({ forcedColors: "active" });
    await expect.poll(theme).toBe("hc-black");
    await page.emulateMedia({ forcedColors: "none" });
    await expect.poll(theme).toBe("vs-dark");
    expect(await problems(session)).toEqual([]);
  });
  it("opens a sample from a link", async () => {
    const session = await open();
    const { page } = session;
    await startDemo(page);
    await page.goto(new URL("/explorer?sample=record-counts", page.url()).href);
    await page.getByRole("heading", { level: 1, name: "Explorer" }).waitFor();
    await expect
      .poll(() => code(page))
      .toContain('new RetrieveTotalRecordCountFunction({ EntityNames: ["account", "contact"] })');
    expect(await runAndWait(page)).toBe("finished");
    expect(await problems(session)).toEqual([]);
  });

  it("fits a phone screen", async () => {
    const session = await open("/", { width: 390, height: 844 });
    const { page } = session;
    await startDemo(page);
    await page.goto(new URL("/explorer?sample=create-account", page.url()).href);
    await page.getByRole("heading", { level: 1, name: "Explorer" }).waitFor();
    expect(await runAndWait(page)).toBe("finished");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(await axeViolations(page)).toEqual([]);
    expect(await problems(session)).toEqual([]);
  });
});
