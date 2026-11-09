/**
 * #61 live: FileColumnClient.delete() removes the file, and download() rejects with the parsed
 * error. Uses the platform table msdyn_richtextfile and its file column msdyn_fileblob: creates
 * one row, puts a file in it with a single-request PATCH, and deletes the row afterwards.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";
import { idFromEntityId, live, liveClient, runId } from "./env.js";

const SET = "msdyn_richtextfiles";
const COLUMN = "msdyn_fileblob";
let id = "";

/** Put a small file in the column without FileColumnClient (single-request upload). */
async function seedFile(): Promise<void> {
  const { client } = liveClient();
  const res = await client.send({
    method: "PATCH",
    url: `${SET}(${id})/${COLUMN}`,
    headers: { "content-type": "application/octet-stream", "x-ms-file-name": "seed.txt" },
    body: new TextEncoder().encode("seed"),
  });
  expect(res.status).toBe(204);
}

beforeAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  const res = await client.send({
    method: "POST",
    url: SET,
    headers: {},
    body: { msdyn_name: `sdk-int files ${runId}` },
  });
  expect(res.status).toBe(204);
  id = idFromEntityId(res.headers.get("odata-entityid"));
});

afterAll(async () => {
  if (!live || !id) return;
  const { client } = liveClient();
  await client
    .api(`${SET}(${id})`)
    .delete()
    .catch(() => undefined);
});

describe.skipIf(!live)("live: file column delete and errors (#61)", () => {
  it("delete() removes the file; download() then rejects with a 404", async () => {
    const { client } = liveClient();
    const files = new FileColumnClient(client, client.getBaseUrl());
    await seedFile();
    const file: Blob | Uint8Array = await files.download(SET, id, COLUMN);
    expect(file instanceof Blob ? await file.text() : new TextDecoder().decode(file)).toBe("seed");

    await files.delete(SET, id, COLUMN);

    const err: unknown = await files.download(SET, id, COLUMN).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 404, code: "0x80040217" });
  });

  it("delete() of a column with no file succeeds", async () => {
    const { client } = liveClient();
    await new FileColumnClient(client, client.getBaseUrl()).delete(SET, id, COLUMN);
  });

  it("download() of a column that doesn't exist rejects with a 400", async () => {
    const { client } = liveClient();
    const err: unknown = await new FileColumnClient(client, client.getBaseUrl())
      .download(SET, id, "nosuchcolumn")
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 400 });
  });

  it("upload() to a column that isn't a file column rejects with the Dataverse error", async () => {
    const { client } = liveClient();
    const err: unknown = await new FileColumnClient(client, client.getBaseUrl())
      .upload(SET, id, "msdyn_name", Buffer.from("x"), "a.txt")
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect((err as DataverseODataError).status).toBeGreaterThanOrEqual(400);
  });
});
