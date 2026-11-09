/**
 * #61: every response is checked. A failed step rejects with the parsed DataverseError and
 * nothing after it is sent; delete() really deletes; uploads can be cancelled; a block is
 * retried after a 5xx. Real DataverseClient + fake fetch.
 */
import { describe, expect, it } from "vitest";
import {
  TEST_API_URL,
  createTestClient,
  jsonResponse,
  noContent,
  odataError,
  type FakeFetch,
} from "@mohsinonxrm/dataverse-sdk-testing";
import {
  DataverseAbortError,
  DataverseError,
  DataverseInvalidRequestError,
  DataverseODataError,
  type DataverseClientOptions,
} from "@mohsinonxrm/dataverse-sdk-core";
import { FileColumnClient } from "../src/index.js";

const ID = "00000000-0000-0000-0000-000000000001";

function setup(options: Partial<DataverseClientOptions> = {}): {
  files: FileColumnClient;
  fake: FakeFetch;
  paths: () => string[];
} {
  const { client, fake } = createTestClient(options);
  fake.on("GET", "/EntityDefinitions", () =>
    jsonResponse({ value: [{ LogicalName: "account", PrimaryIdAttribute: "accountid" }] })
  );
  fake.on("POST", "/InitializeFileBlocksUpload", () =>
    jsonResponse({ FileContinuationToken: "tok" })
  );
  fake.on("POST", "/UploadBlock", () => noContent());
  fake.on("POST", "/CommitFileBlocksUpload", () => jsonResponse({ FileId: "f1" }));
  return {
    files: new FileColumnClient(client, client.getBaseUrl()),
    fake,
    paths: () =>
      fake.requests.map((r) => r.path).filter((p) => !p.startsWith("/EntityDefinitions")),
  };
}

/** 16 bytes in 4-byte chunks: four UploadBlock requests. */
const upload16 = (files: FileColumnClient, signal?: AbortSignal) =>
  files.upload("accounts", ID, "new_file", Buffer.alloc(16, 1), "a.bin", { chunkSize: 4, signal });

describe("files: upload() checks every response (#61)", () => {
  it("a 400 on chunk 3 rejects with status 400, and nothing more is sent", async () => {
    const { files, fake, paths } = setup();
    let block = 0;
    fake.on("POST", "/UploadBlock", () =>
      ++block === 3 ? odataError(400, "0x80040203", "Invalid block") : noContent()
    );
    const err: unknown = await upload16(files).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toBeInstanceOf(DataverseError);
    expect(err).toMatchObject({ status: 400, code: "0x80040203", message: "Invalid block" });
    expect(paths()).toEqual([
      "/InitializeFileBlocksUpload",
      "/UploadBlock",
      "/UploadBlock",
      "/UploadBlock",
    ]);
  });

  it("a failed InitializeFileBlocksUpload rejects before any block is sent", async () => {
    const { files, fake, paths } = setup();
    fake.on("POST", "/InitializeFileBlocksUpload", () =>
      odataError(400, "0x80048d19", "Error identified in Payload")
    );
    await expect(upload16(files)).rejects.toMatchObject({ status: 400, code: "0x80048d19" });
    expect(paths()).toEqual(["/InitializeFileBlocksUpload"]);
  });

  it("a failed CommitFileBlocksUpload rejects", async () => {
    const { files, fake } = setup();
    fake.on("POST", "/CommitFileBlocksUpload", () => odataError(400, "0x80040216", "Bad token"));
    await expect(upload16(files)).rejects.toMatchObject({ status: 400, code: "0x80040216" });
  });

  it("a chunk size above 4 MB is rejected before anything is sent", async () => {
    const { files, fake } = setup();
    await expect(
      files.upload("accounts", ID, "new_file", Buffer.alloc(1), "a.bin", {
        chunkSize: 8 * 1024 * 1024,
      })
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
    expect(fake.requests).toHaveLength(0);
  });

  it("an aborted signal cancels the upload", async () => {
    const { files, paths } = setup();
    const controller = new AbortController();
    controller.abort();
    await expect(upload16(files, controller.signal)).rejects.toBeInstanceOf(DataverseAbortError);
    expect(paths()).toEqual([]);
  });

  it("aborting mid-upload stops before the next block", async () => {
    const { files, fake, paths } = setup();
    const controller = new AbortController();
    let block = 0;
    fake.on("POST", "/UploadBlock", () => {
      if (++block === 2) controller.abort();
      return noContent();
    });
    await expect(upload16(files, controller.signal)).rejects.toBeInstanceOf(DataverseAbortError);
    expect(paths()).toEqual(["/InitializeFileBlocksUpload", "/UploadBlock", "/UploadBlock"]);
  });

  it("retries a block after a 503, within the client's retry budget", async () => {
    const { files, fake, paths } = setup({
      retry: { maxRetries: 1, baseDelayMs: 0, jitter: false },
    });
    fake.on("POST", "/UploadBlock", () => odataError(503, "0x80040216", "Unavailable"), 1);
    await upload16(files);
    expect(paths().filter((p) => p === "/UploadBlock")).toHaveLength(5);
    expect(paths().at(-1)).toBe("/CommitFileBlocksUpload");
  });
});

describe("files: download() and delete() errors (#61)", () => {
  it("download() of an empty column rejects with a DataverseODataError 404", async () => {
    const { files, fake } = setup();
    fake.on("GET", `/accounts(${ID})/new_file/$value`, () =>
      odataError(404, "0x80040217", "No file attachment found")
    );
    const err: unknown = await files.download("accounts", ID, "new_file").catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 404, code: "0x80040217" });
  });

  it("delete() sends DELETE to the column", async () => {
    const { files, fake } = setup();
    fake.on("DELETE", `/accounts(${ID})/new_file`, () => noContent());
    await files.delete("accounts", `{${ID.toUpperCase()}}`, "new_file");
    expect(fake.last()).toMatchObject({
      method: "DELETE",
      url: `${TEST_API_URL}/accounts(${ID})/new_file`,
      bodyText: undefined,
    });
  });

  it("delete() rejects when Dataverse rejects the request", async () => {
    const { files, fake } = setup();
    fake.on("DELETE", `/accounts(${ID})/nope`, () =>
      odataError(400, "0x80060888", "Invalid segment")
    );
    await expect(files.delete("accounts", ID, "nope")).rejects.toMatchObject({ status: 400 });
  });
});
