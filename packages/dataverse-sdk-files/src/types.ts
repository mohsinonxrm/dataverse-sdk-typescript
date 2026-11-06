/** The upload routes, see `FileUploadOptions.method`. */
export type UploadMethod = "auto" | "actions" | "patch-chunked" | "single";

/** The download routes, see `FileDownloadOptions.method`. */
export type DownloadMethod = "auto" | "single" | "range" | "actions";

/**
 * Options for file upload operations.
 */
export interface FileUploadOptions {
  /**
   * Chunk size in bytes for chunked uploads.
   * Default and maximum: 4MB (4 * 1024 * 1024 bytes), the largest block Dataverse accepts.
   * Not used by `"patch-chunked"`: Dataverse rejects any other chunk size than the one it asks for
   * (`x-ms-chunk-size`), so that is the size used.
   */
  chunkSize?: number;

  /**
   * Progress callback invoked after each chunk upload.
   */
  onProgress?: (progress: UploadProgress) => void;

  /**
   * Cancels the upload. The request in flight is aborted, nothing after it is sent, and
   * `upload()` rejects with a `DataverseAbortError` (when sent through a `DataverseClient`).
   */
  signal?: AbortSignal;

  /**
   * Which Dataverse upload route to use.
   *
   * - `"actions"`: `InitializeFileBlocksUpload`, `UploadBlock` per chunk, `CommitFileBlocksUpload`
   *   (needs one table-metadata lookup; works from browsers).
   * - `"patch-chunked"`: `PATCH` the column with `x-ms-transfer-mode: chunked`, then one `PATCH`
   *   per chunk to the returned `Location` with `Content-Range`. Needs the total size (a `Blob`,
   *   buffer, or `size` for a stream) and reads the `Location` and `x-ms-chunk-size` response
   *   headers, which a browser can read only if Dataverse's CORS policy exposes them.
   * - `"single"`: one `PATCH` with the whole file as the body (Dataverse limits this route to the
   *   column's maximum size). A stream is buffered first.
   * - `"auto"` (default): `"actions"`, the route that works everywhere.
   */
  method?: UploadMethod;

  /**
   * Total size in bytes of a `ReadableStream` upload. Required for `"patch-chunked"` with a
   * stream; with `"actions"` it makes progress report a real total. Ignored for a `Blob`, buffer
   * or typed array (their size is known).
   */
  size?: number;

  /**
   * MIME type committed with the `"actions"` route. Default: the `Blob`'s `type`, else
   * `application/octet-stream`.
   */
  mimeType?: string;
}

/**
 * Upload progress information.
 */
export interface UploadProgress {
  /**
   * Total bytes uploaded so far.
   */
  uploaded: number;

  /**
   * Total file size in bytes. For a stream uploaded without `size`, the bytes read so far.
   */
  total: number;

  /**
   * Percentage complete (0-100). For a stream uploaded without `size`, 100 on the last chunk
   * and 0 before it.
   */
  percentage: number;

  /**
   * Current chunk index (0-based).
   */
  chunkIndex: number;

  /**
   * Total number of chunks. For a stream uploaded without `size`, the chunks sent so far.
   */
  totalChunks: number;
}

/**
 * Download progress information.
 */
export interface DownloadProgress {
  /** Bytes downloaded so far. */
  downloaded: number;
  /** Total file size in bytes (0 when Dataverse didn't say). */
  total: number;
  /** Percentage complete (0-100; 0 when the total is unknown). */
  percentage: number;
  /** Current chunk index (0-based). A `"single"` download reports one chunk. */
  chunkIndex: number;
  /** Total number of chunks (0 when the size is unknown). */
  totalChunks: number;
}

/**
 * Options for file download operations.
 */
export interface FileDownloadOptions {
  /**
   * Time limit in milliseconds for each request. No limit unless set (the client's own
   * timeouts still apply).
   */
  timeout?: number;

  /** Cancels the download: the request in flight is aborted and nothing after it is sent. */
  signal?: AbortSignal;

  /**
   * Which Dataverse download route to use.
   *
   * - `"single"`: one `GET .../$value`.
   * - `"range"`: `GET .../$value` with a `Range` header per chunk (206 responses, total size from
   *   `x-ms-file-size`).
   * - `"actions"`: `InitializeFileBlocksDownload`, then `DownloadBlock` per chunk.
   * - `"auto"` (default): `"single"` for `download()`; `"range"` for `downloadStream()` (which
   *   streams the body if Dataverse ignores `Range`).
   */
  method?: DownloadMethod;

  /** Chunk size in bytes for `"range"` and `"actions"`. Default and maximum: 4 MB. */
  chunkSize?: number;

  /** Called after each chunk (once, at the end, for `"single"`). */
  onProgress?: (progress: DownloadProgress) => void;

  /**
   * Image columns: `"full"` asks for the full-size image (`?size=full`); `"thumbnail"` (default)
   * leaves the parameter off, so Dataverse returns its thumbnail. Not available with `"actions"`.
   */
  imageSize?: "full" | "thumbnail";
}
