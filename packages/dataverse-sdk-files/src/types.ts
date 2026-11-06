/**
 * Options for file upload operations.
 */
export interface FileUploadOptions {
  /**
   * Chunk size in bytes for chunked uploads.
   * Default and maximum: 4MB (4 * 1024 * 1024 bytes), the largest block Dataverse accepts.
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
   * Total file size in bytes.
   */
  total: number;

  /**
   * Percentage complete (0-100).
   */
  percentage: number;

  /**
   * Current chunk index (0-based).
   */
  chunkIndex: number;

  /**
   * Total number of chunks.
   */
  totalChunks: number;
}

/**
 * Options for file download operations.
 */
export interface FileDownloadOptions {
  /**
   * Request timeout in milliseconds.
   * Default: 30000 (30 seconds)
   */
  timeout?: number;
}
