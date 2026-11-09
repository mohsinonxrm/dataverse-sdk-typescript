/**
 * The Error handling page: each scenario throws the error class its card is for. Run against the
 * SDK's recording fake fetch, and against demo mode's environment.
 */
import { describe, expect, it } from "vitest";
import {
  batchResponse,
  fakeTokenProvider,
  jsonResponse,
  odataError,
  TEST_ORG_URL,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { createSdk } from "../../src/sdk/createSdk";
import { classifyError } from "../../src/lib/errors";
import * as errors from "../../src/scenarios/errors";
import { whoAmI } from "../../src/scenarios/basics";
import { signal, withDemo, withFakeFetch } from "./helpers";

async function kindOf(promise: Promise<unknown>) {
  try {
    await promise;
  } catch (error) {
    return classifyError(error);
  }
  throw new Error("expected the scenario to fail");
}

describe("error scenarios (recording fake fetch)", () => {
  it("an invalid filter is a DataverseODataError with its code and ids", async () => {
    const { sdk, fake } = withFakeFetch();
    fake.on("GET", "/accounts", () => odataError(400, "0x80060888", "Syntax error"));
    const c = await kindOf(errors.invalidFilter(sdk, { filter: "name eq" }, signal()));
    expect(c.kind).toBe("odata");
    if (c.kind !== "odata") return;
    expect(c.error.status).toBe(400);
    expect(c.error.code).toBe("0x80060888");
    expect(c.error.requestId).toBeDefined();
    expect(fake.last().url).toContain("$filter=name%20eq");
  });

  it("a short Retry-After is waited out and retried; a long one throws DataverseThrottleError", async () => {
    const { sdk, exchanges, fake } = withFakeFetch();
    fake.on("GET", "/WhoAmI", () => jsonResponse({ UserId: "u" }));
    await expect(errors.throttled(sdk, { retryAfterSeconds: 0 }, signal())).resolves.toEqual({
      UserId: "u",
    });
    expect(exchanges.map((e) => e.status)).toEqual([429, 200]);

    const c = await kindOf(errors.throttled(sdk, { retryAfterSeconds: 30 }, signal()));
    expect(c.kind).toBe("throttle");
    if (c.kind === "throttle") expect(c.error.retryAfterMs).toBe(30_000);
  });

  it("a failing fetch is retried, then a DataverseNetworkError", async () => {
    const { sdk, exchanges } = withFakeFetch();
    expect((await kindOf(errors.offline(sdk, signal()))).kind).toBe("network");
    expect(exchanges).toHaveLength(3);
  });

  it("an aborted request is a DataverseAbortError", async () => {
    // A fetch that only settles when aborted, like a slow request.
    const slow = (_: unknown, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () =>
          reject(new DOMException("Aborted", "AbortError"))
        );
      });
    const sdk = createSdk(
      {
        environmentUrl: TEST_ORG_URL,
        tokenProvider: fakeTokenProvider(),
        fetchProvider: { fetch: slow },
      },
      () => undefined
    );
    expect((await kindOf(errors.aborted(sdk, signal()))).kind).toBe("abort");
  });

  it("a request for another origin is refused before it is sent", async () => {
    const { sdk, fake } = withFakeFetch();
    expect((await kindOf(errors.foreignOrigin(sdk, signal()))).kind).toBe("invalid");
    expect(fake.requests).toHaveLength(0);
  });

  it("a failed change set is a DataverseBatchError with every request's outcome", async () => {
    const { sdk, fake } = withFakeFetch();
    fake.on("POST", "/$batch", () =>
      batchResponse([
        { status: 404, body: { error: { code: "0x80040217", message: "Does Not Exist" } } },
      ])
    );
    const c = await kindOf(errors.failedChangeset(sdk));
    expect(c.kind).toBe("batch");
    if (c.kind !== "batch") return;
    expect(c.error.failedRequests).toBeGreaterThan(0);
    expect(c.error.result?.success).toBe(false);
  });
});

describe("error scenarios (demo environment)", () => {
  it("who am I works", async () => {
    const { sdk } = withDemo();
    await expect(whoAmI(sdk, signal())).resolves.toMatchObject({ sameUser: true });
  });

  it.each([
    [
      "odata",
      (h: ReturnType<typeof withDemo>) =>
        errors.invalidFilter(h.sdk, { filter: "name eq" }, signal()),
    ],
    [
      "odata",
      (h: ReturnType<typeof withDemo>) =>
        errors.missingRecord(h.sdk, { id: "00000000-0000-0000-0000-000000000001" }, signal()),
    ],
    [
      "throttle",
      (h: ReturnType<typeof withDemo>) =>
        errors.throttled(h.sdk, { retryAfterSeconds: 30 }, signal()),
    ],
    [
      "network",
      (h: ReturnType<typeof withDemo>) => errors.timeout(h.sdk, { timeoutMs: 1 }, signal()),
    ],
    ["batch", (h: ReturnType<typeof withDemo>) => errors.failedChangeset(h.sdk)],
  ] as const)("throws a %s error", async (kind, run) => {
    const harness = withDemo();
    expect((await kindOf(run(harness))).kind).toBe(kind);
  });

  it("rolls back the change set: the account it created is gone", async () => {
    const { sdk } = withDemo();
    const before = await sdk.client
      .api("accounts")
      .select("name")
      .count()
      .top(1)
      .get<{ "@odata.count": number }>();
    await kindOf(errors.failedChangeset(sdk));
    const after = await sdk.client
      .api("accounts")
      .select("name")
      .count()
      .top(1)
      .get<{ "@odata.count": number }>();
    expect(after["@odata.count"]).toBe(before["@odata.count"]);
  });
});
