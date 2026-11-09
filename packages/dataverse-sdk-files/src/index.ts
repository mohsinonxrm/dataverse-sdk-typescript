/**
 * File and image column operations for Dataverse Web API.
 *
 * This package provides actions-based file upload/download with chunking support
 * for File and Image attribute columns.
 *
 * @packageDocumentation
 */

export { FileColumnClient } from "./FileColumnClient.js";
export type {
  FileUploadOptions,
  FileDownloadOptions,
  UploadProgress,
  DownloadProgress,
  UploadMethod,
  DownloadMethod,
} from "./types.js";
export type { FileSource } from "./chunks.js";
