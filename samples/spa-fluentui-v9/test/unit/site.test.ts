/**
 * The hosted site: the Azure Static Web Apps configuration (headers and SPA fallback) and the
 * sign-in settings visitors type.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { DISCOVERY_ORIGIN } from "../../src/auth/environments";
import {
  adminConsentUrl,
  canSignIn,
  normalizeUrl,
  validateEnvironmentUrl,
  validateSettings,
} from "../../src/config";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

interface SwaConfig {
  navigationFallback: { rewrite: string; exclude: string[] };
  globalHeaders: Record<string, string>;
}

const swa = JSON.parse(
  readFileSync(resolve(root, "public/staticwebapp.config.json"), "utf8")
) as SwaConfig;

function directives(csp: string): Map<string, string[]> {
  return new Map(
    csp
      .split(";")
      .map((d) => d.trim().split(/\s+/))
      .filter((d) => d[0])
      .map(([name = "", ...values]) => [name, values])
  );
}

describe("staticwebapp.config.json", () => {
  const csp = directives(swa.globalHeaders["Content-Security-Policy"] ?? "");

  it("allows scripts from the site only: no inline script, no eval", () => {
    expect(csp.get("script-src")).toEqual(["'self'"]);
    expect(csp.get("default-src")).toEqual(["'self'"]);
    expect(csp.get("object-src")).toEqual(["'none'"]);
    expect(csp.get("base-uri")).toEqual(["'self'"]);
  });

  it("lets the browser call Dataverse and Microsoft sign-in, and nothing else", () => {
    expect(csp.get("connect-src")).toEqual([
      "'self'",
      "https://*.dynamics.com",
      "https://login.microsoftonline.com",
    ]);
    // MSAL renews tokens in a hidden frame of the sign-in page.
    expect(csp.get("frame-src")).toEqual(["https://login.microsoftonline.com"]);
  });

  it("lets the environment picker call the Global Discovery Service", () => {
    // `https://*.dynamics.com` matches any subdomain depth, globaldisco.crm.dynamics.com too.
    const host = new URL(DISCOVERY_ORIGIN).hostname;
    const allowed = (csp.get("connect-src") ?? []).some((source) => {
      const m = /^https:\/\/\*\.(.+)$/.exec(source);
      return m?.[1] !== undefined && host.endsWith(`.${m[1]}`);
    });
    expect(DISCOVERY_ORIGIN).toBe("https://globaldisco.crm.dynamics.com");
    expect(allowed).toBe(true);
  });

  it("can't be framed, and is HTTPS only", () => {
    expect(csp.get("frame-ancestors")).toEqual(["'none'"]);
    expect(swa.globalHeaders["Strict-Transport-Security"]).toMatch(/max-age=\d{7,}/);
    expect(swa.globalHeaders["X-Content-Type-Options"]).toBe("nosniff");
  });

  it("serves index.html for the app's routes, but not for missing assets", () => {
    expect(swa.navigationFallback.rewrite).toBe("/index.html");
    expect(swa.navigationFallback.exclude).toContain("/assets/*");
  });
});

describe("sign-in settings", () => {
  const good = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    clientId: "11111111-2222-3333-4444-555555555555",
    tenantId: "organizations",
  };

  it("accepts a public-cloud environment and a client id", () => {
    expect(validateSettings(good)).toEqual({});
    expect(canSignIn(good)).toBe(true);
  });

  it("lets the environment URL be left out, to pick one after signing in", () => {
    expect(validateSettings({ ...good, environmentUrl: "  " })).toEqual({});
    expect(canSignIn({ ...good, environmentUrl: "" })).toBe(true);
    // The picker's own URL box requires one.
    expect(validateEnvironmentUrl("")).toBe("Enter your environment's URL.");
    expect(validateEnvironmentUrl("https://contoso.crm4.dynamics.com")).toBeUndefined();
  });

  it("says what's wrong with each field", () => {
    expect(validateSettings({ environmentUrl: "", clientId: "", tenantId: "" })).toEqual({
      clientId: "Enter the application (client) id of your app registration.",
    });
    const errors = validateSettings({
      environmentUrl: "http://contoso.crm.dynamics.com",
      clientId: "my-app",
      tenantId: "contoso/evil",
    });
    expect(errors.environmentUrl).toMatch(/https:\/\//);
    expect(errors.clientId).toMatch(/GUID/);
    expect(errors.tenantId).toBeDefined();
    // The site's Content-Security-Policy allows *.dynamics.com only.
    expect(
      validateSettings({ ...good, environmentUrl: "https://example.com" }).environmentUrl
    ).toMatch(/\.dynamics\.com/);
  });

  it("keeps only the origin of a pasted environment URL", () => {
    expect(normalizeUrl(" https://contoso.crm.dynamics.com/main.aspx?appid=1 ")).toBe(
      "https://contoso.crm.dynamics.com"
    );
  });

  it("links the admin consent for the app registration", () => {
    const url = new URL(adminConsentUrl({ ...good, tenantId: "contoso.onmicrosoft.com" }));
    expect(url.origin + url.pathname).toBe(
      "https://login.microsoftonline.com/contoso.onmicrosoft.com/adminconsent"
    );
    expect(url.searchParams.get("client_id")).toBe(good.clientId);
  });
});
