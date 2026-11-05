/**
 * #21 live: a 401 from the real org is recovered by one new token and one resend. The first
 * token is deliberately invalid (an expired/revoked token in real life). Nothing is created.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import type { TokenOptions } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, orgUrl } from "./env.js";

describe.skipIf(!live)("live: 401 recovery (#21)", () => {
  it("an invalid first token is replaced after the 401 and the request succeeds", async () => {
    const { tokenProvider } = liveClient();
    const calls: Array<TokenOptions | undefined> = [];
    const statuses: number[] = [];
    const noop = (): void => undefined;
    const client = new DataverseClient({
      baseUrl: orgUrl,
      logger: { debug: noop, info: noop, warn: noop, error: noop },
      tokenProvider: {
        getToken: (scopes, options) => {
          calls.push(options);
          return calls.length === 1
            ? Promise.resolve("not-a-valid-token")
            : tokenProvider.getToken(scopes, options);
        },
      },
      middleware: {
        append: [
          {
            name: "status-recorder",
            execute: async (request, ctx, next) => {
              const res = await next(request, ctx);
              statuses.push(res.status);
              return res;
            },
          },
        ],
      },
    });

    const me = await client.api("WhoAmI").get<{ UserId: string }>();
    expect(me.UserId).toMatch(/^[0-9a-f-]{36}$/i);
    expect(statuses).toEqual([401, 200]);
    expect(calls).toHaveLength(2);
    expect(calls[1]?.forceRefresh).toBe(true);
  });
});
