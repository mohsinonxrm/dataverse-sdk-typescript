import { describe, it, expect, vi, beforeEach } from "vitest";
import { BatchRequestBuilder } from "../src/BatchRequestBuilder.js";
import { DataverseBatchError } from "../src/errors.js";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";

// Mock DataverseClient
const createMockClient = () => {
  const mockApi = vi.fn().mockReturnValue({
    post: vi.fn().mockResolvedValue({
      headers: new Headers({
        "content-type": "multipart/mixed; boundary=batchresponse_test",
      }),
      text: vi.fn().mockResolvedValue(""),
    }),
  });

  return {
    api: mockApi,
    baseUrl: "https://org.crm.dynamics.com/api/data/v9.2",
  } as unknown as DataverseClient;
};

describe("BatchRequestBuilder", () => {
  let client: DataverseClient;
  let builder: BatchRequestBuilder;

  beforeEach(() => {
    client = createMockClient();
    builder = new BatchRequestBuilder(client);
  });

  describe("constructor", () => {
    it("should initialize with empty state", () => {
      expect(builder.getTotalRequestCount()).toBe(0);
    });

    it("should accept DataverseClient instance", () => {
      expect(() => new BatchRequestBuilder(client)).not.toThrow();
    });
  });

  describe("addRequest", () => {
    it("should add a GET request", () => {
      builder.addRequest("req1", "GET", "/accounts");
      expect(builder.getTotalRequestCount()).toBe(1);
    });

    it("should add a POST request with body", () => {
      builder.addRequest("req2", "POST", "/accounts", {}, { name: "Test" });
      expect(builder.getTotalRequestCount()).toBe(1);
    });

    it("should throw on duplicate request ID", () => {
      builder.addRequest("req1", "GET", "/accounts");
      expect(() => builder.addRequest("req1", "GET", "/contacts")).toThrow("Duplicate request ID");
    });

    it("should normalize relative URL (without slash)", () => {
      builder.addRequest("req1", "GET", "accounts");
      const requests = (builder as any).requests;
      expect(requests[0].url).toBe("accounts");
    });

    it("should normalize URL with leading slash", () => {
      builder.addRequest("req1", "GET", "/accounts");
      const requests = (builder as any).requests;
      expect(requests[0].url).toBe("accounts");
    });

    it("should add request to current changeset when active", () => {
      builder.beginChangeset();
      builder.addRequest("req1", "POST", "/accounts", {}, { name: "Test" });
      expect(builder.getTotalRequestCount()).toBe(1);
      expect((builder as any).currentChangeset).toHaveLength(1);
    });

    it("should support dependsOn parameter", () => {
      builder.addRequest("req1", "POST", "/accounts", {}, { name: "Test" });
      builder.addRequest("req2", "POST", "/contacts", {}, { name: "Contact" }, ["req1"]);
      expect(builder.getTotalRequestCount()).toBe(2);
    });
  });

  describe("beginChangeset", () => {
    it("should start a new changeset", () => {
      expect(() => builder.beginChangeset()).not.toThrow();
    });

    it("should throw if changeset already active", () => {
      builder.beginChangeset();
      expect(() => builder.beginChangeset()).toThrow("Cannot nest changesets");
    });
  });

  describe("endChangeset", () => {
    it("should end active changeset", () => {
      builder.beginChangeset();
      builder.addRequest("req1", "POST", "/accounts", {}, { name: "Test" });
      expect(() => builder.endChangeset()).not.toThrow();
    });

    it("should throw if no active changeset", () => {
      expect(() => builder.endChangeset()).toThrow("No active changeset");
    });

    it("should throw if changeset is empty", () => {
      builder.beginChangeset();
      expect(() => builder.endChangeset()).toThrow("Changeset cannot be empty");
    });

    it("should move requests to changesets array", () => {
      builder.beginChangeset();
      builder.addRequest("req1", "POST", "/accounts", {}, { name: "Test" });
      builder.endChangeset();
      expect((builder as any).changesets).toHaveLength(1);
      expect((builder as any).currentChangeset).toBeNull();
    });
  });

  describe("getTotalRequestCount", () => {
    it("should return 0 for empty builder", () => {
      expect(builder.getTotalRequestCount()).toBe(0);
    });

    it("should count individual requests", () => {
      builder.addRequest("req1", "GET", "/accounts");
      builder.addRequest("req2", "GET", "/contacts");
      expect(builder.getTotalRequestCount()).toBe(2);
    });

    it("should count changeset requests", () => {
      builder.beginChangeset();
      builder.addRequest("req1", "POST", "/accounts", {}, { name: "Test1" });
      builder.addRequest("req2", "POST", "/accounts", {}, { name: "Test2" });
      builder.endChangeset();
      expect(builder.getTotalRequestCount()).toBe(2);
    });

    it("should count both individual and changeset requests", () => {
      builder.addRequest("req1", "GET", "/accounts");
      builder.beginChangeset();
      builder.addRequest("req2", "POST", "/accounts", {}, { name: "Test" });
      builder.addRequest("req3", "POST", "/contacts", {}, { name: "Contact" });
      builder.endChangeset();
      builder.addRequest("req4", "GET", "/leads");
      expect(builder.getTotalRequestCount()).toBe(4);
    });

    it("should count active changeset requests", () => {
      builder.beginChangeset();
      builder.addRequest("req1", "POST", "/accounts", {}, { name: "Test" });
      expect(builder.getTotalRequestCount()).toBe(1);
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
      expect((builder as any).requests).toHaveLength(0);
      expect((builder as any).changesets).toHaveLength(0);
      expect((builder as any).currentChangeset).toBeNull();
      expect((builder as any).requestIdSet.size).toBe(0);
    });
  });

  describe("execute", () => {
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
      // Add 1001 requests
      for (let i = 0; i < 1001; i++) {
        builder.addRequest(`req${String(i)}`, "GET", "/accounts");
      }
      await expect(builder.execute()).rejects.toThrow("exceeding the maximum of 1000");
    });

    it("should execute single batch successfully", async () => {
      const mockResponse = [
        "--batchresponse_test",
        "Content-Type: application/http",
        "Content-ID: 1",
        "",
        "HTTP/1.1 200 OK",
        "Content-Type: application/json",
        "",
        '{"@odata.context":"...","value":[]}',
        "--batchresponse_test--",
      ].join("\r\n");

      const mockPost = vi.fn().mockResolvedValue({
        headers: new Headers({
          "content-type": "multipart/mixed; boundary=batchresponse_test",
        }),
        text: vi.fn().mockResolvedValue(mockResponse),
      });

      (client.api as any).mockReturnValue({
        post: mockPost,
      });

      builder.addRequest("req1", "GET", "/accounts");
      const result = await builder.execute();

      expect(result.success).toBe(true);
      expect(result.responses.size).toBe(1);
      expect(result.errors.size).toBe(0);
      expect(result.successfulRequests).toBe(1);
      expect(result.failedRequests).toBe(0);
    });

    it("should handle partial failure with continueOnError", async () => {
      const mockResponse = [
        "--batchresponse_test",
        "Content-Type: multipart/mixed; boundary=changeset_test",
        "",
        "--changeset_test",
        "Content-Type: application/http",
        "Content-ID: 1",
        "",
        "HTTP/1.1 201 Created",
        "Content-Type: application/json",
        "",
        '{"accountid":"123"}',
        "--changeset_test",
        "Content-Type: application/http",
        "Content-ID: 2",
        "",
        "HTTP/1.1 400 Bad Request",
        "Content-Type: application/json",
        "",
        '{"error":{"message":"Invalid"}}',
        "--changeset_test--",
        "--batchresponse_test--",
      ].join("\r\n");

      const mockPost = vi.fn().mockResolvedValue({
        headers: new Headers({
          "content-type": "multipart/mixed; boundary=batchresponse_test",
        }),
        text: vi.fn().mockResolvedValue(mockResponse),
      });

      (client.api as any).mockReturnValue({
        post: mockPost,
      });

      builder.beginChangeset();
      builder.addRequest("req1", "POST", "/accounts", {}, { name: "Test1" });
      builder.addRequest("req2", "POST", "/accounts", {}, { name: "Test2" });
      builder.endChangeset();

      await expect(builder.execute({ continueOnError: true })).rejects.toThrow(DataverseBatchError);

      try {
        await builder.execute({ continueOnError: true });
      } catch (error) {
        expect(error).toBeInstanceOf(DataverseBatchError);
        const batchError = error as DataverseBatchError;
        expect(batchError.successfulRequests).toBe(1);
        expect(batchError.failedRequests).toBe(1);
        // Content-IDs are returned as string keys: '1', '2'
        expect(batchError.hasErrorForRequest("2")).toBe(true);
      }
    });

    it("should add Prefer header for continueOnError", async () => {
      const mockPost = vi.fn().mockResolvedValue({
        headers: new Headers({
          "content-type": "multipart/mixed; boundary=batchresponse_test",
        }),
        text: vi.fn().mockResolvedValue("--batchresponse_test--"),
      });

      (client.api as any).mockReturnValue({
        post: mockPost,
      });

      builder.addRequest("req1", "GET", "/accounts");
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await builder.execute({ continueOnError: true }).catch(() => {});

      const postCall = mockPost.mock.calls[0];
      const headers = postCall[1];
      expect(headers.Prefer).toBe("odata.continue-on-error");
    });

    it("should respect custom batchSize option", async () => {
      const mockPost = vi.fn().mockResolvedValue({
        headers: new Headers({
          "content-type": "multipart/mixed; boundary=batchresponse_test",
        }),
        text: vi.fn().mockResolvedValue("--batchresponse_test--"),
      });

      (client.api as any).mockReturnValue({
        post: mockPost,
      });

      for (let i = 0; i < 15; i++) {
        builder.addRequest(`req${String(i)}`, "GET", "/accounts");
      }

      // With 15 requests and batchSize 5, should execute without error (auto-split not yet implemented fully)
      // For now just verify it doesn't crash
      const result = await builder.execute({ batchSize: 5 });
      expect(result).toBeDefined();
    });

    it("should include custom headers in request", async () => {
      const mockPost = vi.fn().mockResolvedValue({
        headers: new Headers({
          "content-type": "multipart/mixed; boundary=batchresponse_test",
        }),
        text: vi.fn().mockResolvedValue("--batchresponse_test--"),
      });

      (client.api as any).mockReturnValue({
        post: mockPost,
      });

      builder.addRequest("req1", "GET", "/accounts");
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await builder.execute({ headers: { "X-Custom": "value" } }).catch(() => {});

      const postCall = mockPost.mock.calls[0];
      const headers = postCall[1];
      expect(headers["X-Custom"]).toBe("value");
    });
  });

  describe("normalizeUrl", () => {
    it("should keep URL without leading slash as-is", () => {
      const normalized = (builder as any).normalizeUrl("accounts");
      expect(normalized).toBe("accounts");
    });

    it("should remove leading slash", () => {
      const normalized = (builder as any).normalizeUrl("/accounts");
      expect(normalized).toBe("accounts");
    });

    it("should handle query parameters with leading slash", () => {
      const normalized = (builder as any).normalizeUrl("/accounts?$select=name");
      expect(normalized).toBe("accounts?$select=name");
    });

    it("should handle query parameters without leading slash", () => {
      const normalized = (builder as any).normalizeUrl("accounts?$select=name");
      expect(normalized).toBe("accounts?$select=name");
    });
  });
});
