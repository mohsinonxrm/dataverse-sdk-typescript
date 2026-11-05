import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createFakeFetch,
  fakeTokenProvider,
  jsonResponse,
  odataError,
  throttled,
} from "@mohsinonxrm/dataverse-sdk-testing";
import type { RecordedRequest } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  DataverseError,
  DataverseInvalidRequestError,
  DataverseODataError,
  DataverseThrottleError,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { Logger } from "@mohsinonxrm/dataverse-sdk-core";
import { DiscoveryClient } from "../src/index.js";
import type { DiscoveryClientOptions, OrganizationDetail } from "../src/index.js";
import instancesV2 from "./fixtures/instances-v2.json";

const DISCO = "https://globaldisco.crm.dynamics.com/api/discovery/v2.0";
const [contoso, contosoTest, contosoArchive] = instancesV2.value as OrganizationDetail[];

function setup(options: Omit<DiscoveryClientOptions, "fetchProvider"> = {}) {
  const fake = createFakeFetch({ apiUrl: DISCO });
  const tokens = fakeTokenProvider("disco-token");
  const client = new DiscoveryClient(tokens, { ...options, fetchProvider: fake.fetchProvider });
  return { fake, tokens, client };
}

function query(r: RecordedRequest, name: string): string | null {
  return new URL(r.url).searchParams.get(name);
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("DiscoveryClient pipeline (#30)", () => {
  describe("fetchProvider", () => {
    it("sends every request through the injected fetch, never the global one", async () => {
      const globalFetch = vi.fn(() => Promise.reject(new Error("global fetch used")));
      vi.stubGlobal("fetch", globalFetch);
      const { fake, tokens, client } = setup();
      fake.on("GET", "/Instances", () => jsonResponse({ value: [contoso] }));

      const orgs = await client.listOrganizations();

      expect(orgs).toEqual([contoso]);
      expect(globalFetch).not.toHaveBeenCalled();
      expect(fake.requests).toHaveLength(1);
      const r = fake.last();
      expect(r.url).toBe(`${DISCO}/Instances`);
      expect(r.headers.authorization).toBe("Bearer disco-token");
      expect(r.headers.accept).toBe("application/json");
      expect(r.headers["odata-version"]).toBe("4.0");
      expect(r.headers["odata-maxversion"]).toBe("4.0");
      expect(r.headers["x-ms-correlation-id"]).toMatch(/^[0-9a-f-]{36}$/);
      expect(tokens.calls).toEqual([["https://globaldisco.crm.dynamics.com/.default"]]);
    });

    it("logs through the injected logger", async () => {
      const logger: Logger = { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() };
      const { fake, client } = setup({ logger });
      fake.on("GET", "/Instances", () => jsonResponse({ value: [] }));

      await client.listOrganizations();

      expect(logger.debug).toHaveBeenCalledWith(
        expect.stringContaining(`GET ${DISCO}/Instances`),
        expect.anything()
      );
    });
  });

  describe("abort", () => {
    it("rejects with AbortError and sends nothing when the signal is already aborted", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () => jsonResponse({ value: [] }));
      const controller = new AbortController();
      controller.abort();

      await expect(
        client.getEnabledOrganizations({ signal: controller.signal })
      ).rejects.toMatchObject({ name: "AbortError" });
      expect(fake.requests).toHaveLength(0);
    });

    it("passes the signal to fetch", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () => jsonResponse({ value: [] }));
      const spy = vi.spyOn(fake.fetchProvider, "fetch");
      const controller = new AbortController();

      await client.getOrganization("contoso", { signal: controller.signal });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0]?.[1]?.signal).toBe(controller.signal);
    });

    it("cancels a retry wait", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () => throttled(30));
      const controller = new AbortController();

      const started = Date.now();
      const pending = client.listOrganizations({ signal: controller.signal });
      setTimeout(() => {
        controller.abort();
      }, 20);

      await expect(pending).rejects.toMatchObject({ name: "AbortError" });
      expect(Date.now() - started).toBeLessThan(5000);
      expect(fake.requests).toHaveLength(1);
    });
  });

  describe("retry", () => {
    it("retries a 503 and returns the next response", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () => jsonResponse({ value: [contoso] }));
      fake.on(
        "GET",
        "/Instances",
        () => odataError(503, "ServiceUnavailable", "Try again", { "retry-after": "0" }),
        1
      );

      const orgs = await client.listOrganizations();

      expect(orgs).toEqual([contoso]);
      expect(fake.requests).toHaveLength(2);
      expect(fake.requests[1]?.headers["retry-attempt"]).toBe("1");
      expect(fake.requests[1]?.headers.authorization).toBe("Bearer disco-token");
    });

    it("honours the retry option and surfaces a 429 as DataverseThrottleError", async () => {
      const { fake, client } = setup({ retry: { maxRetries: 0 } });
      fake.on("GET", "/Instances", () => throttled(7));

      const err: unknown = await client.listOrganizations().catch((e: unknown) => e);

      expect(err).toBeInstanceOf(DataverseThrottleError);
      expect(err).toBeInstanceOf(DataverseError);
      expect(err).toMatchObject({ status: 429, code: "0x80072322", retryAfterMs: 7000 });
      expect(fake.requests).toHaveLength(1);
    });
  });

  describe("errors", () => {
    it("maps a 401 to DataverseODataError with status, code and message", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () =>
        odataError(401, "InvalidAuthenticationToken", "The access token is invalid.")
      );

      const err: unknown = await client.listOrganizations().catch((e: unknown) => e);

      expect(err).toBeInstanceOf(DataverseODataError);
      expect(err).toBeInstanceOf(DataverseError);
      expect(err).toMatchObject({
        status: 401,
        code: "InvalidAuthenticationToken",
        message: "The access token is invalid.",
      });
    });

    it("maps a non-JSON error body too", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () => new Response("Forbidden", { status: 403 }));

      await expect(client.listOrganizations()).rejects.toMatchObject({
        name: "DataverseODataError",
        status: 403,
      });
    });
  });

  describe("escaping and encoding", () => {
    it("doubles quotes in getOrganization's unique name", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () => jsonResponse({ value: [] }));

      await client.getOrganization("o'brien");

      expect(query(fake.last(), "$filter")).toBe("UniqueName eq 'o''brien'");
      // URL serialisation percent-encodes the quotes in the query.
      expect(fake.last().url).toBe(
        `${DISCO}/Instances?$filter=UniqueName%20eq%20%27o%27%27brien%27`
      );
    });

    it("doubles quotes in getOrganizationsByRegion's region", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () => jsonResponse({ value: [] }));

      await client.getOrganizationsByRegion("N'A' or State eq 1 or Region eq '");

      expect(query(fake.last(), "$filter")).toBe(
        "Region eq 'N''A'' or State eq 1 or Region eq '''"
      );
    });

    it("percent-encodes $filter, $select and $orderby values", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () => jsonResponse({ value: [] }));

      await client.listOrganizations({
        filter: "contains(FriendlyName,'A&B+C#1')",
        select: ["FriendlyName", "Odd&Name=1"],
        orderby: "FriendlyName desc",
      });

      const r = fake.last();
      expect(query(r, "$filter")).toBe("contains(FriendlyName,'A&B+C#1')");
      expect(query(r, "$select")).toBe("FriendlyName,Odd&Name=1");
      expect(query(r, "$orderby")).toBe("FriendlyName desc");
      // Exactly three parameters reached the wire: no value leaked a `&`, `=`, `+` or `#`.
      expect(r.url.split("?")[1]).toBe(
        "$filter=contains(FriendlyName%2C%27A%26B%2BC%231%27)" +
          "&$select=FriendlyName,Odd%26Name%3D1" +
          "&$orderby=FriendlyName%20desc"
      );
    });
  });

  describe("@odata.nextLink", () => {
    it("follows absolute next links and concatenates the pages", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", (r) => {
        switch (query(r, "$skiptoken")) {
          case null:
            return jsonResponse({
              value: [contoso],
              "@odata.nextLink": `${DISCO}/Instances?$filter=State%20eq%200&$skiptoken=p2`,
            });
          case "p2":
            return jsonResponse({
              value: [contosoTest],
              "@odata.nextLink": `${DISCO}/Instances?$filter=State%20eq%200&$skiptoken=p3`,
            });
          default:
            return jsonResponse({ value: [contosoArchive] });
        }
      });

      const orgs = await client.getEnabledOrganizations();

      expect(orgs.map((o) => o.UrlName)).toEqual(["contoso", "contoso-test", "contoso-archive"]);
      expect(fake.requests.map((r) => query(r, "$skiptoken"))).toEqual([null, "p2", "p3"]);
      expect(fake.requests.every((r) => r.headers.authorization === "Bearer disco-token")).toBe(
        true
      );
    });

    it("resolves a relative next link against the page URL", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", (r) =>
        query(r, "$skiptoken")
          ? jsonResponse({ value: [contosoTest] })
          : jsonResponse({ value: [contoso], "@odata.nextLink": "Instances?$skiptoken=p2" })
      );

      const orgs = await client.listOrganizations();

      expect(orgs).toHaveLength(2);
      expect(fake.last().url).toBe(`${DISCO}/Instances?$skiptoken=p2`);
    });

    it("refuses to send the token to a next link on another host", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () =>
        jsonResponse({ value: [contoso], "@odata.nextLink": "https://evil.example/Instances" })
      );

      await expect(client.listOrganizations()).rejects.toBeInstanceOf(DataverseInvalidRequestError);
      expect(fake.requests.map((r) => new URL(r.url).host)).toEqual([
        "globaldisco.crm.dynamics.com",
      ]);
    });

    it("stops when a next link repeats a page", async () => {
      const { fake, client } = setup();
      fake.on("GET", "/Instances", () =>
        jsonResponse({ value: [contoso], "@odata.nextLink": `${DISCO}/Instances` })
      );

      await expect(client.listOrganizations()).rejects.toThrow(/repeated/);
      expect(fake.requests).toHaveLength(1);
    });
  });
});
