/**
 * Sharing a request as a link and copying it as curl, fetch or C#: the link round-trips, refuses
 * what it shouldn't open, and never holds a token; the generated code escapes what it must and
 * never holds a token either.
 */
import { describe, expect, it } from "vitest";
import {
  copyAs,
  copyHeaders,
  csharpRawString,
  csharpString,
  ORG_PLACEHOLDER,
  shellQuote,
  toCSharp,
  toCurl,
  toFetch,
  withOrigin,
  type CopyAsRequest,
} from "../../src/explorer/copyAs";
import { previewRequests } from "../../src/explorer/preview";
import { parseRawRequest, runRawPlan } from "../../src/explorer/rawRequest";
import {
  canCompress,
  decodeShare,
  encodeShare,
  isSecretHeader,
  MAX_LINK_LENGTH,
  shareLink,
  sharePayload,
  ShareError,
  sharedRequestRisks,
  withoutSecretHeaders,
  type SharedRequest,
} from "../../src/explorer/share";
import type { RawRequestInput } from "../../src/explorer/types";

const ORG = "https://contoso.crm.dynamics.com";
const API = `${ORG}/api/data/v9.2`;

const raw = (extra: Partial<RawRequestInput> = {}): SharedRequest => ({
  type: "raw",
  request: { method: "GET", url: "accounts?$top=3", headers: "", body: "", ...extra },
});

/** The JSON inside a payload, read without the validation decodeShare() applies. */
function payloadJson(payload: string): unknown {
  expect(payload.startsWith("j.")).toBe(true);
  const base64 = payload.slice(2).replace(/-/g, "+").replace(/_/g, "/");
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

/** A payload holding `text`, uncompressed, without the checks encodeShare() applies. */
function textPayload(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return `j.${btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`;
}

const plainPayload = (value: unknown) => textPayload(JSON.stringify(value));

async function deflated(text: string): Promise<string> {
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream("deflate-raw"));
  const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return `z.${btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`;
}

const rejects = (payload: string, message: RegExp) =>
  expect(decodeShare(payload)).rejects.toThrow(message);

describe("share: round trip", () => {
  it("round-trips a raw request: method, URL with & and # in values, headers, unicode body", async () => {
    const shared = raw({
      method: "POST",
      url: "accounts?$filter=name eq 'A&B #1'&$select=name",
      headers: 'Prefer: return=representation\nIf-Match: W/"123"',
      body: '{"name":"Ünïcødé ✓ \\"quoted\\"\\nline","emoji":"🚀"}',
    });
    for (const compress of [true, false]) {
      const payload = await encodeShare(shared, { compress });
      expect(payload).toMatch(/^[zj]\.[A-Za-z0-9_-]+$/);
      await expect(decodeShare(payload)).resolves.toEqual(shared);
    }
  });

  it("compresses when the browser can, and the link is fragment-only", async () => {
    expect(canCompress()).toBe(true);
    const shared = raw({ url: `accounts?$select=${"name,".repeat(200)}accountid` });
    const payload = await encodeShare(shared);
    expect(payload.startsWith("z.")).toBe(true);
    const link = shareLink("https://explorer.example", payload);
    expect(link).toBe(`https://explorer.example/explorer#r=${payload}`);
    expect(new URL(link).search).toBe("");
    expect(sharePayload(new URL(link).hash)).toBe(payload);
    expect(sharePayload("#main")).toBeUndefined();
    expect(sharePayload("")).toBeUndefined();
  });

  it("round-trips a typed operation: kind, name, arguments, parameters and code style", async () => {
    const shared: SharedRequest = {
      type: "operation",
      operation: { kind: "functions", name: "RetrieveTotalRecordCount" },
      input: { args: {}, parameters: { EntityNames: '["account", "contact"]' } },
      flavour: "service",
    };
    await expect(decodeShare(await encodeShare(shared))).resolves.toEqual(shared);
    // Empty values are left out of the link.
    const sparse: SharedRequest = {
      type: "operation",
      operation: { kind: "actions", name: "WinOpportunity" },
      input: { args: { id: "" }, parameters: { Status: "3", Subject: "" } },
    };
    await expect(decodeShare(await encodeShare(sparse))).resolves.toEqual({
      ...sparse,
      input: { args: {}, parameters: { Status: "3" } },
    });
  });

  it("makes an absolute URL relative, so the environment isn't in the link", async () => {
    const shared = raw({ url: `${API}/contacts?$top=1` });
    const json = payloadJson(await encodeShare(shared, { environmentUrl: ORG, compress: false }));
    expect(json).toEqual({ v: 1, t: "raw", m: "GET", u: "contacts?$top=1" });
    // An absolute URL of another host loses its host too.
    const other = payloadJson(
      await encodeShare(raw({ url: "https://evil.example/api/data/v9.2/x?y=1" }), {
        environmentUrl: ORG,
        compress: false,
      })
    );
    expect(JSON.stringify(other)).not.toContain("evil.example");
  });

  it("includes the environment URL only when asked", async () => {
    const without = await encodeShare(raw(), { environmentUrl: ORG, compress: false });
    expect(JSON.stringify(payloadJson(without))).not.toContain("contoso");
    const withEnv = await encodeShare(raw(), {
      environmentUrl: ORG,
      includeEnvironment: true,
      compress: false,
    });
    await expect(decodeShare(withEnv)).resolves.toMatchObject({ environmentUrl: ORG });
    // An environment on the request itself isn't shared unless asked either.
    const sneaky = await encodeShare({ ...raw(), environmentUrl: ORG }, { compress: false });
    expect(JSON.stringify(payloadJson(sneaky))).not.toContain("contoso");
  });
});

describe("share: never a secret", () => {
  it("knows the secret headers", () => {
    for (const name of [
      "Authorization",
      "authorization",
      "Proxy-Authorization",
      "Cookie",
      "X-API-Key",
      "Ocp-Apim-Subscription-Key",
      "x-ms-token-aad-access-token",
    ])
      expect(isSecretHeader(name), name).toBe(true);
    for (const name of ["Prefer", "If-Match", "MSCRMCallerID", "Consistency"])
      expect(isSecretHeader(name), name).toBe(false);
  });

  it("drops the token and secret headers from a link, even when they were typed", async () => {
    const shared = raw({
      headers: [
        "Authorization: Bearer eyJ0eXAiOiJKV1Qi.secret.token",
        "Prefer: odata.include-annotations=*",
        "cookie: session=abc123",
        "X-Api-Key: k-123",
      ].join("\n"),
    });
    const payload = await encodeShare(shared, { compress: false });
    const text = JSON.stringify(payloadJson(payload));
    for (const secret of ["eyJ0eXAi", "secret.token", "abc123", "k-123", "Authorization"])
      expect(text).not.toContain(secret);
    await expect(decodeShare(payload)).resolves.toEqual(
      raw({ headers: "Prefer: odata.include-annotations=*" })
    );
  });

  it("drops secret headers from a crafted link as it is opened", async () => {
    const payload = plainPayload({
      v: 1,
      t: "raw",
      m: "GET",
      u: "accounts",
      h: "Authorization: Bearer attacker\nPrefer: return=representation",
    });
    await expect(decodeShare(payload)).resolves.toEqual(
      raw({ url: "accounts", headers: "Prefer: return=representation" })
    );
    expect(withoutSecretHeaders("Cookie: a=b\n# a comment\nPrefer: x")).toBe(
      "# a comment\nPrefer: x"
    );
  });
});

describe("share: untrusted input", () => {
  it("refuses links that are empty, damaged, or of an unknown format", async () => {
    await rejects("", /empty/);
    await rejects("x.abc", /format/);
    await rejects("j.***", /damaged/);
    await rejects("j.bm90IGpzb24", /valid JSON/);
    await rejects("z.AAAA", /damaged/);
    await rejects(plainPayload([1, 2]), /doesn't hold a request/);
    await rejects(plainPayload("text"), /doesn't hold a request/);
  });

  it("refuses an unknown version, kind or field", async () => {
    await rejects(plainPayload({ v: 2, t: "raw", m: "GET", u: "x" }), /newer version/);
    await rejects(plainPayload({ t: "raw", m: "GET", u: "x" }), /format/);
    await rejects(plainPayload({ v: 1, t: "batch" }), /kind of request/);
    await rejects(plainPayload({ v: 1, t: "raw", m: "GET", u: "x", run: true }), /run/);
  });

  it("refuses invalid fields", async () => {
    const base = { v: 1, t: "raw", m: "GET", u: "accounts" };
    await rejects(plainPayload({ ...base, m: "TRACE" }), /method "TRACE"/);
    await rejects(plainPayload({ ...base, m: 1 }), /method isn't text/);
    await rejects(plainPayload({ ...base, u: "" }), /no URL/);
    await rejects(plainPayload({ ...base, u: "https://evil.example/x" }), /relative/);
    await rejects(plainPayload({ ...base, u: "//evil.example/x" }), /relative/);
    await rejects(plainPayload({ ...base, u: "javascript:alert(1)" }), /relative/);
    await rejects(plainPayload({ ...base, u: "accounts\nHost: x" }), /control/);
    await rejects(plainPayload({ ...base, h: "Prefer: a\u0000b" }), /control/);
    await rejects(plainPayload({ ...base, b: { name: "x" } }), /body isn't text/);
    await rejects(plainPayload({ ...base, e: "https://evil.example" }), /environment/);
    await rejects(plainPayload({ ...base, e: "http://contoso.crm.dynamics.com" }), /environment/);

    const op = { v: 1, t: "op", k: "functions", n: "WhoAmI" };
    await rejects(plainPayload({ ...op, k: "plugins" }), /package "plugins"/);
    await rejects(plainPayload({ ...op, n: "Who Am I" }), /operation name/);
    await rejects(plainPayload({ ...op, f: "python" }), /code style/);
    await rejects(plainPayload({ ...op, p: ["a"] }), /parameters aren't/);
    await rejects(plainPayload({ ...op, p: { "a b": "1" } }), /parameters name/);
    await rejects(plainPayload({ ...op, p: { Count: 1 } }), /"Count" isn't text/);
    await rejects(
      textPayload('{"v":1,"t":"op","k":"functions","n":"WhoAmI","p":{"__proto__":"x"}}'),
      /parameters name/
    );
    await rejects(plainPayload({ ...op, a: { [`a${"x".repeat(300)}`]: "1" } }), /arguments name/);
    const many = Object.fromEntries(Array.from({ length: 201 }, (_, i) => [`p${i}`, "1"]));
    await rejects(plainPayload({ ...op, p: many }), /too many parameters/);
  });

  it("caps the size: a long link, a long field, and a decompression bomb", async () => {
    await rejects(`j.${"A".repeat(MAX_LINK_LENGTH)}`, /too long/);
    await rejects(
      plainPayload({ v: 1, t: "raw", m: "GET", u: `accounts?$filter=${"x".repeat(9000)}` }),
      /too long/
    );
    // 1 MB of JSON compresses to a few KB: it is refused while decompressing.
    const bomb = await deflated(
      JSON.stringify({ v: 1, t: "raw", m: "POST", u: "x", b: " ".repeat(1024 * 1024) })
    );
    expect(bomb.length).toBeLessThan(MAX_LINK_LENGTH);
    await rejects(bomb, /too large/);
    // Sharing refuses a request whose link would be too long.
    let seed = 1;
    const noise = Array.from({ length: 30_000 }, () => {
      seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
      return (seed >>> 16).toString(16).slice(-1);
    }).join("");
    await expect(
      encodeShare(raw({ method: "POST", body: JSON.stringify({ noise }) }))
    ).rejects.toThrow(ShareError);
  });

  it("warns about a request that changes data or impersonates", () => {
    expect(sharedRequestRisks(raw(), "GET")).toEqual({ changesData: false, impersonates: false });
    expect(sharedRequestRisks(raw({ method: "DELETE" }), "DELETE").changesData).toBe(true);
    expect(
      sharedRequestRisks(
        raw({ headers: "MSCRMCallerID: 00000000-0000-0000-0000-000000000001" }),
        "GET"
      ).impersonates
    ).toBe(true);
  });
});

const post: CopyAsRequest = {
  method: "POST",
  url: `${API}/accounts?$filter=name eq 'A&B'&$select=name`,
  headers: {
    accept: "application/json",
    authorization: "Bearer real.jwt.token",
    cookie: "ARRAffinity=secret-cookie",
    "content-type": "application/json",
    "odata-maxversion": "4.0",
    "odata-version": "4.0",
    prefer: "return=representation",
    "if-match": 'W/"123"',
    "mscrm.suppressduplicatedetection": "true",
    "x-ms-sdk-version": "dataverse-sdk-js/2.0.0",
  },
  body: JSON.stringify({ name: 'O\'Brien "Ltd"\nline 2', city: "Zürich ✓" }),
};

describe("copy as", () => {
  it("never writes the token or a secret header, whatever the input holds", () => {
    for (const format of ["curl", "fetch", "csharp"] as const) {
      const code = copyAs(format, [post]);
      expect(code, format).toContain("<TOKEN>");
      expect(code, format).not.toContain("real.jwt.token");
      expect(code, format).not.toContain("secret-cookie");
      expect(code.toLowerCase(), format).not.toContain("cookie");
    }
  });

  it("writes the OData headers in a stable order, Authorization first", () => {
    expect(copyHeaders(post).map(([n]) => n)).toEqual([
      "Authorization",
      "Accept",
      "Content-Type",
      "OData-MaxVersion",
      "OData-Version",
      "Prefer",
      "If-Match",
      "mscrm.suppressduplicatedetection",
    ]);
    // No Content-Type without a body.
    const get = { ...post, method: "GET", body: undefined };
    expect(copyHeaders(get).map(([n]) => n)).not.toContain("Content-Type");
  });

  it("quotes for bash: single quotes, newlines and unicode", () => {
    expect(shellQuote("it's")).toBe(`'it'\\''s'`);
    expect(shellQuote("a\nb ü $HOME `x`")).toBe("'a\nb ü $HOME `x`'");
    const curl = toCurl(post);
    expect(curl).toContain(
      `curl -X POST '${API}/accounts?$filter=name eq '\\''A&B'\\''&$select=name'`
    );
    expect(curl).toContain(`-H 'Authorization: Bearer <TOKEN>'`);
    expect(curl).toContain(`-H 'If-Match: W/"123"'`);
    expect(curl).toContain(`"name": "O'\\''Brien \\"Ltd\\"\\nline 2"`);
    expect(curl).toContain("Zürich ✓");
    expect(curl.split(" \\\n  ")[0]).toBe(
      `curl -X POST '${API}/accounts?$filter=name eq '\\''A&B'\\''&$select=name'`
    );
    // A GET has no -X, and globbing is off for brackets.
    expect(toCurl({ method: "GET", url: `${API}/x?$filter=a eq [1]`, headers: {} })).toMatch(
      /^curl --globoff '/
    );
  });

  it("writes fetch with JSON string literals and the body as an object", () => {
    const code = toFetch(post);
    expect(code).toContain(`await fetch(${JSON.stringify(post.url)}, {`);
    expect(code).toContain('    Authorization: "Bearer <TOKEN>",');
    expect(code).toContain('    "OData-Version": "4.0",');
    expect(code).toContain('    "If-Match": "W/\\"123\\"",');
    expect(code).toContain(
      'body: JSON.stringify({ name: "O\'Brien \\"Ltd\\"\\nline 2", city: "Zürich ✓" }),'
    );
    // A body that isn't JSON is sent as the text it is.
    expect(toFetch({ ...post, body: "a\nb's" })).toContain('  body: "a\\nb\'s",');
  });

  it("writes C# string literals and a raw string for a JSON body", () => {
    expect(csharpString('a"b\\c\nd\u0001é')).toBe('"a\\"b\\\\c\\nd\\u0001é"');
    expect(csharpRawString('{\n  "a": ""\n}', "    ")).toBe(
      '"""\n    {\n      "a": ""\n    }\n    """'
    );
    expect(csharpRawString('x """ y\nz', "")).toBe('""""\nx """ y\nz\n""""');
    const code = toCSharp(post);
    expect(code).toContain(
      `using var request = new HttpRequestMessage(HttpMethod.Post, "${API}/accounts?$filter=name eq 'A&B'&$select=name");`
    );
    expect(code).toContain(
      'request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "<TOKEN>");'
    );
    expect(code).toContain('request.Headers.TryAddWithoutValidation("If-Match", "W/\\"123\\"");');
    expect(code).toContain('      "name": "O\'Brien \\"Ltd\\"\\nline 2",');
    expect(code).toContain(
      'request.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");'
    );
    expect(code).not.toContain('TryAddWithoutValidation("Content-Type"');
    expect(copyAs("csharp", [post])).toMatch(/^using System\.Net\.Http;/);
  });

  it("numbers several requests", () => {
    const two = [post, { ...post, method: "GET", body: undefined }];
    expect(copyAs("curl", two)).toContain("# Request 2 of 2\ncurl '");
    expect(copyAs("fetch", two)).toContain("const response2 = await fetch(");
    expect(copyAs("csharp", two)).toContain(
      "using var request2 = new HttpRequestMessage(HttpMethod.Get"
    );
  });

  it("writes the request the SDK builds, with the demo's environment as a placeholder", async () => {
    const plan = parseRawRequest(
      {
        method: "PATCH",
        url: "accounts(00000000-0000-0000-0000-000000000001)",
        headers: "If-Match: *\nAuthorization: Bearer typed-token",
        body: '{"name":"Fabrikam"}',
      },
      ORG
    );
    const { requests } = await previewRequests(ORG, (client) => runRawPlan(client, plan));
    expect(requests).toHaveLength(1);
    const request = withOrigin(requests[0], ORG_PLACEHOLDER);
    const curl = copyAs("curl", [request]);
    expect(curl).toContain(
      "curl -X PATCH 'https://<org>.crm.dynamics.com/api/data/v9.2/accounts(00000000-0000-0000-0000-000000000001)'"
    );
    for (const header of [
      "Accept",
      "OData-MaxVersion: 4.0",
      "OData-Version: 4.0",
      "Content-Type",
      "If-Match: *",
    ])
      expect(curl).toContain(`-H '${header}`);
    expect(curl).not.toContain("typed-token");
    expect(curl).not.toContain("(your access token)");
    // Not the SDK's own telemetry headers.
    expect(curl).not.toContain("x-ms-sdk-version");
    expect(curl).not.toContain("x-ms-feature-usage");
    expect(curl).not.toContain("contoso");
  });
});
