/**
 * #95: the PATCH upload routes, ranged and block downloads, image sizes, streams and abort.
 * Real DataverseClient + fake fetch; payloads are a few bytes with an explicit tiny chunkSize.
 */
import { describe, expect, it, vi } from "vitest";
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
  DataverseInvalidRequestError,
  DataverseODataError,
} from "@mohsinonxrm/dataverse-sdk-core";
import { FileColumnClient, type DownloadProgress, type UploadProgress } from "../src/index.js";

const ID = "00000000-0000-0000-0000-000000000001";
const COLUMN_PATH = `/accounts(${ID})/new_file`;
const LOCATION = `${TEST_API_URL}${COLUMN_PATH}?sessiontoken=abc`;

const TEN = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

function setup(): { files: FileColumnClient; fake: FakeFetch } {
  const { client, fake } = createTestClient();
  fake.on("GET", "/EntityDefinitions", () =>
    jsonResponse({ value: [{ LogicalName: "account", PrimaryIdAttribute: "accountid" }] })
  );
  return { files: new FileColumnClient(client), fake };
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

async function readAll(stream: ReadableStream<Uint8Array>): Promise<number[][]> {
  const reader = stream.getReader();
  const out: number[][] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return out;
    out.push([...value]);
  }
}

/** The server side of the chunked PATCH route: 4-byte chunks, collects what arrives. */
function chunkedServer(fake: FakeFetch, received: Uint8Array[], chunk = "4") {
  fake.on("PATCH", COLUMN_PATH, (r) =>
    r.headers["x-ms-transfer-mode"] === "chunked"
      ? new Response(null, {
          status: 200,
          headers: { location: LOCATION, "x-ms-chunk-size": chunk },
        })
      : undefined
  );
  fake.on("PATCH", COLUMN_PATH, (r) => {
    if (r.headers["x-ms-transfer-mode"] === "chunked") return undefined;
    received.push(r.bodyBytes ?? new Uint8Array());
    return noContent();
  });
}

describe("files: upload routes (#95)", () => {
  it("method single: one PATCH with x-ms-file-name and the bytes, no metadata lookup", async () => {
    const { files, fake } = setup();
    fake.on("PATCH", COLUMN_PATH, () => noContent());
    const progress: UploadProgress[] = [];
    await files.upload("accounts", ID, "new_file", TEN, "a.bin", {
      method: "single",
      onProgress: (p) => progress.push(p),
    });
    expect(fake.requests).toHaveLength(1);
    const request = fake.last();
    expect(request.method).toBe("PATCH");
    expect(request.headers["x-ms-file-name"]).toBe("a.bin");
    expect(request.headers["content-type"]).toBe("application/octet-stream");
    expect([...(request.bodyBytes ?? [])]).toEqual([...TEN]);
    expect(progress).toEqual([
      { uploaded: 10, total: 10, percentage: 100, chunkIndex: 0, totalChunks: 1 },
    ]);
  });

  it("method patch-chunked: start request, then Content-Range chunks to the Location", async () => {
    const { files, fake } = setup();
    const received: Uint8Array[] = [];
    chunkedServer(fake, received);
    const progress: UploadProgress[] = [];
    await files.upload("accounts", ID, "new_file", TEN, "a.bin", {
      method: "patch-chunked",
      onProgress: (p) => progress.push(p),
    });
    expect(fake.requests.map((r) => r.headers["content-range"])).toEqual([
      undefined,
      "bytes 0-3/10",
      "bytes 4-7/10",
      "bytes 8-9/10",
    ]);
    expect(fake.requests[0]?.headers["x-ms-file-name"]).toBe("a.bin");
    expect(fake.requests[1]?.url).toBe(LOCATION);
    expect(received.map((c) => [...c])).toEqual([
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9],
    ]);
    expect(progress.map((p) => p.percentage)).toEqual([40, 80, 100]);
    expect(fake.requests.every((r) => r.headers.authorization === "Bearer test-token")).toBe(true);
  });

  it("method patch-chunked: a ReadableStream needs size", async () => {
    const { files, fake } = setup();
    const err: unknown = await files
      .upload("accounts", ID, "new_file", streamOf(TEN, 3), "a.bin", { method: "patch-chunked" })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseInvalidRequestError);
    expect(fake.requests).toHaveLength(0);
  });

  it("method patch-chunked: a ReadableStream with size is re-chunked to the server's chunk size", async () => {
    const { files, fake } = setup();
    const received: Uint8Array[] = [];
    chunkedServer(fake, received);
    await files.upload("accounts", ID, "new_file", streamOf(TEN, 3), "a.bin", {
      method: "patch-chunked",
      size: 10,
    });
    expect(received.map((c) => [...c])).toEqual([
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9],
    ]);
  });

  it("method patch-chunked: rejects when the stream is shorter than size", async () => {
    const { files, fake } = setup();
    chunkedServer(fake, []);
    await expect(
      files.upload("accounts", ID, "new_file", streamOf(TEN, 3), "a.bin", {
        method: "patch-chunked",
        size: 12,
      })
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
  });

  it("method patch-chunked: no Location header is a clear error", async () => {
    const { files, fake } = setup();
    fake.on("PATCH", COLUMN_PATH, () => new Response(null, { status: 200 }));
    await expect(
      files.upload("accounts", ID, "new_file", TEN, "a.bin", { method: "patch-chunked" })
    ).rejects.toThrow(/Location/);
  });

  it("method patch-chunked: aborting mid-upload stops before the next chunk", async () => {
    const { files, fake } = setup();
    chunkedServer(fake, []);
    const controller = new AbortController();
    await expect(
      files.upload("accounts", ID, "new_file", TEN, "a.bin", {
        method: "patch-chunked",
        signal: controller.signal,
        onProgress: () => {
          controller.abort();
        },
      })
    ).rejects.toBeInstanceOf(DataverseAbortError);
    expect(fake.requests).toHaveLength(2);
  });

  it("a Blob is read slice by slice, never whole", async () => {
    const { files, fake } = setup();
    fake.on("POST", "/InitializeFileBlocksUpload", () =>
      jsonResponse({ FileContinuationToken: "t" })
    );
    const sizes: number[] = [];
    fake.on("POST", "/UploadBlock", (r) => {
      sizes.push(atob((JSON.parse(r.bodyText ?? "{}") as { BlockData: string }).BlockData).length);
      return noContent();
    });
    fake.on("POST", "/CommitFileBlocksUpload", () => jsonResponse({ FileId: "f" }));
    const blob = new Blob([TEN], { type: "image/png" });
    const whole = vi.spyOn(blob, "arrayBuffer");
    await files.upload("accounts", ID, "new_file", blob, "a.png", { chunkSize: 4 });
    expect(sizes).toEqual([4, 4, 2]);
    expect(whole).not.toHaveBeenCalled();
    const commit = fake.requests.find((r) => r.path === "/CommitFileBlocksUpload");
    expect((JSON.parse(commit?.bodyText ?? "{}") as { MimeType: string }).MimeType).toBe(
      "image/png"
    );
  });

  it("actions route: a ReadableStream of unknown size, with progress and mimeType", async () => {
    const { files, fake } = setup();
    fake.on("POST", "/InitializeFileBlocksUpload", () =>
      jsonResponse({ FileContinuationToken: "t" })
    );
    const sizes: number[] = [];
    fake.on("POST", "/UploadBlock", (r) => {
      sizes.push(atob((JSON.parse(r.bodyText ?? "{}") as { BlockData: string }).BlockData).length);
      return noContent();
    });
    fake.on("POST", "/CommitFileBlocksUpload", () => jsonResponse({ FileId: "f" }));
    const progress: UploadProgress[] = [];
    await files.upload("accounts", ID, "new_file", streamOf(TEN, 3), "a.txt", {
      chunkSize: 4,
      mimeType: "text/plain",
      onProgress: (p) => progress.push(p),
    });
    expect(sizes).toEqual([4, 4, 2]);
    expect(progress.map((p) => [p.uploaded, p.total, p.percentage])).toEqual([
      [4, 4, 0],
      [8, 8, 0],
      [10, 10, 100],
    ]);
    const commit = fake.requests.find((r) => r.path === "/CommitFileBlocksUpload");
    expect((JSON.parse(commit?.bodyText ?? "{}") as { MimeType: string }).MimeType).toBe(
      "text/plain"
    );
  });

  it("actions route: size makes stream progress report a real total", async () => {
    const { files, fake } = setup();
    fake.on("POST", "/InitializeFileBlocksUpload", () =>
      jsonResponse({ FileContinuationToken: "t" })
    );
    fake.on("POST", "/UploadBlock", () => noContent());
    fake.on("POST", "/CommitFileBlocksUpload", () => jsonResponse({ FileId: "f" }));
    const progress: UploadProgress[] = [];
    await files.upload("accounts", ID, "new_file", streamOf(TEN, 3), "a.bin", {
      chunkSize: 4,
      size: 10,
      onProgress: (p) => progress.push(p),
    });
    expect(progress.map((p) => [p.total, p.percentage, p.totalChunks])).toEqual([
      [10, 40, 3],
      [10, 80, 3],
      [10, 100, 3],
    ]);
  });
});

/** Serves TEN from `GET .../$value`, honouring Range with 206 and x-ms-file-size. */
function fileServer(fake: FakeFetch, ranged = true) {
  fake.on("GET", `${COLUMN_PATH}/$value`, (r) => {
    const m = /bytes=(\d+)-(\d+)/.exec(r.headers.range ?? "");
    if (!m || !ranged) return new Response(TEN, { status: 200 });
    const start = Number(m[1]);
    const end = Math.min(Number(m[2]), TEN.length - 1);
    return new Response(TEN.slice(start, end + 1), {
      status: 206,
      headers: {
        "content-range": `bytes ${String(start)}-${String(end)}/10`,
        "x-ms-file-size": "10",
        "content-type": "application/octet-stream",
      },
    });
  });
}

describe("files: download routes (#95)", () => {
  it("method range: one Range request per chunk, same bytes, progress", async () => {
    const { files, fake } = setup();
    fileServer(fake);
    const progress: DownloadProgress[] = [];
    const blob = await files.download("accounts", ID, "new_file", {
      method: "range",
      chunkSize: 4,
      onProgress: (p) => progress.push(p),
    });
    expect([...new Uint8Array(await blob.arrayBuffer())]).toEqual([...TEN]);
    expect(fake.requests.map((r) => r.headers.range)).toEqual([
      "bytes=0-3",
      "bytes=4-7",
      "bytes=8-11",
    ]);
    expect(progress.map((p) => [p.downloaded, p.total, p.percentage, p.totalChunks])).toEqual([
      [4, 10, 40, 3],
      [8, 10, 80, 3],
      [10, 10, 100, 3],
    ]);
  });

  it("method range: a server that ignores Range yields the whole file in one go", async () => {
    const { files, fake } = setup();
    fileServer(fake, false);
    const blob = await files.download("accounts", ID, "new_file", {
      method: "range",
      chunkSize: 4,
    });
    expect([...new Uint8Array(await blob.arrayBuffer())]).toEqual([...TEN]);
    expect(fake.requests).toHaveLength(1);
  });

  it("method actions: InitializeFileBlocksDownload, then DownloadBlock by offset", async () => {
    const { files, fake } = setup();
    fake.on("POST", "/InitializeFileBlocksDownload", () =>
      jsonResponse({ FileSizeInBytes: 10, FileName: "a.bin", FileContinuationToken: "tok" })
    );
    fake.on("POST", "/DownloadBlock", (r) => {
      const body = JSON.parse(r.bodyText ?? "{}") as { Offset: number; BlockLength: number };
      const slice = TEN.slice(body.Offset, body.Offset + body.BlockLength);
      return jsonResponse({ Data: btoa(String.fromCharCode(...slice)) });
    });
    const blob = await files.download("accounts", ID, "new_file", {
      method: "actions",
      chunkSize: 4,
    });
    expect([...new Uint8Array(await blob.arrayBuffer())]).toEqual([...TEN]);
    const offsets = fake.requests
      .filter((r) => r.path === "/DownloadBlock")
      .map((r) => (JSON.parse(r.bodyText ?? "{}") as { Offset: number }).Offset);
    expect(offsets).toEqual([0, 4, 8]);
  });

  it("single download reports progress once", async () => {
    const { files, fake } = setup();
    fileServer(fake, false);
    const progress: DownloadProgress[] = [];
    await files.download("accounts", ID, "new_file", { onProgress: (p) => progress.push(p) });
    expect(progress).toEqual([
      { downloaded: 10, total: 10, percentage: 100, chunkIndex: 0, totalChunks: 1 },
    ]);
  });

  it("imageSize full adds ?size=full; the default and thumbnail do not", async () => {
    const { files, fake } = setup();
    fileServer(fake, false);
    await files.download("accounts", ID, "new_file", { imageSize: "full" });
    await files.download("accounts", ID, "new_file");
    await files.download("accounts", ID, "new_file", { imageSize: "thumbnail" });
    await files.download("accounts", ID, "new_file", {
      method: "range",
      imageSize: "full",
      chunkSize: 16,
    });
    expect(fake.requests.map((r) => r.path.includes("size=full"))).toEqual([
      true,
      false,
      false,
      true,
    ]);
  });

  it("imageSize full is rejected on the actions route", async () => {
    const { files, fake } = setup();
    await expect(
      files.download("accounts", ID, "new_file", { method: "actions", imageSize: "full" })
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
    expect(fake.requests).toHaveLength(0);
  });

  it("an aborted signal cancels a ranged download after the first chunk", async () => {
    const { files, fake } = setup();
    fileServer(fake);
    const controller = new AbortController();
    await expect(
      files.download("accounts", ID, "new_file", {
        method: "range",
        chunkSize: 4,
        signal: controller.signal,
        onProgress: () => {
          controller.abort();
        },
      })
    ).rejects.toBeInstanceOf(DataverseAbortError);
    expect(fake.requests).toHaveLength(1);
  });

  it("an aborted signal cancels a single download and a delete", async () => {
    const { files, fake } = setup();
    fileServer(fake, false);
    fake.on("DELETE", COLUMN_PATH, () => noContent());
    const controller = new AbortController();
    controller.abort();
    await expect(
      files.download("accounts", ID, "new_file", { signal: controller.signal })
    ).rejects.toBeInstanceOf(DataverseAbortError);
    await expect(
      files.delete("accounts", ID, "new_file", { signal: controller.signal })
    ).rejects.toBeInstanceOf(DataverseAbortError);
    expect(fake.requests).toHaveLength(0);
  });
});

describe("files: downloadStream() (#95)", () => {
  it("reads the file chunk by chunk, requesting as the stream is read", async () => {
    const { files, fake } = setup();
    fileServer(fake);
    const stream = await files.downloadStream("accounts", ID, "new_file", { chunkSize: 4 });
    expect(fake.requests).toHaveLength(1);
    expect(await readAll(stream)).toEqual([
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9],
    ]);
    expect(fake.requests).toHaveLength(3);
  });

  it("cancelling the stream stops further requests", async () => {
    const { files, fake } = setup();
    fileServer(fake);
    const stream = await files.downloadStream("accounts", ID, "new_file", { chunkSize: 4 });
    const reader = stream.getReader();
    expect((await reader.read()).value).toEqual(Uint8Array.from([0, 1, 2, 3]));
    await reader.cancel();
    expect(fake.requests.length).toBeLessThanOrEqual(2);
    const count = fake.requests.length;
    await new Promise((r) => setTimeout(r, 10));
    expect(fake.requests).toHaveLength(count);
  });

  it("a missing file rejects before the stream is returned", async () => {
    const { files, fake } = setup();
    fake.on("GET", `${COLUMN_PATH}/$value`, () => odataError(404, "0x80040217", "No file"));
    const err: unknown = await files
      .downloadStream("accounts", ID, "new_file")
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect((err as DataverseODataError).status).toBe(404);
  });

  it("method single streams one response body", async () => {
    const { files, fake } = setup();
    fileServer(fake, false);
    const stream = await files.downloadStream("accounts", ID, "new_file", { method: "single" });
    expect((await readAll(stream)).flat()).toEqual([...TEN]);
    expect(fake.requests).toHaveLength(1);
  });
});
