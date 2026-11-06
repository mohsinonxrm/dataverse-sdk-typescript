/**
 * #59: `new FileColumnClient(client)` takes a DataverseClient and builds absolute URLs on its
 * base URL; an adapter without a base URL is rejected up front.
 */
import { describe, expect, it } from "vitest";
import {
  TEST_API_URL,
  TEST_TOKEN,
  createTestClient,
  jsonResponse,
  noContent,
} from "@mohsinonxrm/dataverse-sdk-testing";
import {
  DataverseInvalidRequestError,
  type RequestAdapter,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { FileColumnClient } from "../src/index.js";

const ID = "00000000-0000-0000-0000-000000000001";

/** An adapter that records what it is given and answers every file request. */
function recordingAdapter(): RequestAdapter & { urls: string[] } {
  const urls: string[] = [];
  return {
    urls,
    send(request: RequestInformation) {
      urls.push(request.url);
      if (request.url.includes("EntityDefinitions")) {
        return Promise.resolve(
          jsonResponse({ value: [{ LogicalName: "account", PrimaryIdAttribute: "accountid" }] })
        );
      }
      if (request.url.endsWith("/InitializeFileBlocksUpload")) {
        return Promise.resolve(jsonResponse({ FileContinuationToken: "tok" }));
      }
      if (request.url.endsWith("/CommitFileBlocksUpload")) {
        return Promise.resolve(jsonResponse({ FileId: "f1" }));
      }
      return Promise.resolve(noContent());
    },
  };
}

describe("files: FileColumnClient constructor (#59)", () => {
  it("new FileColumnClient(client) sends through the client with its token", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/EntityDefinitions", () =>
      jsonResponse({ value: [{ LogicalName: "account", PrimaryIdAttribute: "accountid" }] })
    );
    fake.on("POST", "/InitializeFileBlocksUpload", () =>
      jsonResponse({ FileContinuationToken: "tok" })
    );
    fake.on("POST", "/UploadBlock", () => noContent());
    fake.on("POST", "/CommitFileBlocksUpload", () => jsonResponse({ FileId: "f1" }));
    fake.on("GET", `/accounts(${ID})/new_file/$value`, () => new Response("abc"));

    const files = new FileColumnClient(client);
    await files.upload("accounts", ID, "new_file", Buffer.from([1, 2, 3]), "a.bin");
    await files.download("accounts", ID, "new_file");

    expect(fake.requests.length).toBeGreaterThanOrEqual(4);
    for (const r of fake.requests) {
      expect(r.url.startsWith(`${TEST_API_URL}/`)).toBe(true);
      expect(r.headers.authorization).toBe(`Bearer ${TEST_TOKEN}`);
    }
  });

  it("builds absolute URLs from the adapter's getBaseUrl()", async () => {
    const adapter = Object.assign(recordingAdapter(), { getBaseUrl: () => TEST_API_URL });
    await new FileColumnClient(adapter).upload("accounts", ID, "c", Buffer.from([1]), "a.bin");
    expect(adapter.urls.length).toBeGreaterThanOrEqual(3);
    for (const url of adapter.urls) expect(url.startsWith(`${TEST_API_URL}/`)).toBe(true);
  });

  it("an explicit base URL wins, and a trailing slash is dropped", async () => {
    const adapter = Object.assign(recordingAdapter(), {
      getBaseUrl: () => "https://other.crm.dynamics.com/api/data/v9.2",
    });
    await new FileColumnClient(adapter, `${TEST_API_URL}/`).download("accounts", ID, "c");
    expect(adapter.urls).toEqual([`${TEST_API_URL}/accounts(${ID})/c/$value`]);
  });

  it("rejects an adapter without a base URL instead of sending relative URLs", () => {
    const create = () => new FileColumnClient(recordingAdapter());
    expect(create).toThrow(DataverseInvalidRequestError);
    expect(create).toThrow(/Web API root/);
  });
});
