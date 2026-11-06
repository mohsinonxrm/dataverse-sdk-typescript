/**
 * #210: text(), blob() and arrayBuffer() don't ask for JSON only. Dataverse answers `$metadata`
 * requested with `Accept: application/json` with 415, so these send `Accept: *\/*` unless the
 * caller set an `Accept` header.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";

const ORG = "https://contoso.crm.dynamics.com";

function setup() {
  const accepts: Array<string | null> = [];
  const client = new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 0 },
    fetchProvider: {
      fetch: (_input, init) => {
        const accept = new Headers(init?.headers).get("accept");
        accepts.push(accept);
        // Like Dataverse: $metadata can't be served as JSON.
        if (accept === "application/json") {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                error: {
                  code: "0x80060888",
                  message:
                    "A supported MIME type could not be found that matches the acceptable MIME types for the request.",
                },
              }),
              { status: 415, headers: { "content-type": "application/json" } }
            )
          );
        }
        return Promise.resolve(
          new Response('<?xml version="1.0"?><edmx:Edmx/>', {
            headers: { "content-type": "application/xml" },
          })
        );
      },
    },
  });
  return { client, accepts };
}

describe("#210: non-JSON terminals don't force Accept: application/json", () => {
  it("text() reads $metadata", async () => {
    const { client, accepts } = setup();
    await expect(client.api("$metadata").text()).resolves.toContain("<edmx:Edmx");
    expect(accepts).toEqual(["*/*"]);
  });

  it("blob() and arrayBuffer() send Accept: */* too", async () => {
    const { client, accepts } = setup();
    expect((await client.api("$metadata").blob()).size).toBeGreaterThan(0);
    expect((await client.api("$metadata").arrayBuffer()).byteLength).toBeGreaterThan(0);
    expect(accepts).toEqual(["*/*", "*/*"]);
  });

  it("an Accept set on the builder or in the options wins", async () => {
    const { client, accepts } = setup();
    await client.api("$metadata").header("Accept", "application/xml").text();
    await client.api("$metadata").text({ headers: { ACCEPT: "text/plain" } });
    expect(accepts).toEqual(["application/xml", "text/plain"]);
  });

  it("get() still asks for JSON", async () => {
    const { client, accepts } = setup();
    await client
      .api("$metadata")
      .get()
      .catch(() => undefined);
    expect(accepts).toEqual(["application/json"]);
  });
});
