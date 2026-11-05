import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { DataverseODataError, parseClaimsChallenge } from "../src/index.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";
import type { FetchProvider, TokenOptions } from "../src/abstractions/http.js";

const BASE_URL = "https://contoso.crm.dynamics.com";
const CLAIMS = '{"access_token":{"nbf":{"essential":true,"value":"1700000000"}}}';
const CLAIMS_B64 = btoa(CLAIMS);

const ok = () =>
  new Response('{"UserId":"u1"}', { status: 200, headers: { "content-type": "application/json" } });
const unauthorized = (wwwAuthenticate?: string) =>
  new Response('{"error":{"code":"0x80072560","message":"Unauthorized"}}', {
    status: 401,
    headers: {
      "content-type": "application/json",
      ...(wwwAuthenticate ? { "www-authenticate": wwwAuthenticate } : {}),
    },
  });

function setup(steps: Response[], options: Partial<DataverseClientOptions> = {}) {
  const tokenCalls: Array<TokenOptions | undefined> = [];
  const sent: Array<{ authorization: string | null; correlationId: string | null }> = [];
  const fetchProvider: FetchProvider = {
    fetch: (_input, init) => {
      const h = new Headers(init?.headers);
      sent.push({
        authorization: h.get("authorization"),
        correlationId: h.get("x-ms-correlation-id"),
      });
      const step = steps.at(Math.min(sent.length - 1, steps.length - 1));
      return Promise.resolve(step ? step.clone() : ok());
    },
  };
  const client = new DataverseClient({
    baseUrl: BASE_URL,
    fetchProvider,
    tokenProvider: {
      getToken: (_scopes, opts) => {
        tokenCalls.push(opts);
        return Promise.resolve(`tok${String(tokenCalls.length)}`);
      },
    },
    retry: { baseDelayMs: 1, maxDelayMs: 1 },
    ...options,
  });
  return { client, tokenCalls, sent };
}

describe("#21: a token for every attempt", () => {
  it("a retried request gets a token per attempt", async () => {
    const { client, tokenCalls, sent } = setup([
      new Response(null, { status: 503 }),
      new Response(null, { status: 503 }),
      ok(),
    ]);
    await client.api("WhoAmI").get();
    expect(sent.map((s) => s.authorization)).toEqual(["Bearer tok1", "Bearer tok2", "Bearer tok3"]);
    expect(tokenCalls).toHaveLength(3);
  });

  it("passes the request's correlation id to the token provider", async () => {
    const { client, tokenCalls, sent } = setup([ok()]);
    await client.api("WhoAmI").get();
    expect(tokenCalls[0]?.correlationId).toBe(sent[0]?.correlationId);
  });
});

describe("#21: one recovery after a 401", () => {
  it("without a claims challenge: one forced refresh, then one retry", async () => {
    const { client, tokenCalls, sent } = setup([
      unauthorized('Bearer authorization_uri="x"'),
      ok(),
    ]);
    await expect(client.api("WhoAmI").get()).resolves.toEqual({ UserId: "u1" });
    expect(sent.map((s) => s.authorization)).toEqual(["Bearer tok1", "Bearer tok2"]);
    expect(tokenCalls[1]).toMatchObject({ forceRefresh: true });
    expect(tokenCalls[1]?.claims).toBeUndefined();
  });

  it("with a claims challenge: exactly one re-acquisition with those claims, then one retry", async () => {
    const { client, tokenCalls, sent } = setup([
      unauthorized(`Bearer realm="", error="insufficient_claims", claims="${CLAIMS_B64}"`),
      ok(),
    ]);
    await client.api("WhoAmI").get();
    expect(tokenCalls).toHaveLength(2);
    expect(tokenCalls[1]).toMatchObject({ claims: CLAIMS });
    expect(tokenCalls[1]?.forceRefresh).toBeUndefined();
    expect(sent).toHaveLength(2);
  });

  it("a second 401 is returned as the error, with no loop", async () => {
    const { client, tokenCalls, sent } = setup([
      unauthorized("Bearer x"),
      unauthorized("Bearer x"),
    ]);
    const err = await client
      .api("WhoAmI")
      .get()
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect((err as DataverseODataError).status).toBe(401);
    expect((err as DataverseODataError).headers?.["www-authenticate"]).toBe("Bearer x");
    expect(sent).toHaveLength(2);
    expect(tokenCalls).toHaveLength(2);
  });

  it("refreshTokenOn401: false turns it off", async () => {
    const { client, sent } = setup([unauthorized(), ok()], { refreshTokenOn401: false });
    await expect(client.api("WhoAmI").get()).rejects.toMatchObject({ status: 401 });
    expect(sent).toHaveLength(1);
  });

  it("a stream body is not resent", async () => {
    const { client, sent } = setup([unauthorized(), ok()]);
    const body = new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(new TextEncoder().encode("{}"));
        c.close();
      },
    });
    const res = await client.send({ method: "POST", url: "accounts", headers: {}, body });
    expect(res.status).toBe(401);
    expect(sent).toHaveLength(1);
  });
});

describe("#21: parseClaimsChallenge", () => {
  it.each([
    [`Bearer error="insufficient_claims", claims="${CLAIMS_B64}"`, CLAIMS],
    [
      `Bearer claims="${CLAIMS_B64.replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_")}"`,
      CLAIMS,
    ],
    ['Bearer authorization_uri="https://login.microsoftonline.com/x"', undefined],
    [null, undefined],
  ])("%s", (header, expected) => {
    expect(parseClaimsChallenge(header)).toBe(expected);
  });
});
