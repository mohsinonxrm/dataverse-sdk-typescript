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

/**
 * The server side of the chunked PATCH route: 4-byte chunks, collects what arrives. With `echo`,
 * the Location repeats the start request's query, as Dataverse's does, and a chunk that names
 * the file twice is rejected as Dataverse rejects it.
 */
function chunkedServer(fake: FakeFetch, received: Uint8Array[], chunk = "4", echo = false) {
  fake.on("PATCH", COLUMN_PATH, (r) => {
    if (r.headers["x-ms-transfer-mode"] !== "chunked") return undefined;
    const query = new URL(r.url).search.replace(/^\?/, "&");
    return new Response(null, {
      status: 200,
      headers: { location: echo ? `${LOCATION}${query}` : LOCATION, "x-ms-chunk-size": chunk },
    });
  });
  fake.on("PATCH", COLUMN_PATH, (r) => {
    if (r.headers["x-ms-transfer-mode"] === "chunked") return undefined;
    if (new URL(r.url).searchParams.getAll("x-ms-file-name").length > 1) {
      return odataError(
        400,
        "0x80060888",
        "Query option 'x-ms-file-name' was specified more than once, but it must be specified at most once."
      );
    }
    received.push(r.bodyBytes ?? new Uint8Array());
    return noContent();
  });
}

describe("files: upload routes (#95)", () => {
  it("method single: one PATCH with ?x-ms-file-name= and the bytes, no metadata lookup", async () => {
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
    expect(request.url).toBe(`${TEST_API_URL}${COLUMN_PATH}?x-ms-file-name=a.bin`);
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
    expect(fake.requests[0]?.url).toBe(`${TEST_API_URL}${COLUMN_PATH}?x-ms-file-name=a.bin`);
    expect(fake.requests[1]?.url).toBe(`${LOCATION}&x-ms-file-name=a.bin`);
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

/** The decoded `x-ms-file-name` query parameter of a request URL. */
function nameParam(url: string | undefined): string | null {
  return new URL(url ?? "about:blank").searchParams.get("x-ms-file-name");
}

describe("files: file names outside ASCII (#362)", () => {
  it("method single: the name is the encoded x-ms-file-name query parameter, not a header", async () => {
    const { files, fake } = setup();
    fake.on("PATCH", COLUMN_PATH, () => noContent());
    await files.upload("accounts", ID, "new_file", TEN, "合同.pdf", { method: "single" });
    const request = fake.last();
    expect(request.url).toBe(`${TEST_API_URL}${COLUMN_PATH}?x-ms-file-name=%E5%90%88%E5%90%8C.pdf`);
    expect(nameParam(request.url)).toBe("合同.pdf");
    expect(request.headers["x-ms-file-name"]).toBeUndefined();
    expect([...(request.bodyBytes ?? [])]).toEqual([...TEN]);
  });

  it("method patch-chunked: the start request and every chunk carry the name as a query parameter", async () => {
    const { files, fake } = setup();
    const received: Uint8Array[] = [];
    chunkedServer(fake, received);
    await files.upload("accounts", ID, "new_file", TEN, "résumé.pdf", {
      method: "patch-chunked",
    });
    expect(fake.requests.map((r) => nameParam(r.url))).toEqual([
      "résumé.pdf",
      "résumé.pdf",
      "résumé.pdf",
      "résumé.pdf",
    ]);
    expect(fake.requests[0]?.url).toBe(
      `${TEST_API_URL}${COLUMN_PATH}?x-ms-file-name=r%C3%A9sum%C3%A9.pdf`
    );
    // The chunks go to the Location, keeping its session token.
    expect(fake.requests[1]?.url).toBe(`${LOCATION}&x-ms-file-name=r%C3%A9sum%C3%A9.pdf`);
    expect(fake.requests.every((r) => r.headers["x-ms-file-name"] === undefined)).toBe(true);
    expect(received.map((c) => [...c])).toEqual([
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9],
    ]);
  });

  it("method patch-chunked: a Location that already names the file is used as it is", async () => {
    const { files, fake } = setup();
    const received: Uint8Array[] = [];
    chunkedServer(fake, received, "4", true);
    await files.upload("accounts", ID, "new_file", TEN, "合同.pdf", { method: "patch-chunked" });
    const location = `${LOCATION}&x-ms-file-name=%E5%90%88%E5%90%8C.pdf`;
    expect(fake.requests.slice(1).map((r) => r.url)).toEqual([location, location, location]);
    expect(received.map((c) => [...c])).toEqual([
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9],
    ]);
  });

  it("a zero-byte patch-chunked upload names the file in the query", async () => {
    const { files, fake } = setup();
    fake.on("PATCH", COLUMN_PATH, () => noContent());
    await files.upload("accounts", ID, "new_file", new Uint8Array(0), "合同.pdf", {
      method: "patch-chunked",
    });
    expect(nameParam(fake.last().url)).toBe("合同.pdf");
  });

  it("characters that mean something in a query string are encoded", async () => {
    const { files, fake } = setup();
    fake.on("PATCH", COLUMN_PATH, () => noContent());
    await files.upload("accounts", ID, "new_file", TEN, "a&b=c #1+2%.txt", { method: "single" });
    expect(nameParam(fake.last().url)).toBe("a&b=c #1+2%.txt");
  });

  it("method actions: the name goes in the JSON bodies of Initialize and Commit", async () => {
    const { files, fake } = setup();
    fake.on("POST", "/InitializeFileBlocksUpload", () =>
      jsonResponse({ FileContinuationToken: "t" })
    );
    fake.on("POST", "/UploadBlock", () => noContent());
    fake.on("POST", "/CommitFileBlocksUpload", () => jsonResponse({ FileId: "f" }));
    await files.upload("accounts", ID, "new_file", TEN, "合同.pdf");
    for (const path of ["/InitializeFileBlocksUpload", "/CommitFileBlocksUpload"]) {
      const request = fake.requests.find((r) => r.path === path);
      expect((JSON.parse(request?.bodyText ?? "{}") as { FileName: string }).FileName).toBe(
        "合同.pdf"
      );
    }
  });
});

/** DownloadBlock that, like Dataverse for a file stored in the database, refuses partial reads. */
function unchunkedBlocks(fake: FakeFetch) {
  fake.on("POST", "/InitializeFileBlocksDownload", () =>
    jsonResponse({
      FileSizeInBytes: 10,
      FileName: "a.bin",
      FileContinuationToken: "tok",
      IsChunkingSupported: false,
    })
  );
  fake.on("POST", "/DownloadBlock", (r) => {
    const body = JSON.parse(r.bodyText ?? "{}") as { Offset: number; BlockLength: number };
    if (body.Offset !== 0 || body.BlockLength < TEN.length) {
      return odataError(
        400,
        "0x80090017",
        "Downloading in multiple chunks isn't supported for the files stored in the database."
      );
    }
    return jsonResponse({ Data: btoa(String.fromCharCode(...TEN)) });
  });
}

/** GET .../$value that refuses Range with 0x80090017 and serves the whole file without it. */
function unrangedServer(fake: FakeFetch) {
  fake.on("GET", `${COLUMN_PATH}/$value`, (r) =>
    r.headers.range
      ? odataError(
          400,
          "0x80090017",
          "Downloading in multiple chunks isn't supported for the files stored in the database."
        )
      : new Response(TEN, { status: 200, headers: { "content-type": "application/pdf" } })
  );
}

describe("files: files that can't be read in parts (#362)", () => {
  it("method actions: IsChunkingSupported false reads the whole file as one block", async () => {
    const { files, fake } = setup();
    unchunkedBlocks(fake);
    const progress: DownloadProgress[] = [];
    const blob = await files.download("accounts", ID, "new_file", {
      method: "actions",
      chunkSize: 4,
      onProgress: (p) => progress.push(p),
    });
    expect([...new Uint8Array(await blob.arrayBuffer())]).toEqual([...TEN]);
    const blocks = fake.requests
      .filter((r) => r.path === "/DownloadBlock")
      .map((r) => JSON.parse(r.bodyText ?? "{}") as { Offset: number; BlockLength: number });
    expect(blocks).toEqual([expect.objectContaining({ Offset: 0, BlockLength: 10 })]);
    expect(progress).toEqual([
      { downloaded: 10, total: 10, percentage: 100, chunkIndex: 0, totalChunks: 1 },
    ]);
  });

  it("method actions: IsChunkingSupported false streams as one chunk", async () => {
    const { files, fake } = setup();
    unchunkedBlocks(fake);
    const stream = await files.downloadStream("accounts", ID, "new_file", {
      method: "actions",
      chunkSize: 4,
    });
    expect(await readAll(stream)).toEqual([[...TEN]]);
  });

  it("method range: 0x80090017 falls back to one GET without Range", async () => {
    const { files, fake } = setup();
    unrangedServer(fake);
    const progress: DownloadProgress[] = [];
    const blob = await files.download("accounts", ID, "new_file", {
      method: "range",
      chunkSize: 4,
      onProgress: (p) => progress.push(p),
    });
    expect([...new Uint8Array(await blob.arrayBuffer())]).toEqual([...TEN]);
    expect(blob.type).toBe("application/pdf");
    expect(fake.requests.map((r) => r.headers.range)).toEqual(["bytes=0-3", undefined]);
    expect(progress).toEqual([
      { downloaded: 10, total: 10, percentage: 100, chunkIndex: 0, totalChunks: 1 },
    ]);
  });

  it("downloadStream() (range by default) falls back the same way", async () => {
    const { files, fake } = setup();
    unrangedServer(fake);
    const stream = await files.downloadStream("accounts", ID, "new_file", { chunkSize: 4 });
    expect((await readAll(stream)).flat()).toEqual([...TEN]);
    expect(fake.requests).toHaveLength(2);
  });

  it("method range: other errors are not retried without Range", async () => {
    const { files, fake } = setup();
    fake.on("GET", `${COLUMN_PATH}/$value`, () => odataError(404, "0x80040217", "No file"));
    const err: unknown = await files
      .download("accounts", ID, "new_file", { method: "range", chunkSize: 4 })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect((err as DataverseODataError).code).toBe("0x80040217");
    expect(fake.requests).toHaveLength(1);
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
