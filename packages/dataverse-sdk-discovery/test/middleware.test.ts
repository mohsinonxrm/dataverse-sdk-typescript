/**
 * #274: `DiscoveryClientOptions.middleware` customises the pipeline the way
 * `DataverseClientOptions.middleware` does, so an app can record discovery requests without
 * wrapping `fetchProvider`.
 */
import { describe, expect, it } from "vitest";
import {
  createFakeFetch,
  fakeTokenProvider,
  jsonResponse,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { buildUrl } from "@mohsinonxrm/dataverse-sdk-core";
import type { Middleware } from "@mohsinonxrm/dataverse-sdk-core";
import { DiscoveryClient } from "../src/index.js";
import type { DiscoveryClientOptions, OrganizationDetail } from "../src/index.js";
import instancesV2 from "./fixtures/instances-v2.json";

const DISCO = "https://globaldisco.crm.dynamics.com/api/discovery/v2.0";
const [contoso, contosoTest] = instancesV2.value as OrganizationDetail[];

interface Seen {
  method: string;
  url: string;
  authorization?: string;
  status: number;
}

/** A middleware that records each request it passes on and the status that came back. */
function recorder(seen: Seen[]): Middleware {
  return {
    name: "recorder",
    execute: async (request, ctx, next) => {
      // Read the request before passing it on: later middleware may change it.
      const method = request.method;
      const url = buildUrl(request);
      const authorization = request.headers.authorization;
      const res = await next(request, ctx);
      seen.push({ method, url, authorization, status: res.status });
      return res;
    },
  };
}

function setup(middleware: DiscoveryClientOptions["middleware"]) {
  const fake = createFakeFetch({ apiUrl: DISCO });
  const client = new DiscoveryClient(fakeTokenProvider("disco-token"), {
    fetchProvider: fake.fetchProvider,
    retry: { maxRetries: 0 },
    middleware,
  });
  return { fake, client };
}

describe("DiscoveryClient middleware (#274)", () => {
  it("an appended middleware sees every request, with the final URL and the bearer token", async () => {
    const seen: Seen[] = [];
    const { fake, client } = setup({ append: [recorder(seen)] });
    fake.on("GET", "/Instances", (req) =>
      req.url.includes("$skiptoken")
        ? jsonResponse({ value: [contosoTest] })
        : jsonResponse({
            value: [contoso],
            "@odata.nextLink": `${DISCO}/Instances?$filter=State%20eq%200&$skiptoken=2`,
          })
    );

    const orgs = await client.listOrganizations({ filter: "State eq 0" });

    expect(orgs).toEqual([contoso, contosoTest]);
    expect(seen).toEqual(
      fake.requests.map((r) => ({
        method: "GET",
        url: r.url,
        authorization: "Bearer disco-token",
        status: 200,
      }))
    );
    expect(seen.map((s) => s.url)).toEqual([
      `${DISCO}/Instances?$filter=State%20eq%200`,
      `${DISCO}/Instances?$filter=State%20eq%200&$skiptoken=2`,
    ]);
  });

  it("a prepended middleware runs before auth, so it sees no token", async () => {
    const seen: Seen[] = [];
    const { fake, client } = setup({ prepend: [recorder(seen)] });
    fake.on("GET", "/Instances", () => jsonResponse({ value: [contoso] }));

    await client.getEnabledOrganizations();

    expect(seen).toHaveLength(1);
    expect(seen[0]?.authorization).toBeUndefined();
    expect(seen[0]?.url).toBe(fake.last().url);
  });

  it("a middleware can answer the request itself", async () => {
    const { fake, client } = setup({
      prepend: [
        {
          name: "stub",
          execute: () => Promise.resolve(jsonResponse({ value: [contosoTest] })),
        },
      ],
    });

    expect(await client.listOrganizations()).toEqual([contosoTest]);
    expect(fake.requests).toHaveLength(0);
  });

  it("`replace` receives the default middleware", async () => {
    let names: string[] = [];
    const { fake, client } = setup({
      replace: (defaults) => {
        names = defaults.map((m) => m.name);
        return defaults;
      },
    });
    fake.on("GET", "/Instances", () => jsonResponse({ value: [] }));

    await client.listOrganizations();

    expect(names.length).toBeGreaterThan(0);
    expect(fake.last().headers.authorization).toBe("Bearer disco-token");
  });
});
