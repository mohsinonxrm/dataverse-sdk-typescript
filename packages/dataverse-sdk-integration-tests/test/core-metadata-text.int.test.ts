/**
 * #210 live: `client.api("$metadata").text()` returns the CSDL document. Nothing is created.
 */
import { describe, expect, it } from "vitest";
import { live, liveClient } from "./env.js";

describe.skipIf(!live)("live: text() for non-JSON content (#210)", () => {
  it("reads $metadata as XML", async () => {
    const xml = await liveClient().client.api("$metadata").text();
    expect(xml.startsWith("<?xml")).toBe(true);
    expect(xml).toContain("<edmx:Edmx");
  });
});
