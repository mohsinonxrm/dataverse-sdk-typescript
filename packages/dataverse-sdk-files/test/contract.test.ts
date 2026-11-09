/**
 * Contract tests: FileColumnClient against a real DataverseClient and a fake fetch.
 *
 * `it.fails` pins a known bug; flip it to `it` in the PR that fixes the linked issue.
 */
import { describe, it, expect } from "vitest";
import {
  TEST_API_URL,
  createTestClient,
  jsonResponse,
  noContent,
  odataError,
} from "@mohsinonxrm/dataverse-sdk-testing";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { FileColumnClient } from "../src/index.js";

const ID = "00000000-0000-0000-0000-000000000001";

/** A FileColumnClient on a real DataverseClient: requests run through its pipeline (#59). */
function filesClientFor(client: DataverseClient): FileColumnClient {
  return new FileColumnClient(client);
}

function uploadRoutes(fake: ReturnType<typeof createTestClient>["fake"], blockStatus = 204) {
  fake.on("GET", "/EntityDefinitions", () =>
    jsonResponse({ value: [{ LogicalName: "account", PrimaryIdAttribute: "accountid" }] })
  );
  fake.on("POST", "/InitializeFileBlocksUpload", () =>
    jsonResponse({ FileContinuationToken: "tok" })
  );
  fake.on("POST", "/UploadBlock", () =>
    blockStatus === 204 ? noContent() : odataError(blockStatus, "0x80040203", "Invalid block")
  );
  fake.on("POST", "/CommitFileBlocksUpload", () =>
    jsonResponse({ FileId: "f1", FileSizeInBytes: 3 })
  );
}

describe("files: FileColumnClient wire contract", () => {
  it("uploads through the client pipeline with the bearer token", async () => {
    const { client, fake } = createTestClient();
    uploadRoutes(fake);
    await filesClientFor(client).upload("accounts", ID, "new_file", Buffer.from("abc"), "a.txt");
    const paths = fake.requests.map((r) => r.path.split("?")[0]);
    expect(paths).toEqual([
      "/EntityDefinitions",
      "/InitializeFileBlocksUpload",
      "/UploadBlock",
      "/CommitFileBlocksUpload",
    ]);
    expect(fake.requests.every((r) => r.headers.authorization === "Bearer test-token")).toBe(true);
  });

  it("#60: InitializeFileBlocksUpload Target is a typed entity reference", async () => {
    const { client, fake } = createTestClient();
    uploadRoutes(fake);
    await filesClientFor(client).upload("accounts", ID, "new_file", Buffer.from("abc"), "a.txt");
    const initRequest = fake.requests.find((r) => r.path === "/InitializeFileBlocksUpload");
    const init = JSON.parse(initRequest?.bodyText ?? "{}") as {
      Target?: Record<string, unknown>;
    };
    expect(init.Target).toEqual({ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: ID });
  });

  it("#61: upload() rejects when a block upload fails", async () => {
    const { client, fake } = createTestClient();
    uploadRoutes(fake, 400);
    await expect(
      filesClientFor(client).upload("accounts", ID, "new_file", Buffer.from("abc"), "a.txt")
    ).rejects.toMatchObject({ status: 400 });
  });

  it("downloads from the column $value endpoint", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", `/accounts(${ID})/new_file/$value`, () => new Response("abc", { status: 200 }));
    await filesClientFor(client).download("accounts", ID, "new_file");
    expect(fake.last().url).toBe(`${TEST_API_URL}/accounts(${ID})/new_file/$value`);
  });
});
