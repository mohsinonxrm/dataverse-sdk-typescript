/**
 * #289: `createAndGetId()` doesn't wait on a body cancel (which hangs when middleware has tee'd
 * the body), and reads the id from the body of a `Prefer: return=representation` create, whose
 * `201` has no `OData-EntityId` or `Location` header.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import type { DataverseClientOptions } from "../src/abstractions/options.js";
import { Prefer } from "../src/abstractions/options.js";
import type { Middleware } from "../src/abstractions/middleware.js";
import { DataverseInvalidRequestError } from "../src/errors/NamedErrors.js";
import { entityIdFromResponse } from "../src/utils/response.js";

const ORG = "https://contoso.crm.dynamics.com";
const API = `${ORG}/api/data/v9.2`;
const ID = "00000000-0000-0000-0000-000000000289";
const OTHER = "00000000-0000-0000-0000-000000000001";

function setup(make: () => Response, options: Partial<DataverseClientOptions> = {}) {
  const sent: Array<Record<string, string>> = [];
  const client = new DataverseClient({
    baseUrl: ORG,
    fetchProvider: {
      fetch: (_input, init) => {
        const headers: Record<string, string> = {};
        new Headers(init?.headers).forEach((v, k) => (headers[k] = v));
        sent.push(headers);
        return Promise.resolve(make());
      },
    },
    retry: { maxRetries: 0 },
    ...options,
  });
  return { client, sent };
}

/** Middleware that tees every response body, as a logger that reads bodies does, and never reads its copy. */
const teeing: Middleware = {
  name: "TeeingLogger",
  async execute(request, ctx, next) {
    const res = await next(request, ctx);
    void res.clone(); // the copy's branch stays unread, so cancelling the other branch never settles
    return res;
  },
};

/** Resolve with `"hung"` if `p` hasn't settled within `ms`. */
function within<T>(p: Promise<T>, ms = 1000): Promise<T | "hung"> {
  return Promise.race([
    p,
    new Promise<"hung">((r) => {
      setTimeout(() => {
        r("hung");
      }, ms);
    }),
  ]);
}

const representation = (body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status: 201,
    headers: { "content-type": "application/json; odata.metadata=minimal", ...headers },
  });

describe("#289: createAndGetId()", () => {
  it("doesn't hang when middleware has tee'd the response body", async () => {
    const { client } = setup(
      () =>
        new Response('{"note":"body"}', {
          status: 201,
          headers: {
            "content-type": "application/json",
            "odata-entityid": `${API}/accounts(${ID})`,
          },
        }),
      { middleware: { prepend: [teeing] } }
    );
    await expect(within(client.api("accounts").createAndGetId({ name: "x" }))).resolves.toBe(ID);
  });

  it("reads the id from the body of a return=representation create", async () => {
    const { client, sent } = setup(() =>
      representation({
        "@odata.context": `${API}/$metadata#contacts/$entity`,
        "@odata.etag": 'W/"1"',
        contactid: ID,
        lastname: "Doe",
      })
    );
    const id = await client
      .api("contacts")
      .createAndGetId(
        { lastname: "Doe" },
        { prefer: [Prefer.returnRepresentation()], primaryIdAttribute: "contactid" }
      );
    expect(id).toBe(ID);
    // The request still asks for the record, and the option is not sent anywhere.
    expect(sent[0]?.prefer).toContain("return=representation");
    expect(JSON.stringify(sent[0])).not.toContain("primaryIdAttribute");
  });

  it("reads a tee'd return=representation body without hanging", async () => {
    const { client } = setup(() => representation({ accountid: ID }), {
      middleware: { prepend: [teeing] },
    });
    await expect(
      within(
        client.api("accounts").createAndGetId({ name: "x" }, { primaryIdAttribute: "accountid" })
      )
    ).resolves.toBe(ID);
  });

  it("without primaryIdAttribute, a return=representation create fails with a clear message", async () => {
    const { client } = setup(() => representation({ accountid: ID }), {
      middleware: { prepend: [teeing] },
    });
    const err = await within(
      client
        .api("accounts")
        .createAndGetId({ name: "x" }, { prefer: [Prefer.returnRepresentation()] })
        .catch((e: unknown) => e)
    );
    expect(err).toBeInstanceOf(DataverseInvalidRequestError);
    expect((err as Error).message).toMatch(/return=representation/);
    expect((err as Error).message).toMatch(/primaryIdAttribute/);
  });

  it("fails clearly when the body has no GUID in primaryIdAttribute", async () => {
    const { client } = setup(() => representation({ accountid: "not-a-guid" }));
    await expect(
      client.api("accounts").createAndGetId({ name: "x" }, { primaryIdAttribute: "contactid" })
    ).rejects.toThrow(/no GUID in "contactid"/);
  });

  it("the OData-EntityId header wins over the body", async () => {
    const { client } = setup(() =>
      representation({ accountid: OTHER }, { "odata-entityid": `${API}/accounts(${ID})` })
    );
    await expect(
      client.api("accounts").createAndGetId({ name: "x" }, { primaryIdAttribute: "accountid" })
    ).resolves.toBe(ID);
  });
});

describe("#289: entityIdFromResponse()", () => {
  it("points at the body for a return=representation response", () => {
    expect(() => entityIdFromResponse(representation({ accountid: ID }))).toThrow(
      /return=representation/
    );
  });
});
