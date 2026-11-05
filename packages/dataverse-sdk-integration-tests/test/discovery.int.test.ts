/**
 * Live Global Discovery Service tests (#28, #29, #30). Run with the same DATAVERSE_* variables as
 * live.int.test.ts (see ./env.ts). The app registration gets a token for the discovery scope with
 * client credentials, and GDS lists the org its application user belongs to.
 *
 * Assertions compare values as booleans, so a failure never prints the org URL, a hostname or an id.
 */
import { describe, expect, it } from "vitest";
import { DataverseError, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import type { Logger } from "@mohsinonxrm/dataverse-sdk-core";
import { DiscoveryClient, toEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
import type {
  DiscoveryClientOptions,
  OrganizationDetail,
} from "@mohsinonxrm/dataverse-sdk-discovery";
import { live, liveClient, orgUrl } from "./env.js";

// The pipeline logs request URLs, and filters carry unique names: keep them out of the output.
const noop = (): void => undefined;
const quiet: Logger = { debug: noop, info: noop, warn: noop, error: noop };

function discovery(options: DiscoveryClientOptions = {}): DiscoveryClient {
  return new DiscoveryClient(liveClient().tokenProvider, { logger: quiet, ...options });
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

  it("cloud: 'public' and a host-only baseUrl reach the same service (#29)", async () => {
    const byCloud = discovery({ cloud: "public" });
    const byHost = discovery({ baseUrl: "https://globaldisco.crm.dynamics.com" });

    const [a, b] = await Promise.all([byCloud.listOrganizations(), byHost.listOrganizations()]);

    expect(a.length).toBeGreaterThan(0);
    expect(
      a
        .map((o) => o.Id)
        .sort()
        .join() ===
        b
          .map((o) => o.Id)
          .sort()
          .join()
    ).toBe(true);
  });

  it("toEnvironment() gives a Web API root a DataverseClient can use", async () => {
    const env = toEnvironment(await configuredOrg());

    expect(env.enabled).toBe(true);
    expect(env.webApiUrl.endsWith("/api/data/v9.2")).toBe(true);
    expect(env.webApiUrl.startsWith(env.apiUrl)).toBe(true);
  });

  it("escapes quotes, so a unique name with ' is a valid filter (#30)", async () => {
    // Unescaped, `UniqueName eq 'o'brien'` is a 400 from the service.
    expect(await discovery().getOrganization("o'brien")).toBeNull();
  });

  it("a rejected token surfaces as DataverseODataError with a status (#30)", async () => {
    const { tokenProvider } = liveClient();
    // A valid token for the wrong audience (the org, not the discovery service).
    const wrongAudience = new DiscoveryClient(
      { getToken: () => tokenProvider.getToken([`${orgUrl}/.default`]) },
      { logger: quiet, retry: { maxRetries: 0 } }
    );
    const malformed = new DiscoveryClient(
      { getToken: () => Promise.resolve("not-a-token") },
      { logger: quiet, retry: { maxRetries: 0 } }
    );

    const errors: unknown[] = await Promise.all([
      wrongAudience.listOrganizations().catch((e: unknown) => e),
      malformed.listOrganizations().catch((e: unknown) => e),
    ]);

    for (const err of errors) {
      expect(err).toBeInstanceOf(DataverseODataError);
      expect(err).toBeInstanceOf(DataverseError);
    }
    const statuses = errors.map((e) => (e as DataverseError).status);
    expect(statuses[0]).toBe(401);
    // The service answers a malformed bearer token with 400.
    expect(statuses[1]).toBe(400);
  });

  it("an aborted signal cancels the request (#30)", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      discovery().getEnabledOrganizations({ signal: controller.signal })
    ).rejects.toMatchObject({ name: "AbortError" });
  });
});
