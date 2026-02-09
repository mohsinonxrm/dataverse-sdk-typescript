import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { DataverseClient } from "../src/client/DataverseClient.js";

const BASE_URL = "https://org.crm.dynamics.com";
const API_URL = `${BASE_URL}/api/data/v9.2`;

const server = setupServer();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("DataverseClient", () => {
  it("constructs with baseUrl normalization", () => {
    const client1 = new DataverseClient({ baseUrl: BASE_URL });
    expect(client1.getBaseUrl()).toBe(API_URL);

    const client2 = new DataverseClient({ baseUrl: `${BASE_URL}/api/data/v9.2` });
    expect(client2.getBaseUrl()).toBe(API_URL);

    const client3 = new DataverseClient({ baseUrl: BASE_URL, apiVersion: "v9.1" });
    expect(client3.getBaseUrl()).toBe(`${BASE_URL}/api/data/v9.1`);
  });

  it("performs GET request", async () => {
    server.use(
      http.get(`${API_URL}/accounts`, () => {
        return HttpResponse.json({ value: [{ accountid: "123", name: "Test" }] });
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    const result = await client.api("accounts").get();

    expect(result).toEqual({ value: [{ accountid: "123", name: "Test" }] });
  });

  it("builds query string correctly", async () => {
    let capturedUrl = "";
    server.use(
      http.get(`${API_URL}/accounts`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json({ value: [] });
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    await client
      .api("accounts")
      .select("accountid", "name")
      .filter("revenue gt 1000")
      .top(10)
      .get();

    const url = new URL(capturedUrl);
    expect(url.searchParams.get("$select")).toBe("accountid,name");
    expect(url.searchParams.get("$filter")).toBe("revenue gt 1000");
    expect(url.searchParams.get("$top")).toBe("10");
  });

  it("adds Prefer header", async () => {
    let capturedPrefer: string | null = "";
    server.use(
      http.post(`${API_URL}/accounts`, ({ request }) => {
        capturedPrefer = request.headers.get("prefer");
        return HttpResponse.json({ accountid: "123" }, { status: 201 });
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    await client.api("accounts").preferRaw("return=representation").post({ name: "Test" });

    expect(capturedPrefer).toContain("return=representation");
  });

  it("handles impersonation and If-Match headers", async () => {
    let capturedHeaders: Record<string, string> = {};
    server.use(
      http.patch(`${API_URL}/accounts*`, ({ request }) => {
        capturedHeaders = Object.fromEntries(request.headers.entries());
        return new HttpResponse(null, { status: 204 });
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    await client
      .api("accounts(123)")
      .impersonate("user-id-here")
      .ifMatch("etag-value")
      .patch({ name: "Updated" });

    expect(capturedHeaders.mscrmcallerid).toBe("user-id-here");
    expect(capturedHeaders["if-match"]).toBe("etag-value");
  });
});
