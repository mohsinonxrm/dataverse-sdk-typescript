/**
 * @fileoverview #86 with a real `AzureCliCredential`: it starts an `az` process on every
 * `getToken`, so without the provider's cache every Dataverse request started one.
 *
 * `az` here is a small script put first on `PATH`. It records each start and prints what
 * `az account get-access-token --output json` prints. Nothing reaches Azure.
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { AzureCliCredential } from "@azure/identity";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import { AzureIdentityTokenProvider } from "../src/index.js";

const scopes = ["https://contoso.crm.dynamics.com/.default"];

describe.skipIf(process.platform === "win32")("#86: AzureCliCredential", () => {
  let dir = "";
  let log = "";
  let originalPath: string | undefined;

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), "fake-az-"));
    log = join(dir, "starts.log");
    const script = [
      "#!/bin/sh",
      `echo "$*" >> "${log}"`,
      'n=$(wc -l < "' + log + '" | tr -d " ")',
      "exp=$(( $(date +%s) + 3600 ))",
      'printf \'{"accessToken":"cli-token-%s","expiresOn":"2099-01-01 00:00:00.000000","expires_on":%s,"tokenType":"Bearer"}\' "$n" "$exp"',
      "",
    ].join("\n");
    writeFileSync(join(dir, "az"), script);
    chmodSync(join(dir, "az"), 0o755);
    originalPath = process.env.PATH;
    process.env.PATH = `${dir}${delimiter}${originalPath ?? ""}`;
  });

  afterAll(() => {
    process.env.PATH = originalPath;
    rmSync(dir, { recursive: true, force: true });
  });

  function azStarts(): number {
    return existsSync(log) ? readFileSync(log, "utf8").trim().split("\n").length : 0;
  }

  it("three requests start az once", async () => {
    const tokenProvider = new AzureIdentityTokenProvider(new AzureCliCredential(), { scopes });
    const { client, fake } = createTestClient({ tokenProvider });
    fake.on("GET", "/WhoAmI", () =>
      jsonResponse({ UserId: "00000000-0000-0000-0000-000000000001" })
    );
    const before = azStarts();

    await client.api("/WhoAmI").get();
    await client.api("/WhoAmI").get();
    await client.api("/WhoAmI").get();

    expect(azStarts() - before).toBe(1);
    const tokens = fake.requests.map((r) => r.headers.authorization);
    expect(new Set(tokens).size).toBe(1);
    expect(tokens[0]).toMatch(/^Bearer cli-token-\d+$/);
  });

  it("forceRefresh starts az again", async () => {
    const provider = new AzureIdentityTokenProvider(new AzureCliCredential(), { scopes });
    const first = await provider.getToken();
    const before = azStarts();

    const refreshed = await provider.getToken(undefined, { forceRefresh: true });

    expect(azStarts() - before).toBe(1);
    expect(refreshed).not.toBe(first);
  });
});
