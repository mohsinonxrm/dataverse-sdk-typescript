/**
 * #52: query options are encoded with encodeURIComponent semantics (`%20`, literal `$`), and a
 * query string the caller already encoded is left untouched.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { buildUrl } from "../src/utils/url.js";

const ORG = "https://contoso.crm.dynamics.com";
const API = `${ORG}/api/data/v9.2`;

function setup() {
  const urls: string[] = [];
  const client = new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 0 },
    fetchProvider: {
      fetch: (input) => {
        urls.push(input instanceof Request ? input.url : input.toString());
        return Promise.resolve(
          new Response('{"value":[]}', { headers: { "content-type": "application/json" } })
        );
      },
    },
  });
  return { client, urls };
}

describe("#52: query encoding", () => {
  it("builder options use %20 and keep $ ' , / : @ = literal", async () => {
    const { client, urls } = setup();
    await client
      .api("accounts")
      .select("name", "accountnumber")
      .filter("name eq 'O''Brien & Co' and createdon ge 2024-01-01T00:00:00Z")
      .top(5)
      .get();
    expect(urls[0]).toBe(
      `${API}/accounts?$select=name,accountnumber` +
        "&$filter=name%20eq%20'O''Brien%20%26%20Co'%20and%20createdon%20ge%202024-01-01T00:00:00Z" +
        "&$top=5"
    );
    expect(urls[0]).not.toContain("+");
  });

  it("values with ' & + # % and non-ASCII round-trip", async () => {
    const { client, urls } = setup();
    const value = "name eq 'a+b & c#1 100% Ünïcode'";
    await client.api("accounts").filter(value).get();
    expect(new URL(urls[0] ?? "").searchParams.get("$filter")).toBe(value);
  });

  it("a caller-encoded query string is kept exactly, and builder options are added after it", async () => {
    const { client, urls } = setup();
    const own = "$filter=name%20eq%20%27O%27%27Brien%20%26%20Co%27&custom=a+b";
    await client.api(`accounts?${own}`).select("name").get();
    expect(urls[0]).toBe(`${API}/accounts?${own}&$select=name`);
  });

  it("an option the builder sets again replaces the caller's", () => {
    expect(
      buildUrl({
        method: "GET",
        url: `${API}/accounts?%24top=1&keep=x+y&$select=old#frag`,
        headers: {},
        query: { $top: 3, $select: "new", skipped: undefined, empty: null },
      })
    ).toBe(`${API}/accounts?keep=x+y&$top=3&$select=new#frag`);
  });

  it("no query options: the URL is unchanged", () => {
    const url = `${API}/accounts?$filter=a%20eq%201`;
    expect(buildUrl({ method: "GET", url, headers: {} })).toBe(url);
    expect(buildUrl({ method: "GET", url, headers: {}, query: { x: undefined } })).toBe(url);
  });

  it("a malformed name in the caller's query is kept as is", () => {
    expect(
      buildUrl({ method: "GET", url: `${API}/accounts?%E0%A4%A=1`, headers: {}, query: { a: 1 } })
    ).toBe(`${API}/accounts?%E0%A4%A=1&a=1`);
  });
});
