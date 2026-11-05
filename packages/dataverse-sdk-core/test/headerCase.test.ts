import { describe, it, expect } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { normalizeHeaders } from "../src/utils/HeaderUtils.js";
import { Prefer } from "../src/abstractions/options.js";
import type { Executable } from "../src/abstractions/executable.js";
import type { FetchProvider, RequestInformation } from "../src/abstractions/http.js";

const BASE_URL = "https://org.crm.dynamics.com";
const API_URL = `${BASE_URL}/api/data/v9.2`;

/** Fake fetch that records the headers exactly as fetch would put them on the wire. */
function recording(): { provider: FetchProvider; sent: () => Headers; rawKeys: () => string[] } {
  let last: RequestInit | undefined;
  return {
    provider: {
      fetch: (_input, init) => {
        last = init;
        return Promise.resolve(new Response(null, { status: 204 }));
      },
    },
    sent: () => new Headers(last?.headers),
    rawKeys: () => Object.keys(last?.headers ?? {}),
  };
}

function client(
  fetchProvider: FetchProvider,
  extra: Partial<ConstructorParameters<typeof DataverseClient>[0]> = {}
) {
  return new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    retry: { maxRetries: 0 },
    ...extra,
  });
}

describe("normalizeHeaders", () => {
  it("lower-cases names and lets the later duplicate win", () => {
    expect(normalizeHeaders({ "Content-Type": "a", "content-type": "b", Accept: "c" })).toEqual({
      "content-type": "b",
      accept: "c",
    });
    expect(normalizeHeaders(undefined)).toEqual({});
  });
});

describe("#9: header names are case-insensitive end to end", () => {
  it("a caller's Content-Type is sent once, without the SDK default appended", async () => {
    const rec = recording();
    await client(rec.provider).send({
      method: "POST",
      url: `${API_URL}/accounts`,
      headers: { "Content-Type": "application/json" },
      body: { name: "x" },
    });
    expect(rec.sent().get("content-type")).toBe("application/json");
    expect(rec.rawKeys().filter((k) => k.toLowerCase() === "content-type")).toHaveLength(1);
  });

  it("a caller's Accept overrides a default Accept with different casing", async () => {
    const rec = recording();
    await client(rec.provider, { defaultHeaders: { Accept: "application/xml" } }).send({
      method: "GET",
      url: `${API_URL}/$metadata`,
      headers: { ACCEPT: "text/plain" },
    });
    expect(rec.sent().get("accept")).toBe("text/plain");
  });

  it("the SDK's bearer token replaces a caller-set Authorization instead of being appended", async () => {
    const rec = recording();
    await client(rec.provider, { tokenProvider: { getToken: () => Promise.resolve("t") } }).send({
      method: "GET",
      url: `${API_URL}/WhoAmI`,
      headers: { Authorization: "Bearer caller" },
    });
    expect(rec.sent().get("authorization")).toBe("Bearer t");
  });

  it("execute() merges a Prefer option into an existing Prefer header with any casing", async () => {
    const rec = recording();
    const action: Executable<void> = {
      toRequestInformation: (baseUrl: string): RequestInformation => ({
        method: "POST",
        url: `${baseUrl}/SomeAction`,
        // Generated actions set "Content-Type" with this casing (#23).
        headers: { "Content-Type": "application/json", Prefer: "return=representation" },
        body: {},
      }),
      parseResponse: () => Promise.resolve(),
    };
    await client(rec.provider).execute(action, {
      prefer: [Prefer.includeAnnotations("*")],
      headers: { "content-type": "application/json" },
    });
    const sent = rec.sent();
    expect(sent.get("prefer")).toBe('return=representation, odata.include-annotations="*"');
    expect(sent.get("content-type")).toBe("application/json");
  });

  it("does not mutate the caller's request object", async () => {
    const rec = recording();
    const request: RequestInformation = {
      method: "GET",
      url: `${API_URL}/WhoAmI`,
      headers: { Accept: "application/json" },
    };
    await client(rec.provider).send(request);
    expect(request.headers).toEqual({ Accept: "application/json" });
  });
});
