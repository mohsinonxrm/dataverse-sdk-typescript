/**
 * #274 live: `buildUrl` in middleware matches what Dataverse was sent, `DiscoveryClient`'s
 * `middleware` option sees discovery requests, and `entityIdFromBatchResponse` reads the ids a
 * `$batch` create returns. Creates one account and one contact, and deletes them afterwards.
 *
 * Assertions compare values as booleans or against values the test made, so a failure never
 * prints the org URL, a hostname or an id.
 */
import { afterAll, describe, expect, it } from "vitest";
import { buildUrl } from "@mohsinonxrm/dataverse-sdk-core";
import type { Logger, Middleware } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder, entityIdFromBatchResponse } from "@mohsinonxrm/dataverse-sdk-batch";
import { DiscoveryClient } from "@mohsinonxrm/dataverse-sdk-discovery";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
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
  for (const [set, id] of created) {
    await client
      .api(`${set}(${id})`)
      .delete()
      .catch(() => undefined);
  }
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

  it("entityIdFromBatchResponse reads the ids $batch creates return", async () => {
    const { client } = liveClient();
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("acct", "POST", "accounts", undefined, { name: `${runId} api-gaps` });
    batch.beginChangeset();
    batch.addRequest(
      "contact",
      "POST",
      "contacts",
      { prefer: "return=representation" },
      { lastname: `${runId} api-gaps` }
    );
    batch.endChangeset();

    const result = await batch.execute();
    const acct = result.responses.get("acct");
    const contact = result.responses.get("contact");
    if (acct) created.unshift(["accounts", idFromEntityId(acct.headers["odata-entityid"] ?? null)]);
    if (contact) {
      created.unshift(["contacts", idFromEntityId(contact.headers["odata-entityid"] ?? null)]);
    }

    expect(result.success).toBe(true);
    expect(acct?.status).toBe(204);
    expect(contact?.status).toBe(201);
    const ids = result.results.map(entityIdFromBatchResponse);
    expect(ids).toEqual([
      idFromEntityId(acct?.headers["odata-entityid"] ?? null),
      idFromEntityId(contact?.headers["odata-entityid"] ?? null),
    ]);
    // With return=representation the body carries the same id.
    expect(ids[1] === (contact?.body as { contactid?: string } | undefined)?.contactid).toBe(true);
  });
});
