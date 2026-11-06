/**
 * #273 (xrm): every OrganizationService method takes an AbortSignal, and aborting it cancels the
 * request it sent (the signal reaches `fetch`), rejecting with the core `DataverseAbortError`.
 */
import { describe, it, expect, vi } from "vitest";
import { DataverseAbortError } from "@mohsinonxrm/dataverse-sdk-core";
import type { Executable, FetchProvider } from "@mohsinonxrm/dataverse-sdk-core";
import {
  createFakeFetch,
  createTestClient,
  jsonResponse,
  noContent,
} from "@mohsinonxrm/dataverse-sdk-testing";
import type { FakeFetch } from "@mohsinonxrm/dataverse-sdk-testing";
import { OrganizationService } from "../src/index.js";

const ID = "12345678-1234-1234-1234-123456789012";
const ID2 = "22222222-2222-2222-2222-222222222222";

/** Entity set names given up front, so only the operation's own request is sent. */
const SETS = { account: "accounts", systemuser: "systemusers", contact: "contacts" };

interface AbortableSetup {
  service: OrganizationService;
  fake: FakeFetch;
  /** The signal each `fetch` call received, in order. */
  fetchSignals: Array<AbortSignal | undefined>;
}

/**
 * A real client on a fake fetch that behaves like the platform one: it rejects with an
 * `AbortError` as soon as the signal it was given aborts, even while waiting for the response.
 */
function abortableService(
  entitySetNames: Record<string, string> = SETS,
  fake: FakeFetch = createFakeFetch()
): AbortableSetup {
  const fetchSignals: Array<AbortSignal | undefined> = [];
  const fetchProvider: FetchProvider = {
    fetch(input, init) {
      const signal = init?.signal ?? undefined;
      fetchSignals.push(signal);
      return new Promise<Response>((resolve, reject) => {
        const onAbort = (): void => {
          reject(new DOMException("The operation was aborted.", "AbortError"));
        };
        if (signal?.aborted) {
          onAbort();
          return;
        }
        signal?.addEventListener("abort", onAbort, { once: true });
        fake.fetchProvider.fetch(input, init).then(resolve, reject);
      });
    },
  };
  const { client } = createTestClient({ fetchProvider });
  return { service: new OrganizationService(client, { entitySetNames }), fake, fetchSignals };
}

/** Every request waits for a response that never comes (until it is aborted). */
function hang(fake: FakeFetch): void {
  fake.on("*", /.*/, () => new Promise<Response>(() => undefined));
}

/** Rejects if `promise` hasn't settled within `ms`, so a missing cancel fails fast. */
function settlesWithin<T>(promise: Promise<T>, ms = 1000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => {
        reject(new Error(`still pending after ${String(ms)} ms: the abort did not cancel it`));
      }, ms)
    ),
  ]);
}

/** A hand-written Executable for `execute()` (xrm doesn't depend on the functions package). */
const whoAmIFunction: Executable<{ UserId: string }> = {
  toRequestInformation: (baseUrl) => ({ method: "GET", url: `${baseUrl}/WhoAmI`, headers: {} }),
  parseResponse: async (res) => (await res.json()) as { UserId: string },
};

type Call = (service: OrganizationService, signal: AbortSignal) => Promise<unknown>;

const calls: Array<[string, Call]> = [
  ["create", (s, signal) => s.create("accounts", { name: "A" }, { signal })],
  [
    "create (returnRepresentation)",
    (s, signal) => s.create("accounts", { name: "A" }, { returnRepresentation: true, signal }),
  ],
  ["retrieve", (s, signal) => s.retrieve("accounts", ID, { select: ["name"], signal })],
  ["update", (s, signal) => s.update("accounts", ID, { name: "B" }, { signal })],
  ["delete", (s, signal) => s.delete("accounts", ID, { signal })],
  ["retrieveMultiple", (s, signal) => s.retrieveMultiple("accounts", { top: 1, signal })],
  [
    "associate",
    (s, signal) =>
      s.associate(
        "accounts",
        ID,
        "contact_customer_accounts",
        [{ logicalName: "contact", id: ID2 }],
        {
          signal,
        }
      ),
  ],
  [
    "disassociate",
    (s, signal) => s.disassociate("accounts", ID, "contact_customer_accounts", ID2, { signal }),
  ],
  ["whoAmI", (s, signal) => s.whoAmI({ signal })],
  ["assign", (s, signal) => s.assign("account", ID, ID2, "systemuser", { signal })],
  ["setState", (s, signal) => s.setState("account", ID, 1, 2, { signal })],
  ["execute", (s, signal) => s.execute(whoAmIFunction, { signal })],
  ["getEntitySetName", (s, signal) => s.getEntitySetName("opportunity", { signal })],
];

describe("#273: every OrganizationService method can be cancelled with an AbortSignal", () => {
  it.each(calls)("%s: aborting cancels the request in flight", async (_name, call) => {
    const { service, fake, fetchSignals } = abortableService();
    hang(fake);
    const controller = new AbortController();

    const pending = call(service, controller.signal);
    await vi.waitFor(() => {
      expect(fake.requests).toHaveLength(1);
    });
    controller.abort();

    const error = await settlesWithin(pending).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(DataverseAbortError);
    expect((error as Error).name).toBe("AbortError");
    // The request itself was cancelled, not only the promise.
    expect(fetchSignals).toHaveLength(1);
    expect(fetchSignals[0]?.aborted).toBe(true);
  });

  it.each(calls)("%s: an already aborted signal sends nothing", async (_name, call) => {
    const { client, fake } = createTestClient();
    // Answers that would make every call succeed if the signal were ignored.
    fake.on("*", /.*/, (req) =>
      req.method === "GET"
        ? jsonResponse({ value: [], UserId: ID, EntitySetName: "opportunities" })
        : noContent({
            "OData-EntityId": `https://contoso.crm.dynamics.com/api/data/v9.2/accounts(${ID})`,
          })
    );
    const service = new OrganizationService(client, { entitySetNames: SETS });

    await expect(call(service, AbortSignal.abort())).rejects.toBeInstanceOf(DataverseAbortError);
    expect(fake.requests).toHaveLength(0);
  });

  it("an unaborted signal changes nothing", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/WhoAmI", () =>
      jsonResponse({ UserId: ID, BusinessUnitId: ID2, OrganizationId: ID })
    );
    const service = new OrganizationService(client);

    await expect(service.whoAmI({ signal: new AbortController().signal })).resolves.toEqual({
      UserId: ID,
      BusinessUnitId: ID2,
      OrganizationId: ID,
    });
  });

  it("keeps passing headers and impersonation along with the signal", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", `/accounts(${ID})`, () => jsonResponse({ name: "A" }));
    const service = new OrganizationService(client);

    await service.retrieve("accounts", ID, {
      signal: new AbortController().signal,
      impersonateUserId: ID2,
      headers: { "x-custom": "1" },
    });

    expect(fake.last().headers.mscrmcallerid).toBe(ID2);
    expect(fake.last().headers["x-custom"]).toBe("1");
  });
});

describe("#273: methods that look up entity set names pass the signal to the lookup", () => {
  it("assign(): aborting during the metadata lookup cancels it and sends no PATCH", async () => {
    const { service, fake, fetchSignals } = abortableService({});
    hang(fake);
    const controller = new AbortController();

    const pending = service.assign("account", ID, ID2, "systemuser", {
      signal: controller.signal,
    });
    await vi.waitFor(() => {
      expect(fake.requests).toHaveLength(1);
    });
    expect(fake.last().path).toContain("/EntityDefinitions");
    controller.abort();

    await expect(settlesWithin(pending)).rejects.toBeInstanceOf(DataverseAbortError);
    expect(fetchSignals[0]?.aborted).toBe(true);
    expect(fake.requests.filter((r) => r.method === "PATCH")).toHaveLength(0);
  });

  it("setState() and associate() cancel their lookups too", async () => {
    const { service, fake, fetchSignals } = abortableService({});
    hang(fake);
    const a = new AbortController();
    const b = new AbortController();

    const setState = service.setState("account", ID, 1, 2, { signal: a.signal });
    const associate = service.associate(
      "accounts",
      ID,
      "contact_customer_accounts",
      [{ logicalName: "contact", id: ID2 }],
      { signal: b.signal }
    );
    await vi.waitFor(() => {
      expect(fake.requests).toHaveLength(2);
    });
    a.abort();
    b.abort();

    await expect(settlesWithin(setState)).rejects.toBeInstanceOf(DataverseAbortError);
    await expect(settlesWithin(associate)).rejects.toBeInstanceOf(DataverseAbortError);
    expect(fetchSignals.map((s) => s?.aborted)).toEqual([true, true]);
  });
});

describe("#273: a shared entity set name lookup is cancelled only when every caller aborted", () => {
  /** Answers the opportunity lookup when `release()` is called. */
  function deferredLookup(fake: FakeFetch): { release: () => void } {
    let release = (): void => undefined;
    const answered = new Promise<void>((resolve) => {
      release = resolve;
    });
    fake.on("GET", /^\/EntityDefinitions/, async () => {
      await answered;
      return jsonResponse({ EntitySetName: "opportunities" });
    });
    // The executor above has run, so `release` is the promise's resolve.
    return { release };
  }

  it("one caller aborting leaves the lookup running for the others", async () => {
    const { service, fake, fetchSignals } = abortableService({});
    const { release } = deferredLookup(fake);
    const a = new AbortController();
    const b = new AbortController();

    const first = service.getEntitySetName("opportunity", { signal: a.signal });
    const second = service.getEntitySetName("opportunity", { signal: b.signal });
    await vi.waitFor(() => {
      expect(fake.requests).toHaveLength(1);
    });
    a.abort();

    await expect(first).rejects.toBeInstanceOf(DataverseAbortError);
    expect(fetchSignals[0]?.aborted).toBe(false);
    release();
    await expect(second).resolves.toBe("opportunities");
    // The answer is cached: no second lookup.
    await expect(service.getEntitySetName("opportunity")).resolves.toBe("opportunities");
    expect(fake.requests).toHaveLength(1);
  });

  it("a caller without a signal keeps the lookup alive", async () => {
    const { service, fake, fetchSignals } = abortableService({});
    const { release } = deferredLookup(fake);
    const a = new AbortController();

    const withSignal = service.getEntitySetName("opportunity", { signal: a.signal });
    const withoutSignal = service.getEntitySetName("opportunity");
    await vi.waitFor(() => {
      expect(fake.requests).toHaveLength(1);
    });
    a.abort();

    await expect(withSignal).rejects.toBeInstanceOf(DataverseAbortError);
    expect(fetchSignals[0]?.aborted).toBe(false);
    release();
    await expect(withoutSignal).resolves.toBe("opportunities");
  });

  it("when every caller aborts, the request is cancelled and the next call looks up again", async () => {
    const { service, fake, fetchSignals } = abortableService({});
    hang(fake);
    const a = new AbortController();
    const b = new AbortController();

    const first = service.getEntitySetName("opportunity", { signal: a.signal });
    const second = service.getEntitySetName("opportunity", { signal: b.signal });
    await vi.waitFor(() => {
      expect(fake.requests).toHaveLength(1);
    });
    a.abort();
    expect(fetchSignals[0]?.aborted).toBe(false);
    b.abort();

    await expect(first).rejects.toBeInstanceOf(DataverseAbortError);
    await expect(second).rejects.toBeInstanceOf(DataverseAbortError);
    expect(fetchSignals[0]?.aborted).toBe(true);

    fake.on("GET", /^\/EntityDefinitions/, () => jsonResponse({ EntitySetName: "opportunities" }));
    await expect(service.getEntitySetName("opportunity")).resolves.toBe("opportunities");
    expect(fake.requests).toHaveLength(2);
  });

  it("a call made right after the last abort starts a new lookup instead of joining the cancelled one", async () => {
    // Found live: the cancelled lookup stayed cached until its rejection arrived, so a call in
    // that window (here: the same tick) was handed the cancelled request's AbortError.
    const { service, fake } = abortableService({});
    hang(fake);
    const controller = new AbortController();

    const cancelled = service.getEntitySetName("opportunity", { signal: controller.signal });
    await vi.waitFor(() => {
      expect(fake.requests).toHaveLength(1);
    });
    fake.on("GET", /^\/EntityDefinitions/, () => jsonResponse({ EntitySetName: "opportunities" }));
    controller.abort();
    const next = service.getEntitySetName("opportunity");

    await expect(cancelled).rejects.toBeInstanceOf(DataverseAbortError);
    await expect(settlesWithin(next)).resolves.toBe("opportunities");
    expect(fake.requests).toHaveLength(2);
  });

  it("does not leave abort listeners on a long-lived signal", async () => {
    const { service, fake } = abortableService({});
    const { release } = deferredLookup(fake);
    const signal = new AbortController().signal;
    const add = vi.spyOn(signal, "addEventListener");
    const remove = vi.spyOn(signal, "removeEventListener");

    const pending = service.getEntitySetName("opportunity", { signal });
    release();
    await expect(pending).resolves.toBe("opportunities");
    await vi.waitFor(() => {
      expect(remove).toHaveBeenCalledTimes(add.mock.calls.length);
    });
    expect(add.mock.calls.length).toBeGreaterThan(0);
  });
});
