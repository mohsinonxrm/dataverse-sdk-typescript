import { describe, it, expect } from "vitest";
import { extractBoundary, splitMultipart, decodeBatchResponse } from "../src/decoding.js";

describe("decoding", () => {
  describe("extractBoundary", () => {
    it("should extract boundary from Content-Type header", () => {
      const contentType = "multipart/mixed; boundary=batch_abc123";
      const boundary = extractBoundary(contentType);

      expect(boundary).toBe("batch_abc123");
    });

    it("should handle boundary with quotes", () => {
      const contentType = 'multipart/mixed; boundary="batch_abc123"';
      const boundary = extractBoundary(contentType);

      expect(boundary).toBeTruthy();
    });

    it("should return null if no boundary found", () => {
      const contentType = "application/json";
      const boundary = extractBoundary(contentType);

      expect(boundary).toBeNull();
    });
  });

  describe("splitMultipart", () => {
    it("should split multipart content by boundary", () => {
      const content = `--batch_123\r
Content-Type: application/http\r
\r
HTTP/1.1 200 OK\r
\r
--batch_123\r
Content-Type: application/http\r
\r
HTTP/1.1 201 Created\r
\r
--batch_123--`;

      const parts = splitMultipart(content, "batch_123");

      expect(parts).toHaveLength(2);
      expect(parts[0]).toContain("HTTP/1.1 200 OK");
      expect(parts[1]).toContain("HTTP/1.1 201 Created");
    });

    it("should handle empty parts", () => {
      const content = `--batch_123\r
--batch_123--`;

      const parts = splitMultipart(content, "batch_123");

      expect(parts).toHaveLength(0);
    });
  });

  describe("decodeBatchResponse", () => {
    it("should decode simple batch response", () => {
      const responseBody = `--batch_abc\r
Content-Type: application/http\r
Content-Transfer-Encoding: binary\r
Content-ID: 1\r
\r
HTTP/1.1 200 OK\r
Content-Type: application/json; charset=utf-8\r
\r
{"@odata.context":"https://org.crm.dynamics.com/api/data/v9.2/$metadata#accounts","value":[]}\r
--batch_abc--`;

      const contentType = "multipart/mixed; boundary=batch_abc";
      const responses = decodeBatchResponse(responseBody, contentType);

      expect(responses.size).toBe(1);
      expect(responses.has("1")).toBe(true);

      const response = responses.get("1")!;
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
      expect(response.body).toBeDefined();
      expect(response.body.value).toEqual([]);
    });

    it("should parse status codes correctly", () => {
      const responseBody = `--batch_test\r
Content-Type: application/http\r
Content-ID: req1\r
\r
HTTP/1.1 201 Created\r
Content-Type: application/json\r
\r
{"accountid":"123"}\r
--batch_test--`;

      const responses = decodeBatchResponse(responseBody, "multipart/mixed; boundary=batch_test");

      const response = responses.get("req1")!;
      expect(response.status).toBe(201);
      expect(response.statusText).toBe("Created");
      expect(response.body.accountid).toBe("123");
    });

    it("should handle error responses", () => {
      const errorBody = JSON.stringify({
        error: {
          code: "0x80040217",
          message: "Duplicate record detected",
        },
      });

      const responseBody = `--batch_error\r
Content-Type: application/http\r
Content-ID: err1\r
\r
HTTP/1.1 400 Bad Request\r
Content-Type: application/json\r
\r
${errorBody}\r
--batch_error--`;

      const responses = decodeBatchResponse(responseBody, "multipart/mixed; boundary=batch_error");

      const response = responses.get("err1")!;
      expect(response.status).toBe(400);
      expect(response.statusText).toBe("Bad Request");
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe("0x80040217");
    });

    it("should decode changeset responses", () => {
      const responseBody = `--batch_main\r
Content-Type: multipart/mixed; boundary=changeset_abc\r
\r
--changeset_abc\r
Content-Type: application/http\r
Content-ID: 1\r
\r
HTTP/1.1 201 Created\r
Content-Type: application/json\r
\r
{"accountid":"acc-1"}\r
--changeset_abc\r
Content-Type: application/http\r
Content-ID: 2\r
\r
HTTP/1.1 201 Created\r
Content-Type: application/json\r
\r
{"contactid":"con-1"}\r
--changeset_abc--\r
--batch_main--`;

      const responses = decodeBatchResponse(responseBody, "multipart/mixed; boundary=batch_main");

      expect(responses.size).toBe(2);
      expect(responses.has("1")).toBe(true);
      expect(responses.has("2")).toBe(true);

      const response1 = responses.get("1")!;
      expect(response1.status).toBe(201);
      expect(response1.body.accountid).toBe("acc-1");

      const response2 = responses.get("2")!;
      expect(response2.status).toBe(201);
      expect(response2.body.contactid).toBe("con-1");
    });

    it("should throw error if no boundary in Content-Type", () => {
      expect(() => {
        decodeBatchResponse("test", "application/json");
      }).toThrow("No boundary found");
    });
  });
});
