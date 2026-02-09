import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { DiscoveryClient } from "../src/DiscoveryClient.js";
import type { AccessTokenProvider } from "@mohsinonxrm/dataverse-sdk-core";
import type { DiscoveryResponse, OrganizationDetail } from "../src/types.js";

// Mock token provider
const mockTokenProvider: AccessTokenProvider = {
  getToken: vi.fn().mockResolvedValue("mock-token"),
};

// Mock organization data
const mockOrganizations: OrganizationDetail[] = [
  {
    Id: "00000000-0000-0000-0000-000000000001",
    UniqueName: "contoso",
    FriendlyName: "Contoso Corporation",
    Endpoints: {
      WebApiUrl: "https://contoso.api.crm.dynamics.com",
      WebApplicationUrl: "https://contoso.crm.dynamics.com",
    },
    State: "Enabled",
    Version: "9.2.23114.00188",
    UrlName: "contoso",
    Geo: "NA",
    TenantId: "00000000-0000-0000-0000-000000000010",
    EnvironmentId: "00000000-0000-0000-0000-000000000020",
    Region: "NA001",
  },
  {
    Id: "00000000-0000-0000-0000-000000000002",
    UniqueName: "fabrikam",
    FriendlyName: "Fabrikam Inc",
    Endpoints: {
      WebApiUrl: "https://fabrikam.api.crm4.dynamics.com",
      WebApplicationUrl: "https://fabrikam.crm4.dynamics.com",
    },
    State: "Enabled",
    Version: "9.2.23114.00188",
    UrlName: "fabrikam",
    Geo: "EMEA",
    TenantId: "00000000-0000-0000-0000-000000000010",
    EnvironmentId: "00000000-0000-0000-0000-000000000030",
    Region: "EMEA001",
  },
  {
    Id: "00000000-0000-0000-0000-000000000003",
    UniqueName: "adventureworks",
    FriendlyName: "Adventure Works",
    Endpoints: {
      WebApiUrl: "https://adventureworks.api.crm.dynamics.com",
      WebApplicationUrl: "https://adventureworks.crm.dynamics.com",
    },
    State: "Disabled",
    Version: "9.2.23114.00188",
    UrlName: "adventureworks",
    Geo: "NA",
    TenantId: "00000000-0000-0000-0000-000000000010",
    EnvironmentId: "00000000-0000-0000-0000-000000000040",
    Region: "NA001",
  },
];

// MSW server setup
const server = setupServer();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

describe("DiscoveryClient", () => {
  describe("Constructor", () => {
    it("should create instance with default URL", () => {
      const client = new DiscoveryClient(mockTokenProvider);
      expect(client).toBeInstanceOf(DiscoveryClient);
    });

    it("should create instance with custom URL", () => {
      const customUrl = "https://custom.disco.endpoint/api/discovery/v2.0";
      const client = new DiscoveryClient(mockTokenProvider, customUrl);
      expect(client).toBeInstanceOf(DiscoveryClient);
    });
  });

  describe("listOrganizations", () => {
    it("should list all organizations", async () => {
      server.use(
        http.get("https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances", () => {
          return HttpResponse.json<DiscoveryResponse>({
            value: mockOrganizations,
          });
        })
      );

      const client = new DiscoveryClient(mockTokenProvider);
      const orgs = await client.listOrganizations();

      expect(orgs).toHaveLength(3);
      expect(orgs[0].UniqueName).toBe("contoso");
      expect(orgs[1].UniqueName).toBe("fabrikam");
      expect(orgs[2].UniqueName).toBe("adventureworks");
    });

    it("should request token with correct scopes", async () => {
      server.use(
        http.get("https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances", () => {
          return HttpResponse.json<DiscoveryResponse>({ value: [] });
        })
      );

      const client = new DiscoveryClient(mockTokenProvider);
      await client.listOrganizations();

      expect(mockTokenProvider.getToken).toHaveBeenCalledWith([
        "https://globaldisco.crm.dynamics.com/.default",
      ]);
    });

    it("should include authorization header", async () => {
      server.use(
        http.get(
          "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances",
          ({ request }) => {
            const authHeader = request.headers.get("Authorization");
            expect(authHeader).toBe("Bearer mock-token");
            return HttpResponse.json<DiscoveryResponse>({ value: [] });
          }
        )
      );

      const client = new DiscoveryClient(mockTokenProvider);
      await client.listOrganizations();
    });

    it("should include OData headers", async () => {
      server.use(
        http.get(
          "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances",
          ({ request }) => {
            expect(request.headers.get("Accept")).toBe("application/json");
            expect(request.headers.get("OData-MaxVersion")).toBe("4.0");
            expect(request.headers.get("OData-Version")).toBe("4.0");
            return HttpResponse.json<DiscoveryResponse>({ value: [] });
          }
        )
      );

      const client = new DiscoveryClient(mockTokenProvider);
      await client.listOrganizations();
    });

    it("should filter organizations", async () => {
      server.use(
        http.get(
          "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances",
          ({ request }) => {
            const url = new URL(request.url);
            const filter = url.searchParams.get("$filter");
            expect(filter).toBe("State eq 'Enabled'");

            return HttpResponse.json<DiscoveryResponse>({
              value: mockOrganizations.filter((org) => org.State === "Enabled"),
            });
          }
        )
      );

      const client = new DiscoveryClient(mockTokenProvider);
      const orgs = await client.listOrganizations({
        filter: "State eq 'Enabled'",
      });

      expect(orgs).toHaveLength(2);
      expect(orgs.every((org) => org.State === "Enabled")).toBe(true);
    });

    it("should select specific properties", async () => {
      server.use(
        http.get(
          "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances",
          ({ request }) => {
            const url = new URL(request.url);
            const select = url.searchParams.get("$select");
            expect(select).toBe("UniqueName,FriendlyName,Geo");

            return HttpResponse.json<DiscoveryResponse>({ value: mockOrganizations });
          }
        )
      );

      const client = new DiscoveryClient(mockTokenProvider);
      await client.listOrganizations({
        select: ["UniqueName", "FriendlyName", "Geo"],
      });
    });

    it("should order results", async () => {
      server.use(
        http.get(
          "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances",
          ({ request }) => {
            const url = new URL(request.url);
            const orderby = url.searchParams.get("$orderby");
            expect(orderby).toBe("FriendlyName");

            return HttpResponse.json<DiscoveryResponse>({ value: mockOrganizations });
          }
        )
      );

      const client = new DiscoveryClient(mockTokenProvider);
      await client.listOrganizations({
        orderby: "FriendlyName",
      });
    });

    it("should throw error on HTTP failure", async () => {
      server.use(
        http.get("https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances", () => {
          return HttpResponse.json(
            { error: { message: "Unauthorized" } },
            { status: 401, statusText: "Unauthorized" }
          );
        })
      );

      const client = new DiscoveryClient(mockTokenProvider);

      await expect(client.listOrganizations()).rejects.toThrow(/401.*Unauthorized/);
    });
  });

  describe("getOrganization", () => {
    it("should get organization by unique name", async () => {
      server.use(
        http.get(
          "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances",
          ({ request }) => {
            const url = new URL(request.url);
            const filter = url.searchParams.get("$filter");
            expect(filter).toBe("UniqueName eq 'contoso'");

            return HttpResponse.json<DiscoveryResponse>({
              value: mockOrganizations.filter((org) => org.UniqueName === "contoso"),
            });
          }
        )
      );

      const client = new DiscoveryClient(mockTokenProvider);
      const org = await client.getOrganization("contoso");

      expect(org).not.toBeNull();
      expect(org?.UniqueName).toBe("contoso");
      expect(org?.FriendlyName).toBe("Contoso Corporation");
    });

    it("should return null if organization not found", async () => {
      server.use(
        http.get("https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances", () => {
          return HttpResponse.json<DiscoveryResponse>({ value: [] });
        })
      );

      const client = new DiscoveryClient(mockTokenProvider);
      const org = await client.getOrganization("nonexistent");

      expect(org).toBeNull();
    });
  });

  describe("getOrganizationsByRegion", () => {
    it("should filter organizations by region", async () => {
      server.use(
        http.get(
          "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances",
          ({ request }) => {
            const url = new URL(request.url);
            const filter = url.searchParams.get("$filter");
            expect(filter).toBe("Geo eq 'NA'");

            return HttpResponse.json<DiscoveryResponse>({
              value: mockOrganizations.filter((org) => org.Geo === "NA"),
            });
          }
        )
      );

      const client = new DiscoveryClient(mockTokenProvider);
      const orgs = await client.getOrganizationsByRegion("NA");

      expect(orgs).toHaveLength(2);
      expect(orgs.every((org) => org.Geo === "NA")).toBe(true);
    });

    it("should handle EMEA region", async () => {
      server.use(
        http.get(
          "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances",
          ({ request }) => {
            const url = new URL(request.url);
            const filter = url.searchParams.get("$filter");
            expect(filter).toBe("Geo eq 'EMEA'");

            return HttpResponse.json<DiscoveryResponse>({
              value: mockOrganizations.filter((org) => org.Geo === "EMEA"),
            });
          }
        )
      );

      const client = new DiscoveryClient(mockTokenProvider);
      const orgs = await client.getOrganizationsByRegion("EMEA");

      expect(orgs).toHaveLength(1);
      expect(orgs[0].UniqueName).toBe("fabrikam");
    });
  });

  describe("getEnabledOrganizations", () => {
    it("should filter for enabled organizations only", async () => {
      server.use(
        http.get(
          "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances",
          ({ request }) => {
            const url = new URL(request.url);
            const filter = url.searchParams.get("$filter");
            expect(filter).toBe("State eq 'Enabled'");

            return HttpResponse.json<DiscoveryResponse>({
              value: mockOrganizations.filter((org) => org.State === "Enabled"),
            });
          }
        )
      );

      const client = new DiscoveryClient(mockTokenProvider);
      const orgs = await client.getEnabledOrganizations();

      expect(orgs).toHaveLength(2);
      expect(orgs.every((org) => org.State === "Enabled")).toBe(true);
      expect(orgs.map((o) => o.UniqueName).sort()).toEqual(["contoso", "fabrikam"]);
    });
  });
});
