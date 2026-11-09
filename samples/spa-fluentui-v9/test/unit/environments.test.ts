/**
 * Signing in without an environment URL: the environment picker's discovery call, ordering and
 * filter, and the last environment remembered per account.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { createFakeFetch, fakeTokenProvider, odataError } from "@mohsinonxrm/dataverse-sdk-testing";
import type { DiscoveredEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
import {
  canChoose,
  DISCOVERY_SCOPES,
  discoverEnvironments,
  filterEnvironments,
  hostOf,
  sortEnvironments,
} from "../../src/auth/environments";
import { readLastEnvironment, rememberEnvironment } from "../../src/auth/lastEnvironment";
import { signInScopes } from "../../src/auth/msalSession";
import { createDemoState, createFakeDataverse } from "../../src/demo/fakeDataverse";

function env(name: string, url: string, extra: Partial<DiscoveredEnvironment> = {}) {
  return {
    id: name,
    url,
    apiUrl: url.replace(".crm.", ".api.crm."),
    webApiUrl: `${url.replace(".crm.", ".api.crm.")}/api/data/v9.2`,
    name,
    uniqueName: `unq_${name.toLowerCase().replace(/\W/g, "")}`,
    enabled: true,
    version: "9.2.26101.161",
    region: "NA",
    ...extra,
  } satisfies DiscoveredEnvironment;
}

const ALPHA = env("alpha", "https://alpha.crm.dynamics.com");
const BETA = env("Beta", "https://beta.crm4.dynamics.com", { region: "EUR" });
const OLD = env("Archive", "https://archive.crm.dynamics.com", { enabled: false });

describe("environment discovery", () => {
  it("asks the Commercial Global Discovery Service with the user_impersonation scope", () => {
    expect(DISCOVERY_SCOPES).toEqual(["https://globaldisco.crm.dynamics.com/user_impersonation"]);
    // Sign-in asks for the scope of what comes next: the environment, or discovery.
    expect(signInScopes("")).toEqual(DISCOVERY_SCOPES);
    expect(signInScopes("https://contoso.crm.dynamics.com")).toEqual([
      "https://contoso.crm.dynamics.com/user_impersonation",
    ]);
  });

  it("lists the demo environments, the last used first and the disabled one last", async () => {
    const tokenProvider = fakeTokenProvider();
    const fetchProvider = createFakeDataverse(createDemoState(), [0, 0]);
    const list = await discoverEnvironments(
      { tokenProvider, fetchProvider },
      { lastUsed: "https://contoso-dev.crm.dynamics.com/" }
    );
    expect(list.map((e) => e.name)).toEqual(["Contoso Dev", "Contoso (demo)", "Fabrikam Test"]);
    expect(list.map(canChoose)).toEqual([true, true, false]);
    expect(tokenProvider.calls).toEqual([DISCOVERY_SCOPES]);
  });

  it("rejects with the service's error, for the picker's error state", async () => {
    const fake = createFakeFetch();
    fake.on("GET", /\/Instances/, () =>
      odataError(403, "0x80072560", "The user is not a member of the organization.")
    );
    await expect(
      discoverEnvironments({
        tokenProvider: fakeTokenProvider(),
        fetchProvider: fake.fetchProvider,
      })
    ).rejects.toMatchObject({
      status: 403,
      message: expect.stringContaining("not a member") as unknown,
    });
    expect(new URL(fake.last().url).host).toBe("globaldisco.crm.dynamics.com");
  });

  it("orders enabled environments by name, ignoring case", () => {
    expect(sortEnvironments([OLD, BETA, ALPHA]).map((e) => e.name)).toEqual([
      "alpha",
      "Beta",
      "Archive",
    ]);
    expect(
      sortEnvironments([OLD, BETA, ALPHA], "https://BETA.crm4.dynamics.com").map((e) => e.name)
    ).toEqual(["Beta", "alpha", "Archive"]);
  });

  it("filters on name, host, unique name and region, every word", () => {
    const all = [ALPHA, BETA, OLD];
    expect(filterEnvironments(all, "")).toEqual(all);
    expect(filterEnvironments(all, "  BETA ")).toEqual([BETA]);
    expect(filterEnvironments(all, "crm4")).toEqual([BETA]);
    expect(filterEnvironments(all, "unq_archive")).toEqual([OLD]);
    expect(filterEnvironments(all, "na alpha")).toEqual([ALPHA]);
    expect(filterEnvironments(all, "eur alpha")).toEqual([]);
  });

  it("offers only enabled environments at a URL the site may call", () => {
    expect(canChoose(ALPHA)).toBe(true);
    expect(canChoose(OLD)).toBe(false);
    expect(canChoose(env("Elsewhere", "https://contoso.crm.microsoftdynamics.us"))).toBe(false);
    expect(hostOf("https://alpha.crm.dynamics.com")).toBe("alpha.crm.dynamics.com");
    expect(hostOf("not a url")).toBe("not a url");
  });
});

describe("last environment per account", () => {
  function useStorage(storage: Partial<Storage>) {
    vi.stubGlobal("window", { localStorage: storage });
  }

  function memoryStorage(): Storage & { data: Map<string, string> } {
    const data = new Map<string, string>();
    return {
      data,
      get length() {
        return data.size;
      },
      clear: () => data.clear(),
      key: (i) => [...data.keys()][i] ?? null,
      getItem: (k) => data.get(k) ?? null,
      setItem: (k, v) => void data.set(k, v),
      removeItem: (k) => void data.delete(k),
    };
  }

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("remembers each account's choice separately", () => {
    useStorage(memoryStorage());
    expect(readLastEnvironment("a")).toBeUndefined();
    rememberEnvironment("a", "https://alpha.crm.dynamics.com/main.aspx");
    rememberEnvironment("b", "https://beta.crm4.dynamics.com");
    rememberEnvironment("a", "https://alpha-dev.crm.dynamics.com");
    expect(readLastEnvironment("a")).toBe("https://alpha-dev.crm.dynamics.com");
    expect(readLastEnvironment("b")).toBe("https://beta.crm4.dynamics.com");
  });

  it("ignores URLs the site can't call, and odd account ids stay data", () => {
    const storage = memoryStorage();
    useStorage(storage);
    rememberEnvironment("a", "https://example.com");
    expect(readLastEnvironment("a")).toBeUndefined();
    rememberEnvironment("__proto__", "https://alpha.crm.dynamics.com");
    expect(readLastEnvironment("__proto__")).toBe("https://alpha.crm.dynamics.com");
    expect(readLastEnvironment("toString")).toBeUndefined();
    expect(JSON.parse(storage.getItem("explorer-last-environment") ?? "")).toEqual(
      JSON.parse('{"__proto__": "https://alpha.crm.dynamics.com"}')
    );
  });

  it("keeps the 20 most recent accounts", () => {
    useStorage(memoryStorage());
    for (let i = 0; i < 25; i++)
      rememberEnvironment(`user${i}`, `https://org${i}.crm.dynamics.com`);
    expect(readLastEnvironment("user4")).toBeUndefined();
    expect(readLastEnvironment("user5")).toBe("https://org5.crm.dynamics.com");
    expect(readLastEnvironment("user24")).toBe("https://org24.crm.dynamics.com");
  });

  it("survives broken or blocked storage", () => {
    const storage = memoryStorage();
    useStorage(storage);
    storage.setItem("explorer-last-environment", "{not json");
    expect(readLastEnvironment("a")).toBeUndefined();
    storage.setItem("explorer-last-environment", '{"a": 42, "b": "https://b.crm.dynamics.com"}');
    expect(readLastEnvironment("a")).toBeUndefined();
    expect(readLastEnvironment("b")).toBe("https://b.crm.dynamics.com");
    useStorage({
      getItem: () => {
        throw new Error("SecurityError");
      },
      setItem: () => {
        throw new Error("SecurityError");
      },
    });
    expect(() => rememberEnvironment("a", "https://alpha.crm.dynamics.com")).not.toThrow();
    expect(readLastEnvironment("a")).toBeUndefined();
  });
});
