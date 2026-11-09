/**
 * #274: `buildUrl` is public, so middleware can read the exact URL `fetch` gets instead of
 * re-encoding `request.query` itself.
 */
import { describe, expect, it } from "vitest";
import * as core from "../src/index.js";
import type { Middleware, RequestInformation } from "../src/index.js";

const ORG = "https://contoso.crm.dynamics.com";
const API = `${ORG}/api/data/v9.2`;

function setup(where: "prepend" | "append") {
  const fetched: string[] = [];
  const seen: string[] = [];
  const inspector: Middleware = {
    name: "inspector",
    execute: (request, ctx, next) => {
      seen.push(core.buildUrl(request));
      return next(request, ctx);
    },
  };
  const client = new core.DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 0 },
    middleware: { [where]: [inspector] },
    fetchProvider: {
      fetch: (input) => {
        fetched.push(input instanceof Request ? input.url : input.toString());
        return Promise.resolve(
          new Response('{"value":[]}', { headers: { "content-type": "application/json" } })
        );
      },
    },
  });
  return { client, fetched, seen };
}

describe("#274: buildUrl is exported", () => {
  it("is a function on the package entry point", () => {
    expect(typeof core.buildUrl).toBe("function");
  });

  it.each(["prepend", "append"] as const)(
    "a %sed middleware sees the exact URL fetch receives",
    async (where) => {
      const { client, fetched, seen } = setup(where);
      await client
        .api("accounts")
        .select("name", "accountnumber")
        .filter("name eq 'O''Brien & Co'")
        .top(5)
        .get();
      const expected =
        `${API}/accounts?$select=name,accountnumber` +
        "&$filter=name%20eq%20'O''Brien%20%26%20Co'&$top=5";
      expect(fetched).toEqual([expected]);
      expect(seen).toEqual([expected]);
    }
  );

  it("keeps a caller-encoded query string and adds `query` after it", () => {
    const url = core.buildUrl({
      method: "GET",
      url: `${API}/accounts?custom=a+b`,
      headers: {},
      query: { $top: 1, $skip: undefined },
    });
    expect(url).toBe(`${API}/accounts?custom=a+b&$top=1`);
  });

  it("does not change the request", () => {
    const req: RequestInformation = {
      method: "GET",
      url: `${API}/accounts`,
      headers: {},
      query: { $select: "name" },
    };
    core.buildUrl(req);
    expect(req).toEqual({
      method: "GET",
      url: `${API}/accounts`,
      headers: {},
      query: { $select: "name" },
    });
  });
});
