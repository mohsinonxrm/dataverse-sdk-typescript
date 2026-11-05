/**
 * #36: the published core bundle reports its real version. Runs against core's built output, so
 * it checks the tsup `define`, not only the source.
 */
import { describe, expect, it } from "vitest";
import { SDK_VERSION } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse } from "../src/index.js";
import corePkg from "../../dataverse-sdk-core/package.json" with { type: "json" };

describe("#36: the built core reports package.json's version", () => {
  it("exports SDK_VERSION equal to the package version", () => {
    expect(SDK_VERSION).toBe(corePkg.version);
  });

  it("sends it in x-ms-sdk-version", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u1" }));
    await client.api("WhoAmI").get();
    expect(fake.last().headers["x-ms-sdk-version"]).toBe(`dataverse-sdk-js/${corePkg.version}`);
  });
});
