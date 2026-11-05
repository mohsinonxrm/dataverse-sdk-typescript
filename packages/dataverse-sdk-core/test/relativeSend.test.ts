import { describe, it, expect } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { FetchProvider } from "../src/abstractions/http.js";

const BASE_URL = "https://org.crm.dynamics.com";

function setup(apiVersion?: `v${number}.${number}`) {
  const urls: string[] = [];
  const fetchProvider: FetchProvider = {
    fetch: (input) => {
      urls.push(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
      return Promise.resolve(
        new Response("{}", { status: 200, headers: { "content-type": "application/json" } })
      );
    },
  };
  const client = new DataverseClient({ baseUrl: BASE_URL, fetchProvider, apiVersion });
  return { client, urls };
}

describe("#31: send() accepts URLs relative to the Web API root", () => {
  it.each([
    ["WhoAmI", "/api/data/v9.2/WhoAmI"],
    ["/WhoAmI", "/api/data/v9.2/WhoAmI"],
    [
      "accounts(00000000-0000-0000-0000-000000000001)?$select=name",
      "/api/data/v9.2/accounts(00000000-0000-0000-0000-000000000001)",
    ],
  ])("resolves %s", async (url, path) => {
    const { client, urls } = setup();
    const res = await client.send({ method: "GET", url, headers: {} });
    expect(res.status).toBe(200);
    expect(new URL(urls[0] ?? "").pathname).toBe(path);
  });

  it("keeps an absolute URL unchanged", async () => {
    const { client, urls } = setup();
    await client.send({ method: "GET", url: `${BASE_URL}/api/data/v9.2/WhoAmI`, headers: {} });
    expect(urls[0]).toBe(`${BASE_URL}/api/data/v9.2/WhoAmI`);
  });

  it("resolveUrl() is public and matches what send() and the builder use", async () => {
    const { client, urls } = setup();
    expect(client.resolveUrl("/accounts")).toBe(`${BASE_URL}/api/data/v9.2/accounts`);
    await client.api("accounts").get();
    expect(urls[0]).toBe(`${BASE_URL}/api/data/v9.2/accounts`);
  });

  it("apiVersion selects the Web API version for send() and the builder", async () => {
    const { client, urls } = setup("v9.1");
    expect(client.getBaseUrl()).toBe(`${BASE_URL}/api/data/v9.1`);
    await client.send({ method: "GET", url: "WhoAmI", headers: {} });
    await client.api("WhoAmI").get();
    expect(urls).toEqual([`${BASE_URL}/api/data/v9.1/WhoAmI`, `${BASE_URL}/api/data/v9.1/WhoAmI`]);
  });
});
