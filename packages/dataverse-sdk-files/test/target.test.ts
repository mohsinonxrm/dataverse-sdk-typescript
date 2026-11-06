/**
 * #60: the InitializeFileBlocksUpload Target is the typed entity reference Dataverse documents,
 * `{ "@odata.type": "Microsoft.Dynamics.CRM.<logicalname>", "<primary key>": id }`, built from the
 * table's metadata (looked up once per entity set). Real DataverseClient + fake fetch.
 */
import { describe, expect, it } from "vitest";
import {
  createTestClient,
  jsonResponse,
  noContent,
  odataError,
  type FakeFetch,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { DataverseInvalidRequestError, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { FileColumnClient } from "../src/index.js";

const ID = "0f8fad5b-d9cb-469f-a165-70867728950e";

const TABLES: Partial<Record<string, { LogicalName: string; PrimaryIdAttribute: string }>> = {
  accounts: { LogicalName: "account", PrimaryIdAttribute: "accountid" },
  emails: { LogicalName: "email", PrimaryIdAttribute: "activityid" },
  new_projects: { LogicalName: "new_project", PrimaryIdAttribute: "new_projectid" },
};

function setup(): { files: FileColumnClient; fake: FakeFetch } {
  const { client, fake } = createTestClient();
  fake.on("GET", "/EntityDefinitions", (r) => {
    const filter = new URL(r.url).searchParams.get("$filter") ?? "";
    const set = /^EntitySetName eq '(.*)'$/.exec(filter)?.[1]?.replaceAll("''", "'") ?? "";
    const table = TABLES[set];
    return jsonResponse({ value: table ? [table] : [] });
  });
  fake.on("POST", "/InitializeFileBlocksUpload", () =>
    jsonResponse({ FileContinuationToken: "tok" })
  );
  fake.on("POST", "/UploadBlock", () => noContent());
  fake.on("POST", "/CommitFileBlocksUpload", () => jsonResponse({ FileId: "f1" }));
  return { files: new FileColumnClient(client, client.getBaseUrl()), fake };
}

function targets(fake: FakeFetch): unknown[] {
  return fake.requests
    .filter((r) => r.path === "/InitializeFileBlocksUpload")
    .map((r) => (JSON.parse(r.bodyText ?? "{}") as { Target?: unknown }).Target);
}

const lookups = (fake: FakeFetch) =>
  fake.requests.filter((r) => r.path.startsWith("/EntityDefinitions?"));

const upload = (files: FileColumnClient, set: string, id = ID) =>
  files.upload(set, id, "new_file", Buffer.from("abc"), "a.txt");

describe("files: InitializeFileBlocksUpload Target (#60)", () => {
  it("uses the table's logical name and primary key, not the entity set name", async () => {
    const { files, fake } = setup();
    await upload(files, "accounts");
    await upload(files, "emails", `{${ID.toUpperCase()}}`);
    expect(targets(fake)).toEqual([
      { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: ID },
      { "@odata.type": "Microsoft.Dynamics.CRM.email", activityid: ID },
    ]);
  });

  it("looks the table up by entity set name, once per entity set", async () => {
    const { files, fake } = setup();
    await upload(files, "new_projects");
    await upload(files, "new_projects");
    await upload(files, "accounts");
    const urls = lookups(fake).map((r) => new URL(r.url));
    expect(urls.map((u) => u.searchParams.get("$filter"))).toEqual([
      "EntitySetName eq 'new_projects'",
      "EntitySetName eq 'accounts'",
    ]);
    expect(urls[0]?.searchParams.get("$select")).toBe("LogicalName,PrimaryIdAttribute");
  });

  it("shares the lookup between FileColumnClients on the same DataverseClient", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/EntityDefinitions", () => jsonResponse({ value: [TABLES.accounts] }));
    fake.on("POST", "/InitializeFileBlocksUpload", () =>
      jsonResponse({ FileContinuationToken: "tok" })
    );
    fake.on("POST", "/UploadBlock", () => noContent());
    fake.on("POST", "/CommitFileBlocksUpload", () => jsonResponse({ FileId: "f1" }));
    await upload(new FileColumnClient(client, client.getBaseUrl()), "accounts");
    await upload(new FileColumnClient(client, client.getBaseUrl()), "accounts");
    expect(lookups(fake)).toHaveLength(1);
  });

  it("quotes the entity set name in the filter", async () => {
    const { files, fake } = setup();
    await upload(files, "o'brien").catch(() => undefined);
    const filter = new URL(lookups(fake)[0]?.url ?? "").searchParams.get("$filter");
    expect(filter).toBe("EntitySetName eq 'o''brien'");
  });

  it("rejects an unknown entity set before starting the upload", async () => {
    const { files, fake } = setup();
    await expect(upload(files, "nosuchtables")).rejects.toBeInstanceOf(
      DataverseInvalidRequestError
    );
    expect(targets(fake)).toEqual([]);
  });

  it("rejects with the parsed error when the lookup fails, and asks again next time", async () => {
    const { files, fake } = setup();
    fake.on("GET", "/EntityDefinitions", () => odataError(403, "0x80040220", "No access"), 1);
    const err: unknown = await upload(files, "accounts").catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 403 });
    expect(targets(fake)).toEqual([]);

    await upload(files, "accounts");
    expect(lookups(fake)).toHaveLength(2);
    expect(targets(fake)).toHaveLength(1);
  });
});
