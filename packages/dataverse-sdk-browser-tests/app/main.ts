/**
 * Browser smoke app. Imports every browser-facing SDK package, exactly as a consumer SPA would,
 * and exposes small scenarios on `window.__smoke` that the Playwright test drives.
 * Nothing here talks to a real org: requests go to an in-page fake fetch.
 */
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import type { FetchProvider } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { DiscoveryClient } from "@mohsinonxrm/dataverse-sdk-discovery";
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";
import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";
import { MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";
import {
  ApplicationInsightsBrowserTelemetryClient,
  type ApplicationInsightsBrowserConfig,
} from "@mohsinonxrm/dataverse-sdk-appinsights/browser";

const ORG = "https://contoso.crm.dynamics.com";

/** Every CSP violation the page reports. */
const cspViolations: string[] = [];
document.addEventListener("securitypolicyviolation", (e) => {
  cspViolations.push(`${e.violatedDirective}: ${e.blockedURI}`);
});

interface Recorded {
  method: string;
  url: string;
  headers: Record<string, string>;
}

function fakeFetch(respond: (r: Recorded) => Response): {
  provider: FetchProvider;
  calls: Recorded[];
} {
  const calls: Recorded[] = [];
  return {
    calls,
    provider: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const headers: Record<string, string> = {};
        new Headers(init?.headers).forEach((v, k) => {
          headers[k] = v;
        });
        const url =
          typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        const r = { method: (init?.method ?? "GET").toUpperCase(), url, headers };
        calls.push(r);
        return Promise.resolve(respond(r));
      },
    },
  };
}

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

function client(provider: FetchProvider): DataverseClient {
  return new DataverseClient({
    baseUrl: ORG,
    fetchProvider: provider,
    tokenProvider: { getToken: () => Promise.resolve("test-token") },
    retry: { maxRetries: 0 },
  });
}

/** Count console calls made while `fn` runs. */
async function countConsole(fn: () => Promise<unknown>): Promise<number> {
  let n = 0;
  const methods = ["debug", "info", "log", "warn", "error"] as const;
  const saved = new Map(methods.map((m) => [m, Reflect.get(console, m) as unknown]));
  const count = (): void => {
    n++;
  };
  for (const m of methods) Reflect.set(console, m, count);
  try {
    await fn();
  } finally {
    for (const [m, original] of saved) Reflect.set(console, m, original);
  }
  return n;
}

const smoke = {
  /** The packages' entry points evaluated without throwing. */
  loaded: (): Record<string, string> =>
    Object.fromEntries(
      Object.entries({
        DataverseClient,
        MsalBrowserTokenProvider,
        DiscoveryClient,
        BatchRequestBuilder,
        FileColumnClient,
        MetadataClient,
        ApplicationInsightsBrowserTelemetryClient,
      }).map(([name, value]) => [name, typeof value])
    ),

  cspViolations: (): string[] => [...cspViolations],

  /** A GET through the real client and pipeline. */
  async whoAmI(): Promise<{ userId: string; authorization: string | undefined }> {
    const fake = fakeFetch(() => json({ UserId: "u1" }));
    const res = await client(fake.provider).api("WhoAmI").get<{ UserId: string }>();
    return { userId: res.UserId, authorization: fake.calls[0]?.headers.authorization };
  },

  /** Console calls made by one request with the default logger (#33 says this should be 0). */
  async consoleCallsPerRequest(): Promise<number> {
    const fake = fakeFetch(() => json({ UserId: "u1" }));
    const c = new DataverseClient({
      baseUrl: ORG,
      fetchProvider: fake.provider,
      tokenProvider: { getToken: () => Promise.resolve("test-token") },
      retry: { maxRetries: 0 },
    });
    return countConsole(() => c.api("WhoAmI").get());
  },

  /** bindMany() in the bundle, under the page's strict CSP (#20). */
  async bindMany(): Promise<string[]> {
    const fake = fakeFetch(() => new Response(null, { status: 204 }));
    await client(fake.provider)
      .api("accounts(00000000-0000-0000-0000-0000000000a1)")
      .bindMany("contact_customer_accounts", "contacts", ["c1", "c2"]);
    return fake.calls.map(
      (r) => `${r.method} ${new URL(r.url).pathname.split("/").slice(-2).join("/")}`
    );
  },

  /**
   * One request with the Application Insights browser adapter on a stand-in `ApplicationInsights`
   * instance (#158): the dependencies it recorded and the headers the request carried.
   */
  async appInsightsDependency(): Promise<{
    dependencies: Array<{
      name?: string;
      data?: string;
      responseCode: number;
      correlation: unknown;
    }>;
    correlationHeader: string | undefined;
    traceparent: string | undefined;
  }> {
    const recorded: Array<
      Parameters<ApplicationInsightsBrowserConfig["appInsights"]["trackDependencyData"]>[0]
    > = [];
    const appInsights = {
      trackDependencyData: (d: (typeof recorded)[number]) => {
        recorded.push(d);
      },
      trackEvent: () => undefined,
      trackException: () => undefined,
      getTraceCtx: () => null,
    } as unknown as ApplicationInsightsBrowserConfig["appInsights"];
    const fake = fakeFetch(() => json({ value: [] }));
    const c = new DataverseClient({
      baseUrl: ORG,
      fetchProvider: fake.provider,
      tokenProvider: { getToken: () => Promise.resolve("test-token") },
      retry: { maxRetries: 0 },
      telemetry: new ApplicationInsightsBrowserTelemetryClient({ appInsights }),
    });
    await c.api("contacts").filter("emailaddress1 eq 'jane@contoso.com'").get();
    return {
      dependencies: recorded.map((d) => {
        const properties: Record<string, unknown> = d.properties ?? {};
        return {
          name: d.name,
          data: d.data,
          responseCode: d.responseCode,
          correlation: properties["dataverse.correlation_id"],
        };
      }),
      correlationHeader: fake.calls[0]?.headers["x-ms-correlation-id"],
      traceparent: fake.calls[0]?.headers.traceparent,
    };
  },

  /** A file upload from a Blob, as a browser app would do it (#58). Returns the file steps. */
  async uploadBlob(): Promise<string[]> {
    const fake = fakeFetch((r) =>
      new URL(r.url).pathname.endsWith("/EntityDefinitions")
        ? json({ value: [{ LogicalName: "account", PrimaryIdAttribute: "accountid" }] }) // #60
        : r.url.endsWith("/InitializeFileBlocksUpload")
          ? json({ FileContinuationToken: "tok" })
          : r.url.endsWith("/CommitFileBlocksUpload")
            ? json({ FileId: "f1", FileSizeInBytes: 3 })
            : new Response(null, { status: 204 })
    );
    const c = client(fake.provider);
    const files = new FileColumnClient({ send: (req) => c.send(req) }, c.getBaseUrl());
    await files.upload(
      "accounts",
      "00000000-0000-0000-0000-000000000001",
      "new_file",
      new Blob(["abc"], { type: "text/plain" }),
      "a.txt"
    );
    return fake.calls
      .map((r) => new URL(r.url).pathname.split("/").pop() ?? "")
      .filter((step) => step !== "EntityDefinitions");
  },
};

declare global {
  interface Window {
    __smoke: typeof smoke;
  }
}
window.__smoke = smoke;
document.body.dataset.ready = "true";
