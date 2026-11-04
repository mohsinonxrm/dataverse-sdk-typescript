import { describe, it, expect } from "vitest";
import {
  getRequestHeader,
  setRequestHeader,
  appendRequestHeader,
  generateUUID,
  serializeContent,
  parseRetryAfter,
  headersToObject,
  normalizeHeaderKey,
  isStreamContent,
} from "../src/utils/HeaderUtils.js";

describe("HeaderUtils", () => {
  describe("getRequestHeader", () => {
    it("gets header from Headers object", () => {
      const headers = new Headers({ "Content-Type": "application/json" });
      expect(getRequestHeader(headers, "Content-Type")).toBe("application/json");
    });

    it("gets header from array of tuples", () => {
      const headers: Array<[string, string]> = [["Content-Type", "application/json"]];
      expect(getRequestHeader(headers, "Content-Type")).toBe("application/json");
    });

    it("gets header from plain object", () => {
      const headers = { "Content-Type": "application/json" };
      expect(getRequestHeader(headers, "Content-Type")).toBe("application/json");
    });

    it("is case-insensitive", () => {
      const headers = { "Content-Type": "application/json" };
      expect(getRequestHeader(headers, "content-type")).toBe("application/json");
    });

    it("returns undefined for missing header", () => {
      const headers = new Headers();
      expect(getRequestHeader(headers, "Missing")).toBeUndefined();
    });

    it("returns undefined for undefined headers", () => {
      expect(getRequestHeader(undefined, "Any")).toBeUndefined();
    });
  });

  describe("setRequestHeader", () => {
    it("sets header on Headers object", () => {
      const headers = new Headers();
      setRequestHeader(headers, "Content-Type", "application/json");
      expect(headers.get("Content-Type")).toBe("application/json");
    });

    it("sets header on array", () => {
      const headers: Array<[string, string]> = [];
      setRequestHeader(headers, "Content-Type", "application/json");
      expect(headers).toEqual([["Content-Type", "application/json"]]);
    });

    it("sets header on plain object", () => {
      const headers: Record<string, string> = {};
      setRequestHeader(headers, "Content-Type", "application/json");
      expect(headers["Content-Type"]).toBe("application/json");
    });

    it("replaces existing header (case-insensitive)", () => {
      const headers = { "content-type": "text/plain" };
      setRequestHeader(headers, "Content-Type", "application/json");
      expect(headers["Content-Type"]).toBe("application/json");
      expect(headers["content-type"]).toBeUndefined();
    });
  });

  describe("appendRequestHeader", () => {
    it("appends to existing header with comma separator", () => {
      const headers = new Headers({ "Cache-Control": "no-cache" });
      appendRequestHeader(headers, "Cache-Control", "no-store");
      expect(headers.get("Cache-Control")).toBe("no-cache, no-store");
    });

    it("creates new header if not exists", () => {
      const headers = new Headers();
      appendRequestHeader(headers, "Cache-Control", "no-cache");
      expect(headers.get("Cache-Control")).toBe("no-cache");
    });

    it("works with array headers", () => {
      const headers: Array<[string, string]> = [["Cache-Control", "no-cache"]];
      appendRequestHeader(headers, "Cache-Control", "no-store");
      expect(headers[0][1]).toBe("no-cache, no-store");
    });
  });

  describe("generateUUID", () => {
    it("generates valid UUID v4 format", () => {
      const uuid = generateUUID();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuid).toMatch(uuidRegex);
    });

    it("generates unique UUIDs", () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe("serializeContent", () => {
    it("returns string as-is", () => {
      expect(serializeContent("test")).toBe("test");
    });

    it("returns empty string for null", () => {
      expect(serializeContent(null)).toBe("");
    });

    it("returns empty string for undefined", () => {
      expect(serializeContent(undefined)).toBe("");
    });

    it("serializes object to JSON", () => {
      const obj = { name: "Test", value: 123 };
      expect(serializeContent(obj)).toBe('{"name":"Test","value":123}');
    });

    it("returns ArrayBuffer as-is", () => {
      const buffer = new ArrayBuffer(8);
      expect(serializeContent(buffer)).toBe(buffer);
    });

    it("converts Uint8Array to buffer", () => {
      const arr = new Uint8Array([1, 2, 3, 4]);
      const result = serializeContent(arr);
      expect(result).toBeDefined();
    });

    it.each(["typed array", "data view", "subclass", "empty view"])(
      "serializes only the selected bytes of a %s",
      async (kind) => {
        const bytes = new Uint8Array([99, 98, 1, 2, 3, 97]);
        class ByteView extends Uint8Array {}
        const view =
          kind === "data view"
            ? new DataView(bytes.buffer, 2, 3)
            : kind === "subclass"
              ? new ByteView(bytes.buffer, 2, 3)
              : bytes.subarray(2, kind === "empty view" ? 2 : 5);
        const request = new Request("https://example.invalid/upload", {
          method: "POST",
          body: serializeContent(view),
        });
        expect([...new Uint8Array(await request.arrayBuffer())]).toEqual(
          kind === "empty view" ? [] : [1, 2, 3]
        );
      }
    );

    it("throws error for non-serializable content", () => {
      const circular: any = {};
      circular.self = circular;
      expect(() => serializeContent(circular)).toThrow();
    });
  });

  describe("parseRetryAfter", () => {
    it("parses seconds as integer", () => {
      expect(parseRetryAfter("120")).toBe(120000); // 120 seconds = 120000 ms
    });

    it("parses HTTP-date format", () => {
      const futureDate = new Date(Date.now() + 5000).toUTCString();
      const result = parseRetryAfter(futureDate);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(5000);
    });

    it("returns 0 for past dates", () => {
      const pastDate = new Date(Date.now() - 5000).toUTCString();
      const result = parseRetryAfter(pastDate);
      expect(result).toBe(0);
    });

    it("returns undefined for invalid input", () => {
      expect(parseRetryAfter("invalid")).toBeUndefined();
    });

    it("returns undefined for null", () => {
      expect(parseRetryAfter(null)).toBeUndefined();
    });
  });

  describe("headersToObject", () => {
    it("converts Headers to plain object", () => {
      const headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      });
      const obj = headersToObject(headers);
      expect(obj).toEqual({
        "content-type": "application/json",
        accept: "application/json",
      });
    });

    it("handles empty Headers", () => {
      const headers = new Headers();
      const obj = headersToObject(headers);
      expect(obj).toEqual({});
    });
  });

  describe("normalizeHeaderKey", () => {
    it("converts to lowercase", () => {
      expect(normalizeHeaderKey("Content-Type")).toBe("content-type");
      expect(normalizeHeaderKey("ACCEPT")).toBe("accept");
    });
  });

  describe("isStreamContent", () => {
    it("detects octet-stream", () => {
      expect(isStreamContent("application/octet-stream")).toBe(true);
    });

    it("detects image types", () => {
      expect(isStreamContent("image/png")).toBe(true);
      expect(isStreamContent("image/jpeg")).toBe(true);
    });

    it("detects video types", () => {
      expect(isStreamContent("video/mp4")).toBe(true);
    });

    it("detects audio types", () => {
      expect(isStreamContent("audio/mpeg")).toBe(true);
    });

    it("detects PDF", () => {
      expect(isStreamContent("application/pdf")).toBe(true);
    });

    it("returns false for JSON", () => {
      expect(isStreamContent("application/json")).toBe(false);
    });

    it("returns false for text", () => {
      expect(isStreamContent("text/plain")).toBe(false);
    });

    it("returns false for null", () => {
      expect(isStreamContent(null)).toBe(false);
    });

    it("is case-insensitive", () => {
      expect(isStreamContent("APPLICATION/OCTET-STREAM")).toBe(true);
    });
  });
});
