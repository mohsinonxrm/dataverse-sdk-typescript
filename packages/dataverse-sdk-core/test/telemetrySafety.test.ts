import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { SDK_VERSION, defaultRedactUrl } from "../src/index.js";
import { FeatureUsageFlag, FeatureUsageTracker } from "../src/telemetry/FeatureUsageTracker.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";
import type { FetchProvider, Logger, TelemetryClient } from "../src/abstractions/http.js";
import pkg from "../package.json" with { type: "json" };

const BASE_URL = "https://contoso.crm.dynamics.com";
const API = `${BASE_URL}/api/data/v9.2`;
const ID = "00000000-0000-0000-0000-000000000001";

type Dependency = Parameters<TelemetryClient["trackDependency"]>[1];

function recordingTelemetry(throwing = false) {
  const dependencies: Dependency[] = [];
  const exceptions: Array<Record<string, string> | undefined> = [];
  const telemetry: TelemetryClient = {
    trackEvent: () => undefined,
    trackDependency: (_name, data) => {
      dependencies.push(data);
      if (throwing) throw new Error("exporter down");
    },
    trackException: (_err, props) => {
      exceptions.push(props);
      if (throwing) throw new Error("exporter down");
    },
  };
  return { telemetry, dependencies, exceptions };
}

function setup(options: Partial<DataverseClientOptions> = {}, fail?: Error) {
  const headers: Array<Record<string, string>> = [];
  const fetchProvider: FetchProvider = {
    fetch: (_input, init) => {
      const h: Record<string, string> = {};
      new Headers(init?.headers).forEach((v, k) => (h[k] = v));
      headers.push(h);
      if (fail) return Promise.reject(fail);
      return Promise.resolve(
        new Response(JSON.stringify({ value: [] }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
      );
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { maxRetries: 0 },
    ...options,
  });
  return { client, headers };
}

describe("#35: telemetry never breaks a request", () => {
  it("a throwing trackDependency doesn't fail a successful request", async () => {
    const t = recordingTelemetry(true);
    const warnings: string[] = [];
    const logger: Logger = {
      debug: () => undefined,
      info: () => undefined,
      warn: (m) => warnings.push(m),
      error: () => undefined,
    };
    const { client } = setup({ telemetry: t.telemetry, logger });
    await expect(client.api("WhoAmI").get()).resolves.toEqual({ value: [] });
    expect(t.dependencies).toHaveLength(1);
    expect(warnings).toEqual(["Telemetry trackDependency threw; ignoring"]);
  });

  it("a throwing telemetry client doesn't replace the request's own error", async () => {
    const t = recordingTelemetry(true);
    const { client } = setup({ telemetry: t.telemetry }, new TypeError("fetch failed"));
    await expect(client.api("WhoAmI").get()).rejects.toMatchObject({ name: "ConnectionFailed" });
    expect(t.exceptions).toHaveLength(1);
  });
});

describe("#35: telemetry URLs are redacted by default", () => {
  it("drops the query and hides keys in dependencies and exceptions", async () => {
    const t = recordingTelemetry();
    const { client } = setup({ telemetry: t.telemetry });
    await client.api("contacts").filter("emailaddress1 eq 'jane@contoso.com'").get();
    await client.api(`accounts(${ID})/contact_customer_accounts`).get();
    await client.api("accounts(name='O''Brien')").get();
    expect(t.dependencies.map((d) => d.url)).toEqual([
      `${API}/contacts?…`,
      `${API}/accounts({id})/contact_customer_accounts`,
      `${API}/accounts(…)`,
    ]);
    expect(t.dependencies.every((d) => d.target === "contoso.crm.dynamics.com")).toBe(true);

    const failing = recordingTelemetry();
    const f = setup({ telemetry: failing.telemetry }, new TypeError("fetch failed"));
    await f.client
      .api(`accounts(${ID})`)
      .get()
      .catch(() => undefined);
    expect(failing.exceptions[0]?.["request.url"]).toBe(`${API}/accounts({id})`);
  });

  it("uses a custom redactUrl, and falls back to the default if it throws", async () => {
    const t = recordingTelemetry();
    await setup({ telemetry: t.telemetry, redactUrl: (u) => u.href })
      .client.api("contacts")
      .filter("name eq 'x'")
      .get();
    expect(t.dependencies[0]?.url).toContain("%24filter=name+eq+%27x%27");

    const t2 = recordingTelemetry();
    await setup({
      telemetry: t2.telemetry,
      redactUrl: () => {
        throw new Error("bad redactor");
      },
    })
      .client.api("contacts")
      .filter("name eq 'x'")
      .get();
    expect(t2.dependencies[0]?.url).toBe(`${API}/contacts?…`);
  });

  it("defaultRedactUrl handles braces and encoded GUID keys", () => {
    expect(defaultRedactUrl(new URL(`${API}/accounts(%7B${ID}%7D)`))).toBe(`${API}/accounts({id})`);
    expect(defaultRedactUrl(new URL(`${API}/WhoAmI`))).toBe(`${API}/WhoAmI`);
  });
});

describe("#35: TELEMETRY_ENABLED means a telemetry client is configured", () => {
  it("is not set without a client, and is set with one", async () => {
    const without = setup();
    await without.client.api("WhoAmI").get();
    const flagsWithout = FeatureUsageTracker.fromHex(
      without.headers[0]?.["x-ms-feature-usage"] ?? ""
    );
    expect(flagsWithout.hasFeature(FeatureUsageFlag.TELEMETRY_ENABLED)).toBe(false);

    const withClient = setup({ telemetry: recordingTelemetry().telemetry });
    await withClient.client.api("WhoAmI").get();
    const flagsWith = FeatureUsageTracker.fromHex(
      withClient.headers[0]?.["x-ms-feature-usage"] ?? ""
    );
    expect(flagsWith.hasFeature(FeatureUsageFlag.TELEMETRY_ENABLED)).toBe(true);
  });
});

describe("#36: SDK_VERSION comes from package.json", () => {
  it("matches the package version", () => {
    expect(SDK_VERSION).toBe(pkg.version);
  });

  it("is sent in x-ms-sdk-version and reported in telemetry", async () => {
    const t = recordingTelemetry();
    const { client, headers } = setup({ telemetry: t.telemetry });
    await client.api("WhoAmI").get();
    expect(headers[0]?.["x-ms-sdk-version"]).toBe(`dataverse-sdk-js/${pkg.version}`);
    expect(t.dependencies[0]?.properties?.["sdk.version"]).toBe(pkg.version);
  });
});
