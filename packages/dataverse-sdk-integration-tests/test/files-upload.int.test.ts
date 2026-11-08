/**
 * #60 live: FileColumnClient uploads to a real file column, in one block and in several, and the
 * download returns the same bytes. Uses the platform table msdyn_richtextfile and its file column
 * msdyn_fileblob (128 MB max): creates one row and deletes it (with its file) afterwards.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { FileColumnClient, type UploadProgress } from "@mohsinonxrm/dataverse-sdk-files";
import { idFromEntityId, live, liveClient, runId } from "./env.js";

const SET = "msdyn_richtextfiles";
const COLUMN = "msdyn_fileblob";
let id = "";

async function bytesOf(file: Blob | Uint8Array): Promise<Uint8Array> {
  return file instanceof Blob ? new Uint8Array(await file.arrayBuffer()) : file;
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

describe.skipIf(!live)("live: file column upload and download (#60)", () => {
  it("uploads a small file in one block and downloads it", async () => {
    const { client } = liveClient();
    const files = new FileColumnClient(client, client.getBaseUrl());
    const content = Buffer.from(`hello from ${runId}`);
    await files.upload(SET, id, COLUMN, content, "hello.txt");
    expect(await bytesOf(await files.download(SET, id, COLUMN))).toEqual(new Uint8Array(content));
    const row = await client
      .api(`${SET}(${id})`)
      .select(`${COLUMN}_name`)
      .get<Record<string, unknown>>();
    expect(row[`${COLUMN}_name`]).toBe("hello.txt");
  });

  it("uploads a 10 MB file in 4 MB blocks and downloads the same bytes", async () => {
    const { client } = liveClient();
    const files = new FileColumnClient(client, client.getBaseUrl());
    const content = Buffer.alloc(10 * 1024 * 1024);
    for (let i = 0; i < content.length; i++) content[i] = (i * 31 + (i >> 12)) % 256;
    const progress: UploadProgress[] = [];
    await files.upload(SET, id, COLUMN, content, "ten-mb.bin", {
      onProgress: (p) => progress.push(p),
    });
    expect(progress.map((p) => [p.chunkIndex, p.totalChunks, p.percentage])).toEqual([
      [0, 3, 40],
      [1, 3, 80],
      [2, 3, 100],
    ]);
    const downloaded = await bytesOf(await files.download(SET, id, COLUMN));
    expect(downloaded.byteLength).toBe(content.byteLength);
    expect(Buffer.compare(downloaded, content)).toBe(0);
  });

  // #362: the PATCH routes sent the name in the x-ms-file-name header, which carries only ASCII.
  for (const method of ["actions", "single", "patch-chunked"] as const) {
    for (const fileName of ["合同.pdf", "résumé.pdf"]) {
      it(`uploads ${fileName} with method "${method}" and keeps the name`, async () => {
        const { client } = liveClient();
        const files = new FileColumnClient(client);
        const content = Buffer.from(`${fileName} via ${method} ${runId}`);
        await files.upload(SET, id, COLUMN, content, fileName, { method });
        const row = await client
          .api(`${SET}(${id})`)
          .select(`${COLUMN}_name`)
          .get<Record<string, unknown>>();
        expect(row[`${COLUMN}_name`]).toBe(fileName);
        const downloaded = await bytesOf(
          await files.download(SET, id, COLUMN, { method: "range" })
        );
        expect(Buffer.compare(downloaded, content)).toBe(0);
      });
    }
  }

  // #383: Dataverse stores an empty file only as an empty block list committed through the
  // actions route (an empty PATCH gets 400, an empty chunk 416), so every method sends it that way.
  for (const method of ["auto", "single", "patch-chunked"] as const) {
    it(`uploads a 0-byte file with method "${method}" and keeps it`, async () => {
      const { client } = liveClient();
      const files = new FileColumnClient(client);
      await files.upload(SET, id, COLUMN, new Uint8Array(0), `empty-${method}.txt`, { method });
      const row = await client
        .api(`${SET}(${id})`)
        .select(`${COLUMN}_name`)
        .get<Record<string, unknown>>();
      expect(row[`${COLUMN}_name`]).toBe(`empty-${method}.txt`);
      const downloaded = await bytesOf(await files.download(SET, id, COLUMN));
      expect(downloaded.byteLength).toBe(0);
    });
  }
});
