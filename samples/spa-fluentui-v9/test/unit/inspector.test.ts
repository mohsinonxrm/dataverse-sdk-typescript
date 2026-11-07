import { describe, expect, it } from "vitest";
import { jsonResponse, throttled } from "@mohsinonxrm/dataverse-sdk-testing";
import { finalUrl } from "../../src/sdk/inspector";
import { withFakeFetch } from "./helpers";

describe("request inspector middleware", () => {
  it("records method, final URL, status, timing and headers, with the token hidden", async () => {
    const { sdk, exchanges, fake } = withFakeFetch();
    fake.on("GET", "/accounts", () => jsonResponse({ value: [] }));

    await sdk.client.api("accounts").select("name").filter("name eq 'A B'").top(2).get();

    expect(exchanges).toHaveLength(1);
    const [e] = exchanges;
    expect(e?.method).toBe("GET");
    // The URL fetch received, query included and encoded as the SDK encodes it.
    expect(e?.url).toBe(fake.last().url);
    expect(e?.url).toContain("$filter=name%20eq%20'A%20B'");
    expect(e?.status).toBe(200);
    expect(e?.durationMs).toBeGreaterThanOrEqual(0);
    expect(e?.attempt).toBe(1);
    expect(e?.requestHeaders.authorization).toBe("Bearer (hidden)");
    expect(e?.responseHeaders?.["x-ms-service-request-id"]).toBeDefined();
  });

  it("records each attempt of a retried request", async () => {
    const { sdk, exchanges, fake } = withFakeFetch();
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u" }));
    fake.on("GET", "/WhoAmI", () => throttled(0), 1);

    await sdk
      .createClient({ retry: { baseDelayMs: 1, jitter: false } })
      .api("WhoAmI")
      .get();

    expect(exchanges.map((e) => [e.status, e.attempt])).toEqual([
      [429, 1],
      [200, 2],
    ]);
  });

  it("records a request that got no response", async () => {
    const { sdk, exchanges } = withFakeFetch();
    const client = sdk.createClient({
      fetchProvider: { fetch: () => Promise.reject(new TypeError("Failed to fetch")) },
      retry: { maxRetries: 0 },
    });

    await expect(client.api("WhoAmI").get()).rejects.toThrow();
    expect(exchanges).toHaveLength(1);
    expect(exchanges[0]?.status).toBeUndefined();
    expect(exchanges[0]?.error).toMatch(/Failed to fetch|ConnectionFailed/);
  });

  it("builds the final URL from url and query", () => {
    expect(
      finalUrl({
        method: "GET",
        url: "https://x/api/accounts",
        headers: {},
        query: { $top: 1, $select: "a,b", skip: undefined },
      })
    ).toBe("https://x/api/accounts?$top=1&$select=a,b");
  });
});
