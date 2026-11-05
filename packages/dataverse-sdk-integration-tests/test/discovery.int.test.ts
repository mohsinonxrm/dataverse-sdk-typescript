/**
 * Live Global Discovery Service tests (#28). Run with the same DATAVERSE_* variables as
 * live.int.test.ts (see ./env.ts). The app registration gets a token for the discovery scope with
 * client credentials, and GDS lists the org its application user belongs to.
 *
 * Assertions compare values as booleans, so a failure never prints the org URL, a hostname or an id.
 */
import { describe, expect, it } from "vitest";
import { DiscoveryClient, toEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
import type { OrganizationDetail } from "@mohsinonxrm/dataverse-sdk-discovery";
import { live, liveClient, orgUrl } from "./env.js";

function discovery(): DiscoveryClient {
  return new DiscoveryClient(liveClient().tokenProvider);
}

/** The configured org, found through getOrganizationByUrl(DATAVERSE_URL). */
async function configuredOrg(): Promise<OrganizationDetail> {
  const org = await discovery().getOrganizationByUrl(orgUrl);
  if (!org) throw new Error("getOrganizationByUrl(DATAVERSE_URL) found no environment");
  return org;
}

describe.skipIf(!live)("live: Global Discovery Service", () => {
  it("lists Instances in the flat v2.0 shape", async () => {
    const orgs = await discovery().listOrganizations();

    expect(orgs.length).toBeGreaterThan(0);
    for (const org of orgs) {
      expect(typeof org.Url).toBe("string");
      expect(typeof org.ApiUrl).toBe("string");
      expect(typeof org.State).toBe("number");
      expect(typeof org.UniqueName).toBe("string");
      expect(typeof org.Version).toBe("string");
      expect("Endpoints" in org).toBe(false);
    }
  });

  it("getEnabledOrganizations() (State eq 0) returns only enabled environments", async () => {
    const enabled = await discovery().getEnabledOrganizations();

    expect(enabled.length).toBeGreaterThan(0);
    expect(enabled.every((o) => o.State === 0)).toBe(true);
  });

  it("getOrganizationByUrl() finds the configured org, and it is the org WhoAmI reports", async () => {
    const org = await configuredOrg();
    const me = await liveClient().client.api("WhoAmI").get<{ OrganizationId: string }>();

    expect(org.Id.toLowerCase() === me.OrganizationId.toLowerCase()).toBe(true);
    expect(new URL(org.Url).origin === orgUrl).toBe(true);
  });

  it("finds the same org by its ApiUrl, UniqueName and Region", async () => {
    const org = await configuredOrg();
    const client = discovery();

    const byApiUrl = await client.getOrganizationByUrl(org.ApiUrl);
    const byUniqueName = await client.getOrganization(org.UniqueName);
    const inRegion = org.Region ? await client.getOrganizationsByRegion(org.Region) : [];

    expect(byApiUrl?.Id === org.Id).toBe(true);
    expect(byUniqueName?.Id === org.Id).toBe(true);
    expect(org.Region ? inRegion.some((o) => o.Id === org.Id) : true).toBe(true);
  });

  it("toEnvironment() gives a Web API root a DataverseClient can use", async () => {
    const env = toEnvironment(await configuredOrg());

    expect(env.enabled).toBe(true);
    expect(env.webApiUrl.endsWith("/api/data/v9.2")).toBe(true);
    expect(env.webApiUrl.startsWith(env.apiUrl)).toBe(true);
  });
});
