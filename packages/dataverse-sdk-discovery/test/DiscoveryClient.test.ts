import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createFakeFetch,
  fakeTokenProvider,
  jsonResponse,
  odataError,
} from "@mohsinonxrm/dataverse-sdk-testing";
import type { RecordedRequest } from "@mohsinonxrm/dataverse-sdk-testing";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { DiscoveryClient } from "../src/DiscoveryClient.js";
import { OrganizationState, toEnvironment } from "../src/index.js";
import type { DiscoveryResponse, OrganizationDetail } from "../src/index.js";
import instancesV2 from "./fixtures/instances-v2.json";

const DISCO = "https://globaldisco.crm.dynamics.com/api/discovery/v2.0";

/**
 * A v2.0 `Instances` response with the properties documented in Microsoft Learn,
 * "Discover user organizations" (Instance entity), plus `FinOpsUrl`. Its property names and JSON
 * types match a live response (checked for names and types only); the values are Contoso
 * placeholders, so no real org details are committed.
 */
// Checked against the public type: a property the type lacks, or a wrong value type, fails typecheck.
const fixture: DiscoveryResponse & { "@odata.context": string } = instancesV2;
const orgs: OrganizationDetail[] = fixture.value;

function query(r: RecordedRequest, name: string): string | null {
  return new URL(r.url).searchParams.get(name);
}

/** A client whose requests go to a recording fake fetch. */
function setup() {
  const fake = createFakeFetch({ apiUrl: DISCO });
  const tokens = fakeTokenProvider("disco-token");
  return {
    fake,
    tokens,
    client: new DiscoveryClient(tokens, { fetchProvider: fake.fetchProvider }),
  };
}

/** Answer /Instances like the service: apply the `eq` filters the client sends. */
function serveFixture(fake: ReturnType<typeof setup>["fake"]) {
  fake.on("GET", "/Instances", (r) => {
    const filter = query(r, "$filter");
    let value = orgs;
    const state = /^State eq (\d+)$/.exec(filter ?? "");
    const str = /^(\w+) eq '(.*)'$/.exec(filter ?? "");
    if (state) value = orgs.filter((o) => o.State === Number(state[1]));
    else if (str) {
      const [, prop, literal] = str;
      value = orgs.filter((o) => o[prop as keyof OrganizationDetail] === literal);
    }
    return jsonResponse({ ...fixture, value });
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("DiscoveryClient (Global Discovery Service v2.0)", () => {
  describe("listOrganizations", () => {
    it("returns the flat v2.0 Instance objects (Url, ApiUrl, integer State)", async () => {
      const { fake, client } = setup();
      serveFixture(fake);

      const result = await client.listOrganizations();

      expect(result).toHaveLength(3);
      const [contoso] = result;
      expect(contoso.Url).toBe("https://contoso.crm.dynamics.com");
      expect(contoso.ApiUrl).toBe("https://contoso.api.crm.dynamics.com");
      expect(contoso.State).toBe(0);
      expect(contoso.Region).toBe("NA");
      expect(contoso.EnvironmentId).toBe("00000000-0000-0000-0000-000000000020");
      expect(contoso).not.toHaveProperty("Endpoints");
      expect(contoso).not.toHaveProperty("Geo");
    });

    it("sends GET /Instances with the bearer token, OData headers and the discovery scope", async () => {
      const { fake, tokens, client } = setup();
      serveFixture(fake);

      await client.listOrganizations();

      expect(fake.requests).toHaveLength(1);
      const r = fake.last();
      expect(r.method).toBe("GET");
      expect(r.url).toBe(`${DISCO}/Instances`);
      expect(r.headers.authorization).toBe("Bearer disco-token");
      expect(r.headers.accept).toBe("application/json");
      expect(r.headers["odata-version"]).toBe("4.0");
      expect(r.headers["odata-maxversion"]).toBe("4.0");
      expect(tokens.calls).toEqual([["https://globaldisco.crm.dynamics.com/.default"]]);
    });

    it("passes $select and $orderby through", async () => {
      const { fake, client } = setup();
      serveFixture(fake);

      await client.listOrganizations({
        select: ["FriendlyName", "ApiUrl"],
        orderby: "FriendlyName",
      });

      expect(query(fake.last(), "$select")).toBe("FriendlyName,ApiUrl");
      expect(query(fake.last(), "$orderby")).toBe("FriendlyName");
    });

    it("rejects on an HTTP error", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () => odataError(401, "Unauthorized", "Unauthorized"));

      await expect(client.listOrganizations()).rejects.toMatchObject({ status: 401 });
    });
  });

  describe("getEnabledOrganizations", () => {
    it("filters with the integer State (State eq 0), not the string 'Enabled'", async () => {
      const { fake, client } = setup();
      serveFixture(fake);

      const enabled = await client.getEnabledOrganizations();

      expect(query(fake.last(), "$filter")).toBe("State eq 0");
      expect(fake.last().url).toBe(`${DISCO}/Instances?$filter=State%20eq%200`);
      expect(enabled.map((o) => o.UrlName)).toEqual(["contoso", "contoso-test"]);
      expect(enabled.every((o) => o.State === OrganizationState.Enabled)).toBe(true);
    });
  });

  describe("getOrganizationsByRegion", () => {
    it("filters on Region (the v2.0 response has no Geo)", async () => {
      const { fake, client } = setup();
      serveFixture(fake);

      const na = await client.getOrganizationsByRegion("NA");

      expect(query(fake.last(), "$filter")).toBe("Region eq 'NA'");
      expect(na.map((o) => o.UrlName)).toEqual(["contoso", "contoso-archive"]);
    });
  });

  describe("getOrganization", () => {
    it("filters on UniqueName", async () => {
      const { fake, client } = setup();
      serveFixture(fake);

      const org = await client.getOrganization("unq00000000000000000000000000002");

      expect(query(fake.last(), "$filter")).toBe(
        "UniqueName eq 'unq00000000000000000000000000002'"
      );
      expect(org?.FriendlyName).toBe("Contoso (Test)");
    });

    it("returns null when nothing matches", async () => {
      const { fake, client } = setup();
      serveFixture(fake);

      expect(await client.getOrganization("nope")).toBeNull();
    });
  });

  describe("getOrganizationByUrl", () => {
    it.each([
      ["the application URL", "https://contoso-test.crm4.dynamics.com"],
      [
        "the application URL with a trailing slash and upper case",
        "https://Contoso-Test.CRM4.dynamics.com/",
      ],
      ["the ApiUrl", "https://contoso-test.api.crm4.dynamics.com"],
      ["the Web API root", "https://contoso-test.api.crm4.dynamics.com/api/data/v9.2/"],
    ])("finds the environment by %s", async (_label, url) => {
      const { fake, client } = setup();
      serveFixture(fake);

      const org = await client.getOrganizationByUrl(url);

      expect(org?.UrlName).toBe("contoso-test");
      expect(fake.last().url).toBe(`${DISCO}/Instances`);
    });

    it("returns null when no environment is served at the URL", async () => {
      const { fake, client } = setup();
      serveFixture(fake);

      expect(await client.getOrganizationByUrl("https://fabrikam.crm.dynamics.com")).toBeNull();
    });

    it("rejects a value that is not an absolute URL without calling the service", async () => {
      const { fake, client } = setup();
      serveFixture(fake);

      await expect(client.getOrganizationByUrl("contoso")).rejects.toBeInstanceOf(
        DataverseInvalidRequestError
      );
      expect(fake.requests).toHaveLength(0);
    });
  });
});

describe("toEnvironment", () => {
  it("summarises an enabled Instance", () => {
    expect(toEnvironment(orgs[0])).toEqual({
      id: "00000000-0000-0000-0000-000000000001",
      url: "https://contoso.crm.dynamics.com",
      apiUrl: "https://contoso.api.crm.dynamics.com",
      webApiUrl: "https://contoso.api.crm.dynamics.com/api/data/v9.2",
      name: "Contoso",
      uniqueName: "unq00000000000000000000000000001",
      enabled: true,
      version: "9.2.24101.00177",
      region: "NA",
      environmentId: "00000000-0000-0000-0000-000000000020",
    });
  });

  it("marks State 1 as disabled", () => {
    expect(toEnvironment(orgs[2]).enabled).toBe(false);
  });

  it("drops trailing slashes and omits missing optional properties", () => {
    const env = toEnvironment({
      ...orgs[1],
      Url: "https://contoso-test.crm4.dynamics.com/",
      ApiUrl: "https://contoso-test.api.crm4.dynamics.com/",
      Region: null,
      EnvironmentId: undefined,
    });
    expect(env.url).toBe("https://contoso-test.crm4.dynamics.com");
    expect(env.webApiUrl).toBe("https://contoso-test.api.crm4.dynamics.com/api/data/v9.2");
    expect(env).not.toHaveProperty("region");
    expect(env).not.toHaveProperty("environmentId");
  });
});
