import { describe, it, expect, beforeEach } from "vitest";
import { createTestClient, TEST_API_URL, type FakeFetch } from "@mohsinonxrm/dataverse-sdk-testing";
import { BatchRequestBuilder } from "../src/BatchRequestBuilder.js";
import { DataverseBatchError } from "../src/errors.js";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import * as recorded from "./fixtures/recorded.js";

describe("BatchRequestBuilder", () => {
  let client: DataverseClient;
  let fake: FakeFetch;
  let builder: BatchRequestBuilder;

  // A real client and a fake fetch that answers $batch with a response recorded from Dataverse.
  const withResponse = (_client: DataverseClient, r: recorded.RecordedBatchResponse) => {
    fake.on(
      "POST",
      "/$batch",
      () => new Response(r.body, { status: r.status, headers: { "content-type": r.contentType } })
    );
  };

  beforeEach(() => {
    ({ client, fake } = createTestClient());
    builder = new BatchRequestBuilder(client);
  });

  describe("constructor", () => {
    it("should initialize with empty state", () => {
      expect(builder.getTotalRequestCount()).toBe(0);
    });
  });

  describe("addRequest", () => {
    it("should add a GET request", () => {
      builder.addRequest("req1", "GET", "/accounts");
      expect(builder.getTotalRequestCount()).toBe(1);
    });

    it("should throw on duplicate request ID", () => {
      builder.addRequest("req1", "GET", "/accounts");
      expect(() => builder.addRequest("req1", "GET", "/contacts")).toThrow("Duplicate request ID");
    });

    it("resolves relative URLs against the Web API root, with or without a leading slash (#55)", () => {
      builder.addRequest("a", "GET", "accounts?$select=name");
      builder.addRequest("b", "GET", "/contacts");
      builder.addRequest("c", "GET", "https://other.crm.dynamics.com/api/data/v9.2/leads");
      const body = builder.encode("b1");
      expect(body).toContain(`GET ${TEST_API_URL}/accounts?$select=name HTTP/1.1\r\n`);
      expect(body).toContain(`GET ${TEST_API_URL}/contacts HTTP/1.1\r\n`);
      expect(body).toContain("GET https://other.crm.dynamics.com/api/data/v9.2/leads HTTP/1.1\r\n");
    });

    it("leaves $<id> references as they are (#55)", () => {
      builder.beginChangeset();
      builder.addRequest("acct", "POST", "accounts", undefined, { name: "A" });
      builder.addRequest("upd", "PATCH", "$acct", undefined, { description: "x" }, ["acct"]);
      builder.endChangeset();
      expect(builder.encode("b1")).toContain("PATCH $acct HTTP/1.1\r\n");
    });

    it("sends each change set request's id as its Content-ID (#55)", () => {
      builder.beginChangeset();
      builder.addRequest("acct", "POST", "accounts", undefined, { name: "A" });
      builder.endChangeset();
      builder.beginChangeset();
      builder.addRequest("acct-2", "POST", "accounts", undefined, { name: "B" });
      builder.endChangeset();
      const ids = [...builder.encode("b1").matchAll(/^Content-ID: (.*)\r$/gm)].map((m) => m[1]);
      expect(ids).toEqual(["acct", "acct-2"]);
    });

    it("rejects a change set id that cannot be a Content-ID", () => {
      builder.beginChangeset();
      expect(() => builder.addRequest("has space", "POST", "accounts", undefined, {})).toThrow(
        "Invalid request ID in a changeset"
      );
      expect(() => builder.addRequest("$1", "POST", "accounts", undefined, {})).toThrow(
        "Invalid request ID in a changeset"
      );
    });

    it("allows any id outside a change set", () => {
      builder.addRequest("assoc-00000000-0000-0000-0000-000000000001 / x", "GET", "WhoAmI");
      expect(builder.getTotalRequestCount()).toBe(1);
    });

    it("checks dependsOn against earlier requests of the same change set (#55)", () => {
      builder.addRequest("outside", "POST", "accounts", undefined, {});
      builder.beginChangeset();
      builder.addRequest("acct", "POST", "accounts", undefined, {});
      expect(() =>
        builder.addRequest("c1", "POST", "contacts", undefined, {}, ["outside"])
      ).toThrow('depends on "outside"');
      expect(() => builder.addRequest("c2", "POST", "contacts", undefined, {}, ["later"])).toThrow(
        'depends on "later"'
      );
      builder.addRequest("c3", "POST", "contacts", undefined, {}, ["acct"]);
      builder.endChangeset();
      expect(builder.getTotalRequestCount()).toBe(3);
    });

    it("rejects dependsOn outside a change set", () => {
      builder.addRequest("a", "POST", "accounts", undefined, {});
      expect(() => builder.addRequest("b", "POST", "contacts", undefined, {}, ["a"])).toThrow(
        'depends on "a"'
      );
    });

    it("keeps the order of interleaved requests and change sets (#55)", () => {
      builder.addRequest("g1", "GET", "accounts");
      builder.beginChangeset();
      builder.addRequest("c1", "POST", "contacts", undefined, {});
      builder.endChangeset();
      builder.addRequest("g2", "GET", "leads");
      const urls = [...builder.encode("b").matchAll(/^(?:GET|POST) (\S+) HTTP/gm)].map((m) => m[1]);
      expect(urls).toEqual([
        `${TEST_API_URL}/accounts`,
        `${TEST_API_URL}/contacts`,
        `${TEST_API_URL}/leads`,
      ]);
    });
  });

  describe("beginChangeset / endChangeset", () => {
    it("should throw if changeset already active", () => {
      builder.beginChangeset();
      expect(() => builder.beginChangeset()).toThrow("Cannot nest changesets");
    });

    it("should throw if no active changeset", () => {
      expect(() => builder.endChangeset()).toThrow("No active changeset");
    });

    it("should throw if changeset is empty", () => {
      builder.beginChangeset();
      expect(() => builder.endChangeset()).toThrow("Changeset cannot be empty");
    });
  });

  describe("getTotalRequestCount", () => {
    it("should count both individual and changeset requests, including an open changeset", () => {
      builder.addRequest("req1", "GET", "/accounts");
      builder.beginChangeset();
      builder.addRequest("req2", "POST", "/accounts", {}, { name: "Test" });
      builder.addRequest("req3", "POST", "/contacts", {}, { name: "Contact" });
      builder.endChangeset();
      builder.addRequest("req4", "GET", "/leads");
      builder.beginChangeset();
      builder.addRequest("req5", "POST", "/accounts", {}, { name: "Test" });
      expect(builder.getTotalRequestCount()).toBe(5);
    });
  });

  describe("clear", () => {
    it("should reset all state", () => {
      builder.addRequest("req1", "GET", "/accounts");
      builder.beginChangeset();
      builder.addRequest("req2", "POST", "/accounts", {}, { name: "Test" });
      builder.endChangeset();

      builder.clear();

      expect(builder.getTotalRequestCount()).toBe(0);
      // Ids can be reused after clear().
      builder.addRequest("req1", "GET", "/accounts");
      expect(builder.encode("b")).toBe(
        [
          "--b",
          "Content-Type: application/http",
          "Content-Transfer-Encoding: binary",
          "",
          `GET ${TEST_API_URL}/accounts HTTP/1.1`,
          "",
          "--b--",
          "",
        ].join("\r\n")
      );
    });
  });

  describe("execute: validation", () => {
    it("should throw if no requests", async () => {
      await expect(builder.execute()).rejects.toThrow("Cannot execute empty batch");
    });

    it("should throw if changeset not closed", async () => {
      builder.beginChangeset();
      builder.addRequest("req1", "POST", "/accounts", {}, { name: "Test" });
      await expect(builder.execute()).rejects.toThrow(
        "Cannot execute batch with an open changeset"
      );
    });

    it("should throw if total requests exceed MAX_BATCH_SIZE", async () => {
      for (let i = 0; i < 1001; i++) {
        builder.addRequest(`req${String(i)}`, "GET", "/accounts");
      }
      await expect(builder.execute()).rejects.toThrow("exceeding the maximum of 1000");
    });
  });

  describe("execute: matching recorded responses to requests (#56)", () => {
    it("a GET-only batch: every response, keyed by the caller's id", async () => {
      withResponse(client, recorded.getOnly);
      builder.addRequest("who", "GET", "WhoAmI");
      builder.addRequest("top", "GET", "accounts?$select=name&$top=1");
      const result = await builder.execute();
      expect(result.success).toBe(true);
      expect([...result.responses.keys()]).toEqual(["who", "top"]);
      expect(result.results.map((r) => [r.id, r.status])).toEqual([
        ["who", 200],
        ["top", 200],
      ]);
      expect(result.responses.get("who")?.body.UserId).toBe("10000000-0000-0000-0000-000000000003");
      expect(result.successfulRequests).toBe(2);
      expect(result.stoppedEarly).toBe(false);
      expect(result.skippedRequestIds).toEqual([]);
    });

    it("a GET and a change set: matched by position and by Content-ID", async () => {
      withResponse(client, recorded.changesetSuccess);
      builder.addRequest("who", "GET", "WhoAmI");
      builder.beginChangeset();
      builder.addRequest("acct", "POST", "accounts", undefined, { name: "A" });
      builder.addRequest(
        "contact",
        "POST",
        "contacts",
        undefined,
        { lastname: "B", "parentcustomerid_account@odata.bind": "$acct" },
        ["acct"]
      );
      builder.endChangeset();
      const result = await builder.execute();
      expect(result.results.map((r) => [r.id, r.status])).toEqual([
        ["who", 200],
        ["acct", 204],
        ["contact", 204],
      ]);
      expect(result.responses.get("contact")?.headers["odata-entityid"]).toMatch(
        /\/contacts\(10000000-0000-0000-0000-000000000008\)$/
      );
      expect(result.totalRequests).toBe(3);
    });

    it("a failed change set: the failing request's error, the rest reported as skipped", async () => {
      withResponse(client, recorded.changesetFailure);
      builder.beginChangeset();
      builder.addRequest("1", "POST", "accounts", undefined, { name: "A" });
      builder.addRequest(
        "2",
        "PATCH",
        "accounts(00000000-0000-0000-0000-000000000001)",
        {
          "If-Match": "*",
        },
        { name: "x" }
      );
      builder.endChangeset();
      builder.addRequest("who", "GET", "WhoAmI");
      const error = (await builder.execute().catch((e: unknown) => e)) as DataverseBatchError;
      expect(error).toBeInstanceOf(DataverseBatchError);
      expect(error.getFailedRequestIds()).toEqual(["2"]);
      expect(error.getErrorForRequest("2")?.body.error.code).toBe("0x80040217");
      expect(error.successfulRequests).toBe(0);
      expect(error.failedRequests).toBe(1);
    });

    it("stopped early: the first failure is kept, keyed by the caller's id", async () => {
      withResponse(client, recorded.stoppedEarly);
      builder.addRequest("who", "GET", "WhoAmI");
      builder.addRequest("del", "DELETE", "accounts(00000000-0000-0000-0000-000000000001)");
      builder.addRequest("who2", "GET", "WhoAmI");
      const error = (await builder.execute().catch((e: unknown) => e)) as DataverseBatchError;
      expect(error).toBeInstanceOf(DataverseBatchError);
      expect(error.getFailedRequestIds()).toEqual(["del"]);
      expect(error.successfulRequests).toBe(1);
      expect(error.totalRequests).toBe(3);
    });
  });
});
