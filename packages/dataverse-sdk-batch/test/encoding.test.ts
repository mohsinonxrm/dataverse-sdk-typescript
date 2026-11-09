import { describe, it, expect } from "vitest";
import {
  generateBoundary,
  generateChangesetBoundary,
  encodeRequest,
  encodeChangeset,
  encodeBatchRequest,
} from "../src/encoding.js";
import type { BatchItem, BatchRequestStep } from "../src/types.js";

const API = "https://contoso.crm.dynamics.com/api/data/v9.2";
const ACCOUNT = "00000000-0000-0000-0000-000000000001";

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

  describe("golden: the layout of Microsoft's documented batch example", () => {
    // Microsoft's "Execute batch operations using the Web API" example: a change set with two
    // task creates, then a GET outside it. Dataverse accepts this byte layout (see the live
    // batch tests); the only intended difference from the article is a space after
    // "Content-Transfer-Encoding:".
    it("encodes a change set followed by a GET, byte for byte", () => {
      const task = (n: number) => ({
        subject: `Task ${String(n)} in batch`,
        "regardingobjectid_account_task@odata.bind": `${API}/accounts(${ACCOUNT})`,
      });
      const items: BatchItem[] = [
        {
          changeset: [
            { id: "1", method: "POST", url: `${API}/tasks`, body: task(1) },
            { id: "2", method: "POST", url: `${API}/tasks`, body: task(2) },
          ],
        },
        {
          id: "get",
          method: "GET",
          url: `${API}/Account_Tasks?$select=subject`,
          headers: { Accept: "application/json" },
        },
      ];
      const B = "batch_80dd1615-2a10-428a-bb6f-0e559792721f";
      const encoded = encodeBatchRequest(items, B, { changesetBoundary: () => "changeset_BBB456" });

      const expected = [
        `--${B}`,
        "Content-Type: multipart/mixed; boundary=changeset_BBB456",
        "",
        "--changeset_BBB456",
        "Content-Type: application/http",
        "Content-Transfer-Encoding: binary",
        "Content-ID: 1",
        "",
        `POST ${API}/tasks HTTP/1.1`,
        "Content-Type: application/json; type=entry",
        "",
        JSON.stringify(task(1)),
        "--changeset_BBB456",
        "Content-Type: application/http",
        "Content-Transfer-Encoding: binary",
        "Content-ID: 2",
        "",
        `POST ${API}/tasks HTTP/1.1`,
        "Content-Type: application/json; type=entry",
        "",
        JSON.stringify(task(2)),
        "--changeset_BBB456--",
        "",
        `--${B}`,
        "Content-Type: application/http",
        "Content-Transfer-Encoding: binary",
        "",
        `GET ${API}/Account_Tasks?$select=subject HTTP/1.1`,
        "Accept: application/json",
        "",
        `--${B}--`,
        "",
      ].join("\r\n");
      expect(encoded).toBe(expected);
    });

    it("encodes a Content-ID reference (create, then update $1)", () => {
      const items: BatchItem[] = [
        {
          changeset: [
            { id: "1", method: "POST", url: `${API}/accounts`, body: { name: "Contoso" } },
            { id: "2", method: "PATCH", url: "$1", body: { description: "updated" } },
          ],
        },
      ];
      const encoded = encodeBatchRequest(items, "batch_X", { changesetBoundary: () => "cs_Y" });
      expect(encoded).toBe(
        [
          "--batch_X",
          "Content-Type: multipart/mixed; boundary=cs_Y",
          "",
          "--cs_Y",
          "Content-Type: application/http",
          "Content-Transfer-Encoding: binary",
          "Content-ID: 1",
          "",
          `POST ${API}/accounts HTTP/1.1`,
          "Content-Type: application/json; type=entry",
          "",
          '{"name":"Contoso"}',
          "--cs_Y",
          "Content-Type: application/http",
          "Content-Transfer-Encoding: binary",
          "Content-ID: 2",
          "",
          "PATCH $1 HTTP/1.1",
          "Content-Type: application/json; type=entry",
          "",
          '{"description":"updated"}',
          "--cs_Y--",
          "",
          "--batch_X--",
          "",
        ].join("\r\n")
      );
    });
  });

  describe("encodeRequest", () => {
    it("ends a body-less request's headers with a blank line before the next boundary (#55)", () => {
      const encoded = encodeBatchRequest(
        [
          { id: "a", method: "GET", url: `${API}/WhoAmI` },
          { id: "b", method: "DELETE", url: `${API}/accounts(${ACCOUNT})` },
        ],
        "b1"
      );
      expect(encoded).toContain(`GET ${API}/WhoAmI HTTP/1.1\r\n\r\n--b1\r\n`);
      expect(encoded).toContain(`DELETE ${API}/accounts(${ACCOUNT}) HTTP/1.1\r\n\r\n--b1--\r\n`);
    });

    it("adds Content-Type: application/json; type=entry to an object body (#55)", () => {
      const encoded = encodeRequest({
        id: "r",
        method: "POST",
        url: "accounts",
        body: { name: "A" },
      });
      expect(encoded.split("\r\n")).toContain("Content-Type: application/json; type=entry");
    });

    it("adds the JSON content type to a string body too", () => {
      const encoded = encodeRequest({ id: "r", method: "POST", url: "accounts", body: '{"a":1}' });
      expect(encoded).toContain('Content-Type: application/json; type=entry\r\n\r\n{"a":1}');
    });

    it("keeps the caller's content type, whatever its casing", () => {
      const encoded = encodeRequest({
        id: "r",
        method: "POST",
        url: "annotations",
        headers: { "content-type": "text/plain" },
        body: "Plain text content",
      });
      expect(encoded).toContain("content-type: text/plain\r\n\r\nPlain text content");
      expect(encoded).not.toContain("application/json");
      expect(encoded).not.toContain('"Plain text content"');
    });

    it("writes the URL and headers as given, and upper-cases the method", () => {
      const encoded = encodeRequest({
        id: "r",
        method: "get",
        url: "accounts?$top=5",
        headers: { Accept: "application/json" },
      });
      expect(encoded).toBe(
        [
          "Content-Type: application/http",
          "Content-Transfer-Encoding: binary",
          "",
          "GET accounts?$top=5 HTTP/1.1",
          "Accept: application/json",
          "",
        ].join("\r\n")
      );
    });

    it("writes Content-ID only when given", () => {
      const step: BatchRequestStep = { id: "x", method: "POST", url: "contacts", body: {} };
      expect(encodeRequest(step)).not.toContain("Content-ID");
      expect(encodeRequest(step, "x")).toContain("Content-ID: x\r\n");
    });
  });

  describe("encodeChangeset", () => {
    it("uses each request's id as its Content-ID (#55)", () => {
      const encoded = encodeChangeset(
        [
          { id: "acct", method: "POST", url: "accounts", body: {} },
          { id: "contact-1", method: "POST", url: "contacts", body: {} },
        ],
        "cs"
      );
      expect(encoded).toContain("Content-ID: acct\r\n");
      expect(encoded).toContain("Content-ID: contact-1\r\n");
      expect(encoded).not.toContain("Content-ID: 1\r\n");
    });
  });

  describe("encodeBatchRequest", () => {
    it("keeps Content-IDs unique across change sets (#55)", () => {
      const encoded = encodeBatchRequest(
        [
          { changeset: [{ id: "a", method: "POST", url: "accounts", body: {} }] },
          { changeset: [{ id: "b", method: "POST", url: "accounts", body: {} }] },
        ],
        "batch"
      );
      const ids = [...encoded.matchAll(/^Content-ID: (.*)$/gm)].map((m) => m[1].trim());
      expect(ids).toEqual(["a", "b"]);
    });

    it("keeps the order of interleaved requests and change sets (#55)", () => {
      const encoded = encodeBatchRequest(
        [
          { id: "g1", method: "GET", url: "accounts" },
          { changeset: [{ id: "c1", method: "POST", url: "contacts", body: {} }] },
          { id: "g2", method: "GET", url: "leads" },
        ],
        "batch"
      );
      const lines = [...encoded.matchAll(/^(GET|POST) (\S+) HTTP\/1\.1$/gm)].map((m) => m[2]);
      expect(lines).toEqual(["accounts", "contacts", "leads"]);
    });

    it("uses a different boundary for each change set", () => {
      const encoded = encodeBatchRequest(
        [
          { changeset: [{ id: "a", method: "POST", url: "accounts", body: {} }] },
          { changeset: [{ id: "b", method: "POST", url: "accounts", body: {} }] },
        ],
        "batch"
      );
      const boundaries = [...encoded.matchAll(/boundary=(\S+)/g)].map((m) => m[1]);
      expect(boundaries).toHaveLength(2);
      expect(new Set(boundaries).size).toBe(2);
    });

    it("uses CRLF line endings only", () => {
      const encoded = encodeBatchRequest(
        [
          { id: "g", method: "GET", url: "accounts" },
          { changeset: [{ id: "c", method: "POST", url: "contacts", body: { a: 1 } }] },
        ],
        "test"
      );
      expect(encoded.replace(/\r\n/g, "")).not.toContain("\n");
      expect(encoded.endsWith("--test--\r\n")).toBe(true);
    });
  });
});
