import {
  DataverseInvalidRequestError,
  type DataverseClient,
  type RequestAdapter,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  InitializeFileBlocksUploadAction,
  UploadBlockAction,
  CommitFileBlocksUploadAction,
  InitializeFileBlocksDownloadAction,
  DownloadBlockAction,
} from "@mohsinonxrm/dataverse-sdk-actions";
import { blockRetryOptions, checkChunkSize, sendChecked } from "./requests.js";
import type { FileUploadOptions, FileDownloadOptions, UploadProgress } from "./types.js";
import { fileTarget } from "./target.js";
import {
  allBytes,
  base64ToBytes,
  bytesToBase64,
  chunksOf,
  isBlob,
  isReadableStream,
  knownSize,
  type FileSource,
} from "./chunks.js";

/**
 * Default chunk size for file uploads and downloads (4MB).
 */
const DEFAULT_CHUNK_SIZE = 4 * 1024 * 1024;

/**
 * Normalize a GUID string by removing braces and converting to lowercase.
 * @param guid - GUID string (may include braces)
 * @returns Normalized GUID (lowercase, no braces)
 */
function normalizeGuid(guid: string): string {
  return guid.replace(/[{}]/g, "").toLowerCase();
}

/** `getBaseUrl()` of a `DataverseClient`, or of any adapter that has one. */
function baseUrlOf(adapter: RequestAdapter): string | undefined {
  const candidate = adapter as Partial<Pick<DataverseClient, "getBaseUrl">>;
  return typeof candidate.getBaseUrl === "function" ? candidate.getBaseUrl() : undefined;
}

/** Remove trailing `/` characters in linear time. */
function trimTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === 47) end--;
  return value.slice(0, end);
}

/**
 * Client for file and image column operations using the Dataverse Web API.
 *
 * Uploads: the `InitializeFileBlocksUpload` / `UploadBlock` / `CommitFileBlocksUpload` actions
 * (default), a chunked `PATCH` with `Content-Range`, or a single `PATCH`. Downloads: one `GET`,
 * `Range` requests, or `InitializeFileBlocksDownload` / `DownloadBlock`; `downloadStream()`
 * returns a `ReadableStream`. Every call takes an `AbortSignal`.
 *
 * @example
 * ```typescript
 * import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";
 *
 * // Requests go through client.send(): auth, retry, logging and telemetry apply.
 * const fileClient = new FileColumnClient(client);
 *
 * // Upload file with progress tracking
 * await fileClient.upload(
 *   "accounts",
 *   accountId,
 *   "new_logo",
 *   logoFile,
 *   "logo.png",
 *   {
 *     chunkSize: 4 * 1024 * 1024,
 *     onProgress: (progress) => {
 *       console.log(`${progress.percentage}% complete`);
 *     }
 *   }
 * );
 *
 * // Download file
 * const file = await fileClient.download("accounts", accountId, "new_logo");
 * ```
 */
export class FileColumnClient {
  private readonly adapter: RequestAdapter;
  private readonly baseUrl: string;

  /**
   * Use a `DataverseClient`. Every request goes through `client.send()`, so the client's auth,
   * retry, logging and telemetry apply, and URLs are built on `client.getBaseUrl()`.
   *
   * @param client - The client to send requests with.
   */
  constructor(client: DataverseClient);
  /**
   * Use any request adapter: a `DataverseClient`, or your own object with `send(request)`.
   *
   * @param adapter - Sends each request.
   * @param baseUrl - The Web API root, e.g. `https://contoso.crm.dynamics.com/api/data/v9.2`
   *   (`client.getBaseUrl()`). Optional when the adapter has a `getBaseUrl()` method.
   * @throws DataverseInvalidRequestError (name `MissingParameter`) when there is no base URL.
   */
  constructor(adapter: RequestAdapter, baseUrl?: string);
  constructor(adapter: RequestAdapter, baseUrl?: string) {
    const root = baseUrl ?? baseUrlOf(adapter);
    if (!root) {
      const error = new DataverseInvalidRequestError(
        "FileColumnClient needs the Web API root: pass a DataverseClient, or an adapter and a " +
          "base URL such as client.getBaseUrl()"
      );
      error.name = "MissingParameter";
      throw error;
    }
    this.adapter = adapter;
    this.baseUrl = trimTrailingSlashes(root);
  }

  /**
   * Upload a file to a file or image column.
   *
   * The file is read one chunk at a time (a `Blob` by slices, a `ReadableStream` as it arrives),
   * never all at once, except with `method: "single"`.
   *
   * @param entitySetName - The entity set name (e.g., "accounts"). The `"actions"` route looks up
   *   the table's logical name and primary key first (one `EntityDefinitions` request, cached).
   * @param recordId - The record ID (GUID)
   * @param columnName - The logical name of the file/image column
   * @param file - The file data: a `Blob` (or `File`), an `ArrayBuffer`, a typed-array view such
   *   as `Uint8Array` (a Node.js `Buffer` is a `Uint8Array`), or a `ReadableStream<Uint8Array>`
   * @param fileName - The name of the file being uploaded
   * @param options - Upload options (route, chunk size, progress callback, abort signal)
   * @throws DataverseODataError (with `status` and `code`) when any step fails; nothing after the
   *   failed request is sent. DataverseInvalidRequestError for a `chunkSize` above 4 MB, or a
   *   stream without `size` on `"patch-chunked"`.
   */
  async upload(
    entitySetName: string,
    recordId: string,
    columnName: string,
    file: FileSource,
    fileName: string,
    options?: FileUploadOptions
  ): Promise<void> {
    const requestedChunk =
      options?.chunkSize === undefined ? undefined : checkChunkSize(options.chunkSize);
    if (!(
      file instanceof ArrayBuffer ||
      ArrayBuffer.isView(file) ||
      isBlob(file) ||
      isReadableStream(file)
    )) {
      throw new TypeError(
        "file must be a Blob, an ArrayBuffer, a typed array such as Uint8Array, or a ReadableStream"
      );
    }
    const method = options?.method ?? "auto";
    const size = knownSize(file) ?? options?.size;
    const columnUrl = `${this.baseUrl}/${entitySetName}(${normalizeGuid(recordId)})/${columnName}`;

    if (method === "single" || (method === "patch-chunked" && size === 0)) {
      await this.uploadSingle(columnUrl, file, fileName, options);
    } else if (method === "patch-chunked") {
      if (size === undefined) {
        throw DataverseInvalidRequestError.invalidParameter(
          "size",
          'is required to upload a ReadableStream with method "patch-chunked"'
        );
      }
      await this.uploadPatchChunked(columnUrl, file, fileName, size, options);
    } else {
      await this.uploadActions(
        entitySetName,
        recordId,
        columnName,
        file,
        fileName,
        size,
        requestedChunk ?? DEFAULT_CHUNK_SIZE,
        options
      );
    }
  }

  /** `InitializeFileBlocksUpload` + `UploadBlock` per chunk + `CommitFileBlocksUpload`. */
  private async uploadActions(
    entitySetName: string,
    recordId: string,
    columnName: string,
    file: FileSource,
    fileName: string,
    size: number | undefined,
    chunkSize: number,
    options: FileUploadOptions | undefined
  ): Promise<void> {
    const signal = options?.signal;
    const blockIds: string[] = [];

    // Step 1: Initialize upload session
    const initAction = new InitializeFileBlocksUploadAction({
      Target: await fileTarget(this.adapter, this.baseUrl, entitySetName, normalizeGuid(recordId)),
      FileName: fileName,
      FileAttributeName: columnName,
    });
    const initRequest = initAction.toRequestInformation(this.baseUrl);
    const initResponse = await sendChecked(this.adapter, initRequest, signal);
    const { FileContinuationToken } = await initAction.parseResponse(initResponse);

    // Step 2: Upload blocks (chunks)
    let uploaded = 0;
    let index = 0;
    for await (const { bytes, last } of chunksOf(file, chunkSize)) {
      // Generate block ID (base64-encoded sequential number)
      const blockId = this.generateBlockId(index);
      blockIds.push(blockId);

      const uploadAction = new UploadBlockAction({
        BlockId: blockId,
        BlockData: bytesToBase64(bytes),
        FileContinuationToken,
      });
      const uploadRequest = {
        ...uploadAction.toRequestInformation(this.baseUrl),
        middlewareOptions: blockRetryOptions(),
      };
      await sendChecked(this.adapter, uploadRequest, signal);

      uploaded += bytes.byteLength;
      options?.onProgress?.(progressOf(uploaded, size, last, index, chunkSize));
      index++;
    }

    // Step 3: Commit upload
    const mimeType =
      options?.mimeType ?? ((isBlob(file) && file.type) || "application/octet-stream");
    const commitAction = new CommitFileBlocksUploadAction({
      FileName: fileName,
      MimeType: mimeType,
      BlockList: blockIds,
      FileContinuationToken,
    });
    const commitRequest = commitAction.toRequestInformation(this.baseUrl);
    await sendChecked(this.adapter, commitRequest, signal);
  }

  /**
   * `PATCH` with `x-ms-transfer-mode: chunked` returns the upload `Location` and the chunk size
   * (`x-ms-chunk-size`); each chunk is then a `PATCH` to that `Location` with `Content-Range`.
   */
  private async uploadPatchChunked(
    columnUrl: string,
    file: FileSource,
    fileName: string,
    size: number,
    options: FileUploadOptions | undefined
  ): Promise<void> {
    const signal = options?.signal;
    const start = await sendChecked(
      this.adapter,
      {
        method: "PATCH",
        url: columnUrl,
        headers: { "x-ms-transfer-mode": "chunked", "x-ms-file-name": fileName },
      },
      signal
    );
    const location = start.headers.get("location");
    if (!location) {
      throw new DataverseInvalidRequestError(
        "Dataverse returned no Location header for the chunked upload. In a browser it must be " +
          'exposed by CORS; use method "actions" there.'
      );
    }
    const serverChunk = Number(start.headers.get("x-ms-chunk-size"));
    const serverChunkSize =
      Number.isInteger(serverChunk) && serverChunk > 0 ? serverChunk : DEFAULT_CHUNK_SIZE;
    // Dataverse rejects any chunk (but the last) that is not exactly x-ms-chunk-size long.
    const chunkSize = serverChunkSize;

    let offset = 0;
    let index = 0;
    const totalChunks = Math.ceil(size / chunkSize);
    for await (const { bytes } of chunksOf(file, chunkSize)) {
      const end = offset + bytes.byteLength;
      if (end > size) {
        throw DataverseInvalidRequestError.invalidParameter(
          "size",
          "is smaller than the data in the stream"
        );
      }
      await sendChecked(
        this.adapter,
        {
          method: "PATCH",
          url: location,
          headers: {
            "content-type": "application/octet-stream",
            "x-ms-file-name": fileName,
            "content-range": `bytes ${String(offset)}-${String(end - 1)}/${String(size)}`,
          },
          body: bytes,
          middlewareOptions: blockRetryOptions(),
        },
        signal
      );
      offset = end;
      options?.onProgress?.({
        uploaded: offset,
        total: size,
        percentage: Math.round((offset / size) * 100),
        chunkIndex: index,
        totalChunks,
      });
      index++;
    }
    if (offset !== size) {
      throw DataverseInvalidRequestError.invalidParameter(
        "size",
        `is ${String(size)} but the stream had ${String(offset)} bytes`
      );
    }
  }

  /** One `PATCH` with the whole file as the body. */
  private async uploadSingle(
    columnUrl: string,
    file: FileSource,
    fileName: string,
    options: FileUploadOptions | undefined
  ): Promise<void> {
    const signal = options?.signal;
    const bytes = await allBytes(file);
    await sendChecked(
      this.adapter,
      {
        method: "PATCH",
        url: columnUrl,
        headers: { "content-type": "application/octet-stream", "x-ms-file-name": fileName },
        body: bytes,
      },
      signal
    );
    options?.onProgress?.({
      uploaded: bytes.byteLength,
      total: bytes.byteLength,
      percentage: 100,
      chunkIndex: 0,
      totalChunks: 1,
    });
  }

  /**
   * Download a file from a file or image column.
   *
   * @param entitySetName - The entity set name (e.g., "accounts")
   * @param recordId - The record ID (GUID)
   * @param columnName - The logical name of the file/image column
   * @param options - Download options (route, chunk size, progress, image size, abort signal)
   * @returns The file data as a `Blob` (in Node.js too; `Buffer.from(await blob.arrayBuffer())`
   *   gives a `Buffer`)
   */
  async download(
    entitySetName: string,
    recordId: string,
    columnName: string,
    options?: FileDownloadOptions
  ): Promise<Blob> {
    const method = options?.method ?? "auto";
    if (method === "auto" || method === "single") {
      const response = await sendChecked(
        this.adapter,
        this.getRequest(entitySetName, recordId, columnName, options),
        options?.signal,
        options?.timeout
      );
      const blob = await response.blob();
      options?.onProgress?.({
        downloaded: blob.size,
        total: blob.size,
        percentage: 100,
        chunkIndex: 0,
        totalChunks: 1,
      });
      return blob;
    }
    const parts: Uint8Array[] = [];
    let type: string | undefined;
    for await (const part of this.downloadParts(
      entitySetName,
      recordId,
      columnName,
      method,
      options
    )) {
      parts.push(part.bytes);
      type ??= part.contentType;
    }
    return new Blob(parts as BlobPart[], type ? { type } : {});
  }

  /**
   * Download a file as a `ReadableStream`, so it is never held in memory whole. By default it
   * reads the file with `Range` requests (`method: "range"`); `"single"` streams one response
   * body, `"actions"` uses `DownloadBlock`. Requests are made as the stream is read.
   *
   * The first request is made before this resolves, so a missing file rejects here with the
   * parsed error. Cancelling the stream (or aborting `options.signal`) stops further requests.
   *
   * @returns The file's bytes as a stream of `Uint8Array`.
   */
  async downloadStream(
    entitySetName: string,
    recordId: string,
    columnName: string,
    options?: FileDownloadOptions
  ): Promise<ReadableStream<Uint8Array>> {
    const method = options?.method ?? "auto";
    if (method === "single") {
      const response = await sendChecked(
        this.adapter,
        this.getRequest(entitySetName, recordId, columnName, options),
        options?.signal,
        options?.timeout
      );
      return response.body ?? new Blob([await response.arrayBuffer()]).stream();
    }
    const parts = this.downloadParts(
      entitySetName,
      recordId,
      columnName,
      method === "auto" ? "range" : method,
      options
    );
    let pending: IteratorResult<{ bytes: Uint8Array }> | undefined;
    try {
      pending = await parts.next();
    } catch (error) {
      await parts.return(undefined);
      throw error;
    }
    return new ReadableStream<Uint8Array>({
      async pull(controller) {
        const step = pending ?? (await parts.next());
        pending = undefined;
        if (step.done) controller.close();
        else controller.enqueue(step.value.bytes);
      },
      async cancel() {
        await parts.return(undefined);
      },
    });
  }

  /** The `GET .../$value` request (`?size=full` for the full-size image). */
  private getRequest(
    entitySetName: string,
    recordId: string,
    columnName: string,
    options: FileDownloadOptions | undefined,
    headers: Record<string, string> = {}
  ): RequestInformation {
    const size = options?.imageSize === "full" ? "?size=full" : "";
    return {
      method: "GET",
      url: `${this.baseUrl}/${entitySetName}(${normalizeGuid(recordId)})/${columnName}/$value${size}`,
      // A column with no file is a 404 DataverseODataError (code 0x80040217).
      headers: { Accept: "application/octet-stream", ...headers },
    };
  }

  /** The file in chunks, by `Range` requests or `DownloadBlock`, reporting progress. */
  private async *downloadParts(
    entitySetName: string,
    recordId: string,
    columnName: string,
    method: "range" | "actions",
    options: FileDownloadOptions | undefined
  ): AsyncGenerator<{ bytes: Uint8Array; contentType?: string }> {
    const signal = options?.signal;
    const chunkSize = checkChunkSize(options?.chunkSize ?? DEFAULT_CHUNK_SIZE);
    let offset = 0;
    let index = 0;
    let total: number | undefined;
    let token = "";

    const report = (length: number): void => {
      offset += length;
      options?.onProgress?.({
        downloaded: offset,
        total: total ?? 0,
        percentage: total ? Math.round((offset / total) * 100) : 0,
        chunkIndex: index,
        totalChunks: total ? Math.ceil(total / chunkSize) : 0,
      });
      index++;
    };

    if (method === "actions") {
      if (options?.imageSize === "full") {
        throw DataverseInvalidRequestError.invalidParameter(
          "imageSize",
          'is not available with method "actions"'
        );
      }
      const init = new InitializeFileBlocksDownloadAction({
        Target: await fileTarget(
          this.adapter,
          this.baseUrl,
          entitySetName,
          normalizeGuid(recordId)
        ),
        FileAttributeName: columnName,
        DataSource: "",
      });
      const initBody = await init.parseResponse(
        await sendChecked(
          this.adapter,
          init.toRequestInformation(this.baseUrl),
          signal,
          options?.timeout
        )
      );
      total = initBody.FileSizeInBytes;
      token = initBody.FileContinuationToken;
    }

    for (;;) {
      if (total !== undefined && offset >= total) return;
      if (method === "actions") {
        const action = new DownloadBlockAction({
          Offset: offset,
          BlockLength: chunkSize,
          FileContinuationToken: token,
        });
        const res = await sendChecked(
          this.adapter,
          { ...action.toRequestInformation(this.baseUrl), middlewareOptions: blockRetryOptions() },
          signal,
          options?.timeout
        );
        const { Data } = await action.parseResponse(res);
        const bytes = base64ToBytes(Data);
        if (bytes.byteLength === 0) return;
        yield { bytes };
        report(bytes.byteLength);
        continue;
      }

      const res = await sendChecked(
        this.adapter,
        this.getRequest(entitySetName, recordId, columnName, options, {
          Range: `bytes=${String(offset)}-${String(offset + chunkSize - 1)}`,
        }),
        signal,
        options?.timeout
      );
      const contentType = res.headers.get("content-type") ?? undefined;
      const bytes = new Uint8Array(await res.arrayBuffer());
      const part = { bytes, ...(contentType ? { contentType } : {}) };
      if (res.status !== 206) {
        // Range ignored: this is the whole file.
        total = bytes.byteLength;
        yield part;
        report(bytes.byteLength);
        return;
      }
      total ??= fileSizeOf(res);
      yield part;
      report(bytes.byteLength);
      if (bytes.byteLength === 0 || (total === undefined && bytes.byteLength < chunkSize)) return;
    }
  }

  /**
   * Delete a file from a file or image column, with `DELETE /{entitySet}({id})/{column}`.
   * Deleting from a column that has no file succeeds.
   *
   * @param entitySetName - The entity set name (e.g., "accounts")
   * @param recordId - The record ID (GUID)
   * @param columnName - The logical name of the file/image column
   * @param options - `signal` cancels the request
   * @throws DataverseODataError (with `status` and `code`) when Dataverse rejects the request.
   */
  async delete(
    entitySetName: string,
    recordId: string,
    columnName: string,
    options?: { signal?: AbortSignal }
  ): Promise<void> {
    // PATCH { column: null } returns 204 but leaves the file in place; DELETE removes it.
    const request: RequestInformation = {
      method: "DELETE",
      url: `${this.baseUrl}/${entitySetName}(${normalizeGuid(recordId)})/${columnName}`,
      headers: {},
    };

    await sendChecked(this.adapter, request, options?.signal);
  }

  /**
   * Generate a base64-encoded block ID from a sequential number.
   */
  private generateBlockId(index: number): string {
    return btoa(index.toString().padStart(8, "0"));
  }
}

/** Total file size from `x-ms-file-size`, else from `Content-Range: bytes a-b/total`. */
function fileSizeOf(res: Response): number | undefined {
  const header = res.headers.get("x-ms-file-size");
  if (header !== null && Number.isInteger(Number(header))) return Number(header);
  const match = /\/(\d+)\s*$/.exec(res.headers.get("content-range") ?? "");
  return match?.[1] ? Number(match[1]) : undefined;
}

function progressOf(
  uploaded: number,
  size: number | undefined,
  last: boolean,
  index: number,
  chunkSize: number
): UploadProgress {
  if (size === undefined) {
    return {
      uploaded,
      total: uploaded,
      percentage: last ? 100 : 0,
      chunkIndex: index,
      totalChunks: index + 1,
    };
  }
  return {
    uploaded,
    total: size,
    percentage: Math.round((uploaded / size) * 100),
    chunkIndex: index,
    totalChunks: Math.ceil(size / chunkSize),
  };
}
