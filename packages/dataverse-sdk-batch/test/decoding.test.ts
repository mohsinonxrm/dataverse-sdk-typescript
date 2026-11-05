import { describe, it, expect } from "vitest";
import { extractBoundary, splitMultipart, decodeBatchResponse } from "../src/decoding.js";
import * as recorded from "./fixtures/recorded.js";

const decode = (r: recorded.RecordedBatchResponse) => decodeBatchResponse(r.body, r.contentType);

describe("decoding", () => {
  describe("extractBoundary", () => {
    it("extracts the boundary", () => {
      expect(extractBoundary("multipart/mixed; boundary=batch_abc123")).toBe("batch_abc123");
    });

    it("strips quotes (#56)", () => {
      expect(extractBoundary('multipart/mixed; boundary="batch_abc123"')).toBe("batch_abc123");
    });

    it("is case-insensitive and allows spacing (#56)", () => {
      expect(extractBoundary("Multipart/Mixed;BOUNDARY = batch_1 ; charset=utf-8")).toBe("batch_1");
    });

    it("returns null if no boundary found", () => {
      expect(extractBoundary("application/json")).toBeNull();
      expect(extractBoundary('multipart/mixed; boundary=""')).toBeNull();
    });
  });

  describe("splitMultipart", () => {
    it("drops the preamble and epilogue and keeps part bytes exactly", () => {
      const content = "preamble\r\n--b\r\nA\r\n\r\n--b\r\n\r\nB  \r\n--b--\r\nepilogue";
      expect(splitMultipart(content, "b")).toEqual(["A\r\n", "\r\nB  "]);
    });

    it("accepts LF line endings and trailing whitespace on delimiter lines (#56)", () => {
      const content = "--b \nA\n--b\t\nB\n--b-- \n";
      expect(splitMultipart(content, "b")).toEqual(["A", "B"]);
    });

    it("does not split on a line that only starts with the boundary", () => {
      const content = "--b\r\nx\r\n--bb\r\ny\r\n--b--";
      expect(splitMultipart(content, "b")).toEqual(["x\r\n--bb\r\ny"]);
    });

    it("escapes regex characters in the boundary", () => {
      expect(splitMultipart("--a.b+c\r\nX\r\n--a.b+c--", "a.b+c")).toEqual(["X"]);
      expect(splitMultipart("--aXb\r\nX\r\n--aXb--", "a.b")).toEqual([]);
    });

    it("keeps the last part of a response with no closing delimiter", () => {
      expect(splitMultipart("--b\r\nA\r\n--b\r\nB", "b")).toEqual(["A", "B"]);
    });
  });

  describe("recorded Dataverse responses", () => {
    it("a GET-only batch: keeps every part, though none has a Content-ID (#56)", () => {
      const parts = decode(recorded.getOnly);
      expect(parts).toHaveLength(2);
      expect(parts.map((p) => [p.batchIndex, p.inChangeset, p.contentId, p.status])).toEqual([
        [0, false, undefined, 200],
        [1, false, undefined, 200],
      ]);
      expect(parts[0]?.body.UserId).toBe("10000000-0000-0000-0000-000000000003");
      expect(parts[1]?.body.value).toEqual([]);
      expect(parts[0]?.statusText).toBe("OK");
      expect(parts[0]?.headers["content-type"]).toBe("application/json; odata.metadata=minimal");
      expect(parts[0]?.headers["odata-version"]).toBe("4.0");
    });

    it("a change set success: a GET, then two creates with their Content-IDs (#56)", () => {
      const parts = decode(recorded.changesetSuccess);
      expect(parts.map((p) => [p.batchIndex, p.inChangeset, p.contentId, p.status])).toEqual([
        [0, false, undefined, 200],
        [1, true, "acct", 204],
        [1, true, "contact", 204],
      ]);
      expect(parts[1]?.headers["odata-entityid"]).toBe(
        "https://contoso.crm.dynamics.com/api/data/v9.2/accounts(10000000-0000-0000-0000-000000000007)"
      );
      expect(parts[1]?.statusText).toBe("No Content");
      expect(parts[1]?.body).toBeUndefined();
      expect(parts[1]?.bodyText).toBe("");
    });

    it("a change set failure: only the failing request is answered, and nothing after it", () => {
      const parts = decode(recorded.changesetFailure);
      expect(parts).toHaveLength(1);
      expect(parts[0]).toMatchObject({
        batchIndex: 0,
        inChangeset: true,
        contentId: "2",
        status: 404,
        statusText: "Not Found",
        body: { error: { code: "0x80040217" } },
      });
      expect(parts[0]?.headers.req_id).toBe("10000000-0000-0000-0000-000000000011");
    });

    it("stopped early: the responses up to and including the first failure", () => {
      const parts = decode(recorded.stoppedEarly);
      expect(parts.map((p) => p.status)).toEqual([200, 404]);
      expect(parts[1]?.headers["content-type"]).toBe(
        "application/json; odata.metadata=minimal; odata.streaming=true"
      );
      expect(parts[1]?.body.error.code).toBe("0x80040217");
    });

    it("a continue-on-error mix: the failure and the parts after it", () => {
      const parts = decode(recorded.continueOnError);
      expect(parts.map((p) => [p.batchIndex, p.status])).toEqual([
        [0, 404],
        [1, 200],
      ]);
    });
  });

  describe("robustness (#56)", () => {
    const lf = [
      "--b",
      "content-type: Application/HTTP",
      "content-id: 7",
      "",
      "HTTP/1.1 201 Created",
      "CONTENT-TYPE: Application/JSON",
      "",
      '{"id":"x"}',
      "--b",
      'CONTENT-TYPE: MULTIPART/MIXED; BOUNDARY="cs 1"',
      "",
      "--cs 1",
      "Content-Type: application/http",
      "CONTENT-ID: a",
      "",
      "HTTP/1.1 204 No Content",
      "",
      "",
      "--cs 1--",
      "--b--",
      "",
    ].join("\n");

    it("parses LF-only line endings, any header casing and a quoted change set boundary", () => {
      const parts = decodeBatchResponse(lf, "multipart/mixed; boundary=b");
      expect(parts).toEqual([
        {
          contentId: "7",
          batchIndex: 0,
          inChangeset: false,
          status: 201,
          statusText: "Created",
          headers: { "content-type": "Application/JSON" },
          body: { id: "x" },
          bodyText: '{"id":"x"}',
        },
        {
          contentId: "a",
          batchIndex: 1,
          inChangeset: true,
          status: 204,
          statusText: "No Content",
          headers: {},
          body: undefined,
          bodyText: "",
        },
      ]);
    });

    it("never trims a text body", () => {
      const body = [
        "--b",
        "Content-Type: application/http",
        "",
        "HTTP/1.1 200 OK",
        "Content-Type: text/plain",
        "",
        "  two leading spaces and a trailing newline\r\n",
        "--b--",
      ].join("\r\n");
      const [part] = decodeBatchResponse(body, "multipart/mixed; boundary=b");
      expect(part.body).toBe("  two leading spaces and a trailing newline\r\n");
    });

    it("keeps a JSON body that does not parse as text", () => {
      const body = [
        "--b",
        "Content-Type: application/http",
        "",
        "HTTP/1.1 500 Internal Server Error",
        "Content-Type: application/json",
        "",
        "{not json",
        "--b--",
      ].join("\r\n");
      const [part] = decodeBatchResponse(body, "multipart/mixed; boundary=b");
      expect(part.body).toBe("{not json");
      expect(part.statusText).toBe("Internal Server Error");
    });

    it("throws on a part without an HTTP status line", () => {
      const body = "--b\r\nContent-Type: application/http\r\n\r\nnot http\r\n--b--";
      expect(() => decodeBatchResponse(body, "multipart/mixed; boundary=b")).toThrow(
        "Invalid HTTP status line"
      );
    });

    it("throws if a change set part has no boundary", () => {
      const body = "--b\r\nContent-Type: multipart/mixed\r\n\r\n--b--";
      expect(() => decodeBatchResponse(body, "multipart/mixed; boundary=b")).toThrow(
        "change set part"
      );
    });

    it("throws if there is no boundary in Content-Type", () => {
      expect(() => decodeBatchResponse("test", "application/json")).toThrow("No boundary found");
    });
  });
});
