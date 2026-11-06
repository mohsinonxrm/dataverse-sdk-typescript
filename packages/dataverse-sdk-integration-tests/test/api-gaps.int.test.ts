/**
 * #274 live: `buildUrl` in middleware matches what Dataverse was sent, `DiscoveryClient`'s
 * `middleware` option sees discovery requests, and `entityIdFromBatchResponse` reads the ids a
 * `$batch` create returns, both a plain create (id in `OData-EntityId`) and a
 * `Prefer: return=representation` create (no id header: the id is in the body). Creates two
 * accounts and two contacts, and deletes exactly those, by the ids Dataverse returned.
 *
 * Assertions compare values as booleans or against values the test made, so a failure never
 * prints the org URL, a hostname or an id.
 */
import { afterAll, describe, expect, it } from "vitest";
import { DataverseClient, buildUrl } from "@mohsinonxrm/dataverse-sdk-core";
import type { Logger, Middleware } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder, entityIdFromBatchResponse } from "@mohsinonxrm/dataverse-sdk-batch";
import { DiscoveryClient } from "@mohsinonxrm/dataverse-sdk-discovery";
import { idFromEntityId, live, liveClient, orgUrl, runId } from "./env.js";

const noop = (): void => undefined;
const quiet: Logger = { debug: noop, info: noop, warn: noop, error: noop };
const created: Array<[string, string]> = [];

/** Records the URL each request will be sent with and the status it got. */
function recorder(seen: Array<{ url: string; status: number }>): Middleware {
  return {
    name: "recorder",
    execute: async (request, ctx, next) => {
      const url = buildUrl(request);
      const res = await next(request, ctx);
      seen.push({ url, status: res.status });
      return res;
    },
  };
}

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  // Delete exactly the records this file created, by the ids Dataverse returned.
  let failed = 0;
  for (const [set, id] of created) {
    await client
      .api(`${set}(${id})`)
      .delete()
      .catch(() => failed++);
  }
  expect(failed).toBe(0);
});

describe.skipIf(!live)("live: small API gaps (#274)", () => {
  it("buildUrl in an appended middleware gives the URL Dataverse answered", async () => {
    const seen: Array<{ url: string; status: number }> = [];
    const { tokenProvider } = liveClient();
    const client = new DataverseClient({
      baseUrl: orgUrl,
      tokenProvider,
      logger: quiet,
      middleware: { append: [recorder(seen)] },
    });
    const name = `${runId} O'Brien & Co`;

    const res = await client
      .api("accounts")
      .select("name")
      .filter(`name eq '${name.replace(/'/g, "''")}'`)
      .top(1)
      .response();

    expect(res.ok).toBe(true);
    expect(seen).toHaveLength(1);
    expect(seen[0]?.status === 200).toBe(true);
    const url = new URL(seen[0]?.url ?? "");
    expect(url.pathname.endsWith("/api/data/v9.2/accounts")).toBe(true);
    expect(url.searchParams.get("$filter")).toBe(`name eq '${name.replace(/'/g, "''")}'`);
    expect(url.searchParams.get("$top")).toBe("1");
  });

  it("DiscoveryClient middleware sees each discovery request", async () => {
    const seen: Array<{ url: string; status: number }> = [];
    const discovery = new DiscoveryClient(liveClient().tokenProvider, {
      logger: quiet,
      middleware: { append: [recorder(seen)] },
    });

    const orgs = await discovery.listOrganizations({ select: ["Url", "ApiUrl"] });

    expect(orgs.length).toBeGreaterThan(0);
    expect(seen.length).toBeGreaterThan(0);
    expect(seen.every((s) => s.status === 200)).toBe(true);
    const first = new URL(seen[0]?.url ?? "");
    expect(first.pathname).toBe("/api/discovery/v2.0/Instances");
    expect(first.searchParams.get("$select")).toBe("Url,ApiUrl");
  });

  it("entityIdFromBatchResponse: a plain create's id from its headers", async () => {
    const { client } = liveClient();
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("top", "POST", "accounts", undefined, { name: `${runId} api-gaps top` });
    batch.beginChangeset();
    batch.addRequest("cs", "POST", "accounts", undefined, { name: `${runId} api-gaps cs` });
    batch.endChangeset();

    const result = await batch.execute();
    // Record each id from the header itself first, so cleanup never depends on the code under test.
    const headerIds = result.results.map((step) =>
      idFromEntityId(step.headers["odata-entityid"] ?? null)
    );
    for (const id of headerIds) created.push(["accounts", id]);

    expect(result.success).toBe(true);
    expect(result.results.map((r) => r.status)).toEqual([204, 204]);
    const ids = result.results.map((r) => entityIdFromBatchResponse(r));
    expect(ids.length === 2 && ids.every((id, i) => id === headerIds[i])).toBe(true);
  });

  it("entityIdFromBatchResponse: a return=representation create's id from its body", async () => {
    const { client } = liveClient();
    const batch = new BatchRequestBuilder(client);
    const prefer = { prefer: "return=representation" };
    batch.addRequest("top", "POST", "contacts", prefer, { lastname: `${runId} api-gaps top` });
    batch.beginChangeset();
    batch.addRequest("cs", "POST", "contacts", prefer, { lastname: `${runId} api-gaps cs` });
    batch.endChangeset();

    const result = await batch.execute();
    const bodyIds = result.results.map(
      (r) => (r.body as { contactid?: string } | undefined)?.contactid
    );
    for (const id of bodyIds) if (id) created.push(["contacts", id]);

    expect(result.success).toBe(true);
    expect(result.results.map((r) => r.status)).toEqual([201, 201]);
    // Dataverse sends no OData-EntityId or Location for these, inside a change set or not.
    for (const r of result.results) {
      expect(r.headers["odata-entityid"] === undefined).toBe(true);
      expect(r.headers.location === undefined).toBe(true);
      expect(() => entityIdFromBatchResponse(r)).toThrow(/primaryIdAttribute/);
    }
    const ids = result.results.map((r) =>
      entityIdFromBatchResponse(r, { primaryIdAttribute: "contactid" })
    );
    expect(ids.length === 2 && ids.every((id, i) => id === bodyIds[i])).toBe(true);
  });
});
