import { describe, it, expect } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { entityIdFromResponse } from "../src/utils/response.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://org.crm.dynamics.com";
const API_URL = `${BASE_URL}/api/data/v9.2`;
const ID = "00000000-0000-0000-0000-000000000001";

function clientReturning(make: () => Response): DataverseClient {
  const fetchProvider: FetchProvider = { fetch: () => Promise.resolve(make()) };
  return new DataverseClient({ baseUrl: BASE_URL, fetchProvider, retry: { maxRetries: 0 } });
}

const created = () =>
  new Response(null, {
    status: 204,
    headers: { "odata-entityid": `${API_URL}/accounts(${ID})`, etag: 'W/"1"' },
  });

describe("#11: response bodies, status and headers", () => {
  it("get() resolves undefined for 204 No Content and for an empty body", async () => {
    await expect(
      clientReturning(() => new Response(null, { status: 204 }))
        .api("x")
        .get()
    ).resolves.toBeUndefined();
    await expect(
      clientReturning(() => new Response("", { status: 200 }))
        .api("x")
        .get()
    ).resolves.toBeUndefined();
  });

  it("get() parses JSON, including odata.metadata content types", async () => {
    const client = clientReturning(
      () =>
        new Response('{"a":1}', {
          headers: { "content-type": "application/json; odata.metadata=minimal" },
        })
    );
    await expect(client.api("x").get()).resolves.toEqual({ a: 1 });
  });

  it("get() rejects a non-JSON body with a pointer to text()/blob()", async () => {
    const client = clientReturning(
      () => new Response("<edmx:Edmx/>", { headers: { "content-type": "application/xml" } })
    );
    await expect(client.api("$metadata").get()).rejects.toMatchObject({
      name: "UnexpectedContentType",
      message: expect.stringContaining(".text()") as unknown,
    });
  });

  it("text(), blob() and arrayBuffer() return non-JSON bodies", async () => {
    const xml = () =>
      new Response("<edmx:Edmx/>", { headers: { "content-type": "application/xml" } });
    await expect(clientReturning(xml).api("$metadata").text()).resolves.toBe("<edmx:Edmx/>");
    const bin = () =>
      new Response(new Uint8Array([1, 2, 3]), {
        headers: { "content-type": "application/octet-stream" },
      });
    const blob = await clientReturning(bin).api(`accounts(${ID})/file/$value`).blob();
    expect(Array.from(new Uint8Array(await blob.arrayBuffer()))).toEqual([1, 2, 3]);
    const ab = await clientReturning(bin).api(`accounts(${ID})/file/$value`).arrayBuffer();
    expect(ab.byteLength).toBe(3);
  });

  it("response() returns the raw Response, including headers, and doesn't reject on non-2xx", async () => {
    const ok = await clientReturning(created).api("accounts").response("POST", { name: "x" });
    expect(ok.status).toBe(204);
    expect(ok.headers.get("etag")).toBe('W/"1"');
    expect(entityIdFromResponse(ok)).toBe(ID);

    const notFound = await clientReturning(
      () => new Response('{"error":{"code":"0x80040217","message":"nope"}}', { status: 404 })
    )
      .api(`accounts(${ID})`)
      .response();
    expect(notFound.status).toBe(404);
  });

  it("createAndGetId() returns the id from OData-EntityId without return=representation", async () => {
    await expect(
      clientReturning(created).api("accounts").createAndGetId({ name: "x" })
    ).resolves.toBe(ID);
    await expect(
      clientReturning(() => new Response(null, { status: 204 }))
        .api("accounts")
        .createAndGetId({ name: "x" })
    ).rejects.toThrow(/OData-EntityId/);
  });

  it("post() with return=representation still parses the returned record", async () => {
    const client = clientReturning(
      () =>
        new Response(`{"accountid":"${ID}"}`, {
          status: 201,
          headers: { "content-type": "application/json" },
        })
    );
    await expect(client.api("accounts").post({ name: "x" })).resolves.toEqual({ accountid: ID });
  });
});
