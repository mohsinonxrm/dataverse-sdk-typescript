import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createFakeFetch,
  fakeTokenProvider,
  jsonResponse,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { DiscoveryClient, DISCOVERY_CLOUDS } from "../src/index.js";
import type { DiscoveryClientOptions, DiscoveryCloud } from "../src/index.js";

/** Inject a recording fake fetch that answers any …/Instances request with an empty list. */
function setup(options?: string | DiscoveryClientOptions) {
  const fake = createFakeFetch();
  fake.on("GET", /\/Instances$/, () => jsonResponse({ value: [] }));
  vi.stubGlobal("fetch", fake.fetchProvider.fetch);
  const tokens = fakeTokenProvider("disco-token");
  return { fake, tokens, client: new DiscoveryClient(tokens, options) };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

// Hosts from Microsoft Learn, "Discover user organizations" (Global Discovery service table).
const CLOUD_HOSTS: Array<[DiscoveryCloud, string]> = [
  ["public", "globaldisco.crm.dynamics.com"],
  ["gcc", "globaldisco.crm9.dynamics.com"],
  ["usg", "globaldisco.crm.microsoftdynamics.us"],
  ["dod", "globaldisco.crm.appsplatform.us"],
  ["china", "globaldisco.crm.dynamics.cn"],
];

describe("DiscoveryClient clouds (#29)", () => {
  it.each(CLOUD_HOSTS)("cloud %s calls %s with a token for that host", async (cloud, host) => {
    const { fake, tokens, client } = setup({ cloud });

    await client.listOrganizations();

    expect(fake.last().url).toBe(`https://${host}/api/discovery/v2.0/Instances`);
    expect(fake.last().headers.authorization).toBe("Bearer disco-token");
    expect(tokens.calls).toEqual([[`https://${host}/.default`]]);
    expect(client.getBaseUrl()).toBe(`https://${host}/api/discovery/v2.0`);
    expect(client.getScopes()).toEqual([`https://${host}/.default`]);
  });

  it("exposes the per-cloud endpoint and scope table", () => {
    expect(Object.keys(DISCOVERY_CLOUDS).sort()).toEqual(["china", "dod", "gcc", "public", "usg"]);
    expect(DISCOVERY_CLOUDS.usg).toEqual({
      baseUrl: "https://globaldisco.crm.microsoftdynamics.us/api/discovery/v2.0",
      scope: "https://globaldisco.crm.microsoftdynamics.us/.default",
    });
  });

  it("defaults to the Commercial cloud", async () => {
    const { fake, tokens, client } = setup();

    await client.listOrganizations();

    expect(fake.last().url).toBe(
      "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances"
    );
    expect(tokens.calls).toEqual([["https://globaldisco.crm.dynamics.com/.default"]]);
  });

  it("keeps the (tokenProvider, baseUrl) signature and derives the scope from that host", async () => {
    const { fake, tokens, client } = setup(
      "https://globaldisco.crm.microsoftdynamics.us/api/discovery/v2.0"
    );

    await client.getEnabledOrganizations();

    expect(new URL(fake.last().url).origin).toBe("https://globaldisco.crm.microsoftdynamics.us");
    expect(new URL(fake.last().url).pathname).toBe("/api/discovery/v2.0/Instances");
    expect(tokens.calls).toEqual([["https://globaldisco.crm.microsoftdynamics.us/.default"]]);
  });

  it("appends /api/discovery/v2.0 to a host-only baseUrl", async () => {
    const { fake, client } = setup({ baseUrl: "https://globaldisco.crm9.dynamics.com/" });

    await client.listOrganizations();

    expect(fake.last().url).toBe(
      "https://globaldisco.crm9.dynamics.com/api/discovery/v2.0/Instances"
    );
  });

  it("uses a custom baseUrl with custom scopes", async () => {
    const scopes = ["https://globaldisco.crm.dynamics.com/user_impersonation"];
    const { fake, tokens, client } = setup({
      baseUrl: "https://disco.contoso.test/api/discovery/v2.0/",
      scopes,
    });

    await client.listOrganizations();

    expect(fake.last().url).toBe("https://disco.contoso.test/api/discovery/v2.0/Instances");
    expect(tokens.calls).toEqual([scopes]);
  });

  it("uses custom scopes with a cloud preset", async () => {
    const { fake, tokens, client } = setup({
      cloud: "dod",
      scopes: ["https://globaldisco.crm.appsplatform.us/user_impersonation"],
    });

    await client.listOrganizations();

    expect(new URL(fake.last().url).host).toBe("globaldisco.crm.appsplatform.us");
    expect(tokens.calls).toEqual([["https://globaldisco.crm.appsplatform.us/user_impersonation"]]);
  });

  it("baseUrl overrides the cloud's endpoint and scope", async () => {
    const { fake, tokens, client } = setup({
      cloud: "china",
      baseUrl: "https://globaldisco.crm9.dynamics.com",
    });

    await client.listOrganizations();

    expect(new URL(fake.last().url).host).toBe("globaldisco.crm9.dynamics.com");
    expect(tokens.calls).toEqual([["https://globaldisco.crm9.dynamics.com/.default"]]);
  });

  it("rejects an unknown cloud", () => {
    expect(
      () => new DiscoveryClient(fakeTokenProvider(), { cloud: "usgovhigh" as DiscoveryCloud })
    ).toThrow(DataverseInvalidRequestError);
  });

  it.each(["not a url", "ftp://globaldisco.crm.dynamics.com"])("rejects baseUrl %j", (baseUrl) => {
    expect(() => new DiscoveryClient(fakeTokenProvider(), { baseUrl })).toThrow(
      DataverseInvalidRequestError
    );
  });
});
