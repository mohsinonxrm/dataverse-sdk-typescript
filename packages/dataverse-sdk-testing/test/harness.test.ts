import { describe, it, expect } from "vitest";
import {
  TEST_API_URL,
  batchResponse,
  createFakeFetch,
  createTestClient,
  jsonResponse,
  noContent,
} from "../src/index.js";

describe("createFakeFetch", () => {
  it("records method, path, lower-cased headers and body bytes", async () => {
    const fake = createFakeFetch();
    fake.on("POST", "/accounts", () => noContent());
    await fake.fetchProvider.fetch(`${TEST_API_URL}/accounts?$select=name`, {
      method: "post",
      headers: { "Content-Type": "application/json", Prefer: "return=minimal" },
      body: new Uint8Array([104, 105]),
    });
    const r = fake.last();
    expect(r.method).toBe("POST");
    expect(r.path).toBe("/accounts?$select=name");
    expect(r.headers).toEqual({ "content-type": "application/json", prefer: "return=minimal" });
    expect(r.bodyText).toBe("hi");
    expect(r.rawBody).toBeInstanceOf(Uint8Array);
  });

  it("joins duplicate header names the way fetch sends them", async () => {
    const fake = createFakeFetch();
    fake.on("GET", "/x", () => noContent());
    await fake.fetchProvider.fetch(`${TEST_API_URL}/x`, {
      headers: [
        ["Accept", "application/json"],
        ["accept", "text/plain"],
      ],
    });
    expect(fake.last().headers.accept).toBe("application/json, text/plain");
  });

  it("prefers later routes, honours `times`, and throws on unhandled requests", async () => {
    const fake = createFakeFetch();
    fake.on("GET", /^\/accounts/, () => jsonResponse({ n: 1 }));
    fake.on("GET", "/accounts", () => jsonResponse({ n: 2 }), 1);
    const first = (await (await fake.fetchProvider.fetch(`${TEST_API_URL}/accounts`)).json()) as {
      n: number;
    };
    const second = (await (await fake.fetchProvider.fetch(`${TEST_API_URL}/accounts`)).json()) as {
      n: number;
    };
    expect([first.n, second.n]).toEqual([2, 1]);
    await expect(fake.fetchProvider.fetch(`${TEST_API_URL}/contacts`)).rejects.toThrow(
      /Unhandled fake fetch request: GET/
    );
  });

  it("rejects like fetch when the signal is already aborted", async () => {
    const fake = createFakeFetch();
    const controller = new AbortController();
    controller.abort();
    await expect(
      fake.fetchProvider.fetch(`${TEST_API_URL}/x`, { signal: controller.signal })
    ).rejects.toMatchObject({ name: "AbortError" });
    expect(fake.requests).toHaveLength(0);
  });
});

describe("batchResponse", () => {
  it("builds a Dataverse-style multipart response with a change set", async () => {
    const res = batchResponse([
      { status: 200, body: { value: [] } },
      { changeset: [{ status: 204, contentId: "1", headers: { "OData-EntityId": "x" } }] },
    ]);
    expect(res.headers.get("content-type")).toMatch(/^multipart\/mixed; boundary=batchresponse_/);
    const text = await res.text();
    expect(text).toContain("HTTP/1.1 200 OK\r\n");
    expect(text).toContain("Content-Type: multipart/mixed; boundary=changesetresponse_");
    expect(text).toContain("Content-ID: 1\r\n\r\nHTTP/1.1 204 No Content\r\n");
    expect(text.trimEnd().endsWith("--")).toBe(true);
  });
});

describe("createTestClient", () => {
  it("drives a real DataverseClient through the fake fetch", async () => {
    const { client, fake, tokenProvider } = createTestClient();
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));
    const res = await client.api("WhoAmI").get<{ UserId: string }>();
    expect(res.UserId).toBe("u1");
    expect(fake.last().headers.authorization).toBe("Bearer test-token");
    expect(fake.last().headers["odata-version"]).toBe("4.0");
    expect(tokenProvider.calls).toEqual([undefined]);
  });
});
