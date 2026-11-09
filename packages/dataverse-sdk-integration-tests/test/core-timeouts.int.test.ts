/**
 * #46 live: `timeoutMs` is a deadline for the whole request. Nothing is created.
 */
import { describe, expect, it } from "vitest";
import { DataverseNetworkError } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient } from "./env.js";

describe.skipIf(!live)("live: request deadline (#46)", () => {
  it("a request that answers in time succeeds, and a shared signal can be reused", async () => {
    const { client } = liveClient();
    const shared = new AbortController();
    for (let i = 0; i < 3; i++) {
      const me = await client
        .api("WhoAmI")
        .get<{ UserId: string }>({ timeoutMs: 30_000, signal: shared.signal });
      expect(me.UserId).toMatch(/^[0-9a-f-]{36}$/);
    }
  });

  it("a deadline that passes rejects with RequestTimeout", async () => {
    const { client } = liveClient();
    const err = await client
      .api("WhoAmI")
      .get({ timeoutMs: 1 })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseNetworkError);
    expect(err).toMatchObject({ name: "RequestTimeout" });
  });
});
