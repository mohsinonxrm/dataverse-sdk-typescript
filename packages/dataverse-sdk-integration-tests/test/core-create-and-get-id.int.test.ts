/**
 * Live tests for #289: `createAndGetId()` returns the new record's id with and without
 * `Prefer: return=representation`, and doesn't hang when middleware tees the response body.
 * Every record created here is deleted by the exact id the call returned.
 */
import { afterAll, describe, expect, it } from "vitest";
import { DataverseClient, Prefer } from "@mohsinonxrm/dataverse-sdk-core";
import type { Middleware } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, orgUrl, runId } from "./env.js";

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const created: string[] = [];

/** Tees every response body and never reads its copy, as a body-reading logger can. */
const teeing: Middleware = {
  name: "TeeingLogger",
  async execute(request, ctx, next) {
    const res = await next(request, ctx);
    void res.clone();
    return res;
  },
};

/** The created account, read back by its id. */
async function nameOf(id: string): Promise<string> {
  const { client } = liveClient();
  const row = await client.api(`accounts(${id})`).select("name").get<{ name: string }>();
  return row.name;
}

describe.skipIf(!live)("live: createAndGetId() (#289)", () => {
  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const id of created) await client.api(`accounts(${id})`).delete();
  });

  it("a plain create returns the id from OData-EntityId", async () => {
    const { client } = liveClient();
    const name = `${runId} 289 plain`;
    const id = await client.api("accounts").createAndGetId({ name });
    created.push(id);
    expect(GUID.test(id)).toBe(true);
    expect(await nameOf(id)).toBe(name);
  });

  it("a return=representation create returns the id from the body", async () => {
    const { client } = liveClient();
    const name = `${runId} 289 representation`;
    const id = await client
      .api("accounts")
      .createAndGetId(
        { name },
        { prefer: [Prefer.returnRepresentation()], primaryIdAttribute: "accountid" }
      );
    created.push(id);
    expect(GUID.test(id)).toBe(true);
    expect(await nameOf(id)).toBe(name);
  });

  it("doesn't hang when middleware tees the body", async () => {
    const noop = (): void => undefined;
    const client = new DataverseClient({
      baseUrl: orgUrl,
      tokenProvider: liveClient().tokenProvider,
      logger: { debug: noop, info: noop, warn: noop, error: noop },
      middleware: { prepend: [teeing] },
    });
    const name = `${runId} 289 teed`;
    const id = await client
      .api("accounts")
      .createAndGetId(
        { name },
        { prefer: [Prefer.returnRepresentation()], primaryIdAttribute: "accountid" }
      );
    created.push(id);
    expect(GUID.test(id)).toBe(true);
    expect(await nameOf(id)).toBe(name);
  }, 30_000);
});
