import { describe, it, expect } from "vitest";
import {
  generateBoundary,
  generateChangesetBoundary,
  encodeRequest,
  encodeChangeset,
  encodeBatchRequest,
} from "../src/encoding.js";
import type { BatchRequestStep } from "../src/types.js";

describe("encoding", () => {
  describe("generateBoundary", () => {
    it("should generate unique boundaries", () => {
      const boundary1 = generateBoundary();
      const boundary2 = generateBoundary();

      expect(boundary1).toMatch(/^batch_\d+_[a-z0-9]+$/);
      expect(boundary2).toMatch(/^batch_\d+_[a-z0-9]+$/);
      expect(boundary1).not.toBe(boundary2);
    });
  });

  describe("generateChangesetBoundary", () => {
    it("should generate unique changeset boundaries", () => {
      const boundary1 = generateChangesetBoundary();
      const boundary2 = generateChangesetBoundary();

      expect(boundary1).toMatch(/^changeset_\d+_[a-z0-9]+$/);
      expect(boundary2).toMatch(/^changeset_\d+_[a-z0-9]+$/);
      expect(boundary1).not.toBe(boundary2);
    });
  });

  describe("encodeRequest", () => {
    it("should encode GET request without body", () => {
      const request: BatchRequestStep = {
        id: "req1",
        method: "GET",
        url: "/accounts?$top=5",
        headers: {
          Accept: "application/json",
        },
      };

      const encoded = encodeRequest(request);

      expect(encoded).toContain("Content-Type: application/http");
      expect(encoded).toContain("Content-Transfer-Encoding: binary");
      expect(encoded).toContain("GET /accounts?$top=5 HTTP/1.1");
      expect(encoded).toContain("Accept: application/json");
      expect(encoded).not.toContain("Content-ID");
    });

    it("should encode POST request with JSON body", () => {
      const request: BatchRequestStep = {
        id: "req2",
        method: "POST",
        url: "/accounts",
        headers: {
          "Content-Type": "application/json",
        },
        body: { name: "Test Account" },
      };

      const encoded = encodeRequest(request);

      expect(encoded).toContain("POST /accounts HTTP/1.1");
      expect(encoded).toContain("Content-Type: application/json");
      expect(encoded).toContain('{"name":"Test Account"}');
    });

    it("should include Content-ID when provided", () => {
      const request: BatchRequestStep = {
        id: "req3",
        method: "POST",
        url: "/contacts",
        body: { firstname: "John" },
      };

      const encoded = encodeRequest(request, 1);

      expect(encoded).toContain("Content-ID: 1");
    });

    it("should handle string body", () => {
      const request: BatchRequestStep = {
        id: "req4",
        method: "POST",
        url: "/notes",
        body: "Plain text content",
      };

      const encoded = encodeRequest(request);

      expect(encoded).toContain("Plain text content");
      expect(encoded).not.toContain('"Plain text content"');
    });

    it("should use CRLF line endings", () => {
      const request: BatchRequestStep = {
        id: "req5",
        method: "GET",
        url: "/accounts",
      };

      const encoded = encodeRequest(request);

      expect(encoded).toContain("\r\n");
      expect(encoded.split("\r\n").length).toBeGreaterThan(1);
    });
  });

  describe("encodeChangeset", () => {
    it("should encode multiple requests in a changeset", () => {
      const requests: BatchRequestStep[] = [
        {
          id: "cs1",
          method: "POST",
          url: "/accounts",
          body: { name: "Account 1" },
        },
        {
          id: "cs2",
          method: "POST",
          url: "/contacts",
          body: { firstname: "John" },
        },
      ];

      const boundary = "changeset_123";
      const encoded = encodeChangeset(requests, boundary);

      expect(encoded).toContain(`Content-Type: multipart/mixed; boundary=${boundary}`);
      expect(encoded).toContain(`--${boundary}`);
      expect(encoded).toContain("Content-ID: 1");
      expect(encoded).toContain("Content-ID: 2");
      expect(encoded).toContain("POST /accounts HTTP/1.1");
      expect(encoded).toContain("POST /contacts HTTP/1.1");
      expect(encoded).toContain(`--${boundary}--`);
    });

    it("should assign sequential Content-IDs", () => {
      const requests: BatchRequestStep[] = [
        { id: "r1", method: "POST", url: "/accounts", body: {} },
        { id: "r2", method: "POST", url: "/contacts", body: {} },
        { id: "r3", method: "POST", url: "/leads", body: {} },
      ];

      const encoded = encodeChangeset(requests, "test_boundary");

      expect(encoded).toContain("Content-ID: 1");
      expect(encoded).toContain("Content-ID: 2");
      expect(encoded).toContain("Content-ID: 3");
    });
  });

  describe("encodeBatchRequest", () => {
    it("should encode individual requests only", () => {
      const requests: BatchRequestStep[] = [
        { id: "req1", method: "GET", url: "/accounts", headers: {} },
        { id: "req2", method: "GET", url: "/contacts", headers: {} },
      ];

      const boundary = "batch_456";
      const encoded = encodeBatchRequest(requests, [], boundary);

      expect(encoded).toContain(`--${boundary}`);
      expect(encoded).toContain("GET /accounts HTTP/1.1");
      expect(encoded).toContain("GET /contacts HTTP/1.1");
      expect(encoded).toContain(`--${boundary}--`);
      expect(encoded).not.toContain("multipart/mixed");
    });

    it("should encode changesets only", () => {
      const changeset1: BatchRequestStep[] = [
        { id: "cs1", method: "POST", url: "/accounts", body: {} },
        { id: "cs2", method: "POST", url: "/contacts", body: {} },
      ];

      const boundary = "batch_789";
      const encoded = encodeBatchRequest([], [changeset1], boundary);

      expect(encoded).toContain(`--${boundary}`);
      expect(encoded).toContain("Content-Type: multipart/mixed");
      expect(encoded).toContain("Content-ID: 1");
      expect(encoded).toContain("Content-ID: 2");
      expect(encoded).toContain(`--${boundary}--`);
    });

    it("should encode mixed requests and changesets", () => {
      const requests: BatchRequestStep[] = [
        { id: "req1", method: "GET", url: "/accounts", headers: {} },
      ];

      const changeset1: BatchRequestStep[] = [
        { id: "cs1", method: "POST", url: "/contacts", body: {} },
      ];

      const boundary = "batch_mixed";
      const encoded = encodeBatchRequest(requests, [changeset1], boundary);

      expect(encoded).toContain("GET /accounts HTTP/1.1");
      expect(encoded).toContain("POST /contacts HTTP/1.1");
      expect(encoded).toContain("Content-Type: multipart/mixed");
      expect(encoded).toContain(`--${boundary}--`);
    });

    it("should use CRLF line endings throughout", () => {
      const requests: BatchRequestStep[] = [
        { id: "req1", method: "GET", url: "/accounts", headers: {} },
      ];

      const encoded = encodeBatchRequest(requests, [], "test");

      // Should only have CRLF, not bare LF
      expect(encoded).toContain("\r\n");
      expect(encoded.replace(/\r\n/g, "")).not.toContain("\n");
    });
  });
});
