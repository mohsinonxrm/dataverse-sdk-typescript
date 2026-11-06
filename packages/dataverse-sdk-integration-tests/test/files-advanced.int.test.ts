/**
 * #95 live: the advanced FileColumnClient routes against a real file column and image column.
 * Uses the platform table msdyn_richtextfile (file column msdyn_fileblob) and, for image sizes, a
 * temporary table with an image column that keeps full-size images. Deletes everything afterwards.
 */
import { deflateSync, crc32 } from "node:zlib";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { DataverseAbortError, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { FileColumnClient, type DownloadProgress } from "@mohsinonxrm/dataverse-sdk-files";
import { idFromEntityId, live, liveClient, runId } from "./env.js";

const FILE_SET = "msdyn_richtextfiles";
const FILE_COLUMN = "msdyn_fileblob";
let fileRow = "";

/** 1 MB-ish deterministic bytes. */
function bytesOf(length: number): Uint8Array {
  const out = new Uint8Array(length);
  for (let i = 0; i < length; i++) out[i] = (i * 31 + (i >> 8)) % 256;
  return out;
}

async function blobBytes(blob: Blob): Promise<Uint8Array> {
  return new Uint8Array(await blob.arrayBuffer());
}

function streamOf(bytes: Uint8Array, piece: number): ReadableStream<Uint8Array> {
  let at = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (at >= bytes.length) controller.close();
      else {
        controller.enqueue(bytes.slice(at, at + piece));
        at += piece;
      }
    },
  });
}

async function readAll(
  stream: ReadableStream<Uint8Array>
): Promise<{ bytes: Uint8Array; reads: number }> {
  const reader = stream.getReader();
  const parts: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
  }
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return { bytes: out, reads: parts.length };
}

/** A solid-colour RGB PNG of size x size pixels (noisy rows so it does not compress to nothing). */
function png(size: number): Uint8Array {
  const rows: number[] = [];
  for (let y = 0; y < size; y++) {
    rows.push(0);
    for (let x = 0; x < size; x++) rows.push((x * 7 + y) % 256, (y * 3) % 256, (x + y) % 256);
  }
  const chunk = (type: string, data: Uint8Array): Uint8Array => {
    const out = new Uint8Array(12 + data.length);
    const view = new DataView(out.buffer);
    view.setUint32(0, data.length);
    out.set(new TextEncoder().encode(type), 4);
    out.set(data, 8);
    view.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
    return out;
  };
  const header = new Uint8Array(13);
  const hv = new DataView(header.buffer);
  hv.setUint32(0, size);
  hv.setUint32(4, size);
  header.set([8, 2, 0, 0, 0], 8);
  const parts = [
    new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(Uint8Array.from(rows))),
    chunk("IEND", new Uint8Array(0)),
  ];
  return Uint8Array.from(parts.flatMap((p) => [...p]));
}

function pngSize(bytes: Uint8Array): number {
  return new DataView(bytes.buffer, bytes.byteOffset).getUint32(16);
}

async function createRow(set: string, body: Record<string, unknown>): Promise<string> {
  const { client } = liveClient();
  const res = await client.send({ method: "POST", url: set, headers: {}, body });
  expect(res.status).toBe(204);
  return idFromEntityId(res.headers.get("odata-entityid"));
}

beforeAll(async () => {
  if (!live) return;
  fileRow = await createRow(FILE_SET, { msdyn_name: `sdk-int files-advanced ${runId}` });
});

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  if (fileRow) {
    await client
      .api(`${FILE_SET}(${fileRow})`)
      .delete()
      .catch(() => undefined);
  }
});

function files(): FileColumnClient {
  return new FileColumnClient(liveClient().client);
}

describe.skipIf(!live)("live: advanced upload routes (#95)", () => {
  // Dataverse's chunked PATCH route needs chunks of exactly 4 MB (x-ms-chunk-size).
  const content = bytesOf(9 * 1024 * 1024);

  it("method single: one PATCH, same bytes back", async () => {
    const small = content.slice(0, 5000);
    await files().upload(FILE_SET, fileRow, FILE_COLUMN, small, "single.bin", {
      method: "single",
    });
    expect(await blobBytes(await files().download(FILE_SET, fileRow, FILE_COLUMN))).toEqual(small);
  });

  it("method patch-chunked: a Blob in 4 MB Content-Range chunks, same bytes back", async () => {
    const seen: number[] = [];
    await files().upload(
      FILE_SET,
      fileRow,
      FILE_COLUMN,
      new Blob([content as BlobPart]),
      "chunked.bin",
      {
        method: "patch-chunked",
        onProgress: (p) => seen.push(p.percentage),
      }
    );
    expect(seen).toEqual([44, 89, 100]);
    const back = await blobBytes(await files().download(FILE_SET, fileRow, FILE_COLUMN));
    expect(back.byteLength).toBe(content.byteLength);
    expect(Buffer.compare(back, content)).toBe(0);
  });

  it("uploads a ReadableStream: patch-chunked with size, and actions without", async () => {
    const part = content.slice(0, 5 * 1024 * 1024);
    await files().upload(FILE_SET, fileRow, FILE_COLUMN, streamOf(part, 700_000), "s1.bin", {
      method: "patch-chunked",
      size: part.length,
    });
    let back = await blobBytes(await files().download(FILE_SET, fileRow, FILE_COLUMN));
    expect(Buffer.compare(back, part)).toBe(0);

    const small = content.slice(0, 300 * 1024);
    await files().upload(FILE_SET, fileRow, FILE_COLUMN, streamOf(small, 40_000), "s2.bin", {
      chunkSize: 128 * 1024,
    });
    back = await blobBytes(await files().download(FILE_SET, fileRow, FILE_COLUMN));
    expect(Buffer.compare(back, small)).toBe(0);
  });

  it("aborting an upload rejects with DataverseAbortError", async () => {
    const controller = new AbortController();
    const upload = files().upload(FILE_SET, fileRow, FILE_COLUMN, content, "abort.bin", {
      method: "patch-chunked",
      signal: controller.signal,
      onProgress: () => {
        controller.abort();
      },
    });
    await expect(upload).rejects.toBeInstanceOf(DataverseAbortError);
  });
});

describe.skipIf(!live)("live: advanced download routes (#95)", () => {
  const content = bytesOf(500 * 1024);

  beforeAll(async () => {
    if (!live) return;
    await files().upload(FILE_SET, fileRow, FILE_COLUMN, content, "download.bin");
  });

  for (const method of ["range", "actions"] as const) {
    it(`method ${method}: same bytes, progress per chunk`, async () => {
      const progress: DownloadProgress[] = [];
      const blob = await files().download(FILE_SET, fileRow, FILE_COLUMN, {
        method,
        chunkSize: 128 * 1024,
        onProgress: (p) => progress.push(p),
      });
      const back = await blobBytes(blob);
      expect(back.byteLength).toBe(content.byteLength);
      expect(Buffer.compare(back, content)).toBe(0);
      expect(progress.map((p) => p.percentage).at(-1)).toBe(100);
      expect(progress.length).toBe(4);
      expect(progress[0]?.total).toBe(content.byteLength);
    });
  }

  it("downloadStream() reads the file chunk by chunk", async () => {
    const stream = await files().downloadStream(FILE_SET, fileRow, FILE_COLUMN, {
      chunkSize: 128 * 1024,
    });
    const { bytes, reads } = await readAll(stream);
    expect(reads).toBe(4);
    expect(Buffer.compare(bytes, content)).toBe(0);
  });

  it("a missing file rejects with the parsed error", async () => {
    const other = await createRow(FILE_SET, {
      msdyn_name: `sdk-int files-advanced empty ${runId}`,
    });
    try {
      const rejected = await files()
        .downloadStream(FILE_SET, other, FILE_COLUMN)
        .then(
          () => undefined,
          (e: unknown) => e
        );
      expect(rejected).toBeInstanceOf(DataverseODataError);
    } finally {
      await liveClient()
        .client.api(`${FILE_SET}(${other})`)
        .delete()
        .catch(() => undefined);
    }
  });

  it("aborting a download rejects with DataverseAbortError", async () => {
    const controller = new AbortController();
    const download = files().download(FILE_SET, fileRow, FILE_COLUMN, {
      method: "range",
      chunkSize: 64 * 1024,
      signal: controller.signal,
      onProgress: () => {
        controller.abort();
      },
    });
    await expect(download).rejects.toBeInstanceOf(DataverseAbortError);
  });
});

// A table create takes 30 to 70 seconds, a delete about as long.
const SLOW = 300_000;
const tag = (runId.split("-").at(-1) ?? "x").toLowerCase();
const imageTable = `new_sdkitf${tag}`;
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const label = (text: string): Record<string, unknown> => ({
  "@odata.type": "Microsoft.Dynamics.CRM.Label",
  LocalizedLabels: [
    { "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel", Label: text, LanguageCode: 1033 },
  ],
});

/** Retry `fn` until it resolves (metadata cache propagation across servers). */
async function eventually<T>(fn: () => Promise<T>, ms = 150_000): Promise<T> {
  const deadline = Date.now() + ms;
  for (;;) {
    try {
      return await fn();
    } catch (err) {
      if (Date.now() > deadline) throw err;
      await sleep(5_000);
    }
  }
}

describe.skipIf(!live)("live: image column sizes (#95)", () => {
  // The platform's own image columns (account.entityimage) keep no full-size copy, so this
  // creates a temporary table whose image column does. CanStoreFullImage is ignored when the
  // column is created; it takes an update (PUT) and a publish.
  let tableCreated = false;
  let imageSet = "";
  let rowId = "";

  beforeAll(async () => {
    const { client } = liveClient();
    const created = await client.send({
      method: "POST",
      url: "EntityDefinitions",
      headers: {},
      body: {
        "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
        SchemaName: imageTable,
        DisplayName: label(`SDK files ${tag}`),
        DisplayCollectionName: label(`SDK files ${tag}`),
        Description: label("Created by the SDK integration tests; safe to delete."),
        OwnershipType: "UserOwned",
        HasActivities: false,
        HasNotes: false,
        IsActivity: false,
        Attributes: [
          {
            "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
            SchemaName: "new_Name",
            IsPrimaryName: true,
            RequiredLevel: { Value: "None" },
            MaxLength: 100,
            FormatName: { Value: "Text" },
            DisplayName: label("Name"),
          },
          {
            "@odata.type": "Microsoft.Dynamics.CRM.ImageAttributeMetadata",
            SchemaName: "new_Photo",
            RequiredLevel: { Value: "None" },
            DisplayName: label("Photo"),
            CanStoreFullImage: true,
            IsPrimaryImage: true,
          },
        ],
      },
    });
    expect(created.status).toBe(204);
    tableCreated = true;
    const def = await eventually(() =>
      client
        .api(`EntityDefinitions(LogicalName='${imageTable}')`)
        .select("EntitySetName")
        .get<{ EntitySetName: string }>()
    );
    imageSet = def.EntitySetName;
    {
      const attrUrl = `EntityDefinitions(LogicalName='${imageTable}')/Attributes(LogicalName='new_photo')/Microsoft.Dynamics.CRM.ImageAttributeMetadata`;
      const cur = await eventually(async () => {
        const r = await client.send({ method: "GET", url: attrUrl, headers: {} });
        if (!r.ok) throw new Error(`get ${String(r.status)}`);
        return (await r.json()) as Record<string, unknown>;
      });
      const put = await client.send({
        method: "PUT",
        url: attrUrl,
        headers: { "MSCRM.MergeLabels": "true" },
        body: { ...cur, CanStoreFullImage: true },
      });
      expect(put.status).toBe(204);
      const pub = await client.send({
        method: "POST",
        url: "PublishAllXml",
        headers: {},
        body: {},
      });
      expect(pub.status).toBe(204);
    }
    rowId = await eventually(() => createRow(imageSet, { new_name: `sdk-int ${runId}` }));
  }, SLOW);

  afterAll(async () => {
    if (!live || !tableCreated) return;
    const { client } = liveClient();
    let notFound = 0;
    for (let attempt = 1; attempt <= 20; attempt++) {
      const res = await client.send({
        method: "DELETE",
        url: `EntityDefinitions(LogicalName='${imageTable}')`,
        headers: {},
      });
      if (res.ok) return;
      notFound = res.status === 404 ? notFound + 1 : 0;
      if (notFound >= 3) return;
      await sleep(10_000);
    }
    throw new Error(`Could not delete the temporary table ${imageTable}; delete it by hand.`);
  }, SLOW);

  it(
    "imageSize full returns the uploaded image; the default is the thumbnail",
    async () => {
      const image = png(400);
      await files().upload(imageSet, rowId, "new_photo", image, "big.png", {
        mimeType: "image/png",
      });
      const thumb = await blobBytes(await files().download(imageSet, rowId, "new_photo"));
      const full = await blobBytes(
        await files().download(imageSet, rowId, "new_photo", { imageSize: "full" })
      );
      expect(pngSize(full)).toBe(400);
      expect(Buffer.compare(full, image)).toBe(0);
      expect(pngSize(thumb)).toBeLessThan(400);
      const viaRange = await blobBytes(
        await files().download(imageSet, rowId, "new_photo", {
          method: "range",
          imageSize: "full",
          chunkSize: 16 * 1024,
        })
      );
      expect(Buffer.compare(viaRange, image)).toBe(0);
    },
    SLOW
  );
});
