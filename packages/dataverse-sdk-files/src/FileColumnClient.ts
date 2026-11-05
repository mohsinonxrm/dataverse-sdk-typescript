import type { RequestAdapter, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import {
  InitializeFileBlocksUploadAction,
  UploadBlockAction,
  CommitFileBlocksUploadAction,
} from "@mohsinonxrm/dataverse-sdk-actions";
import { blockRetryOptions, checkChunkSize, sendChecked } from "./requests.js";
import type { FileUploadOptions, FileDownloadOptions } from "./types.js";

/**
 * Default chunk size for file uploads (4MB).
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

/**
 * Client for file and image column operations using Dataverse Web API actions.
 *
 * Supports chunked upload/download for large files using:
 * - InitializeFileBlocksUpload
 * - UploadBlock
 * - CommitFileBlocksUpload
 *
 * @example
 * ```typescript
 * import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";
 *
 * const fileClient = new FileColumnClient(client.requestAdapter);
 *
 * // Upload file with progress tracking
 * await fileClient.upload(
 *   "accounts",
 *   accountId,
 *   "new_logo",
 *   logoFile,
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
  constructor(
    private readonly adapter: RequestAdapter,
    private readonly baseUrl = ""
  ) {}

  /**
   * Upload a file to a file or image column.
   *
   * Automatically chunks files larger than the specified chunk size.
   *
   * @param entitySetName - The entity set name (e.g., "accounts")
   * @param recordId - The record ID (GUID)
   * @param columnName - The logical name of the file/image column
   * @param file - The file data (Blob in browser, Buffer in Node)
   * @param fileName - The name of the file being uploaded
   * @param options - Upload options (chunk size, progress callback, abort signal)
   * @throws DataverseODataError (with `status` and `code`) when any step fails; nothing after the
   *   failed request is sent. DataverseInvalidRequestError for a `chunkSize` above 4 MB.
   */
  async upload(
    entitySetName: string,
    recordId: string,
    columnName: string,
    file: Blob | Buffer,
    fileName: string,
    options?: FileUploadOptions
  ): Promise<void> {
    const chunkSize = checkChunkSize(options?.chunkSize ?? DEFAULT_CHUNK_SIZE);

    // Get file size and convert to Uint8Array
    const fileData = await this.fileToUint8Array(file);
    const totalSize = fileData.byteLength;

    // Calculate chunks
    const totalChunks = Math.ceil(totalSize / chunkSize);
    const blockIds: string[] = [];

    // Step 1: Initialize upload session
    const initAction = new InitializeFileBlocksUploadAction(
      {
        "@odata.type": "Microsoft.Dynamics.CRM.EntityReference",
        logicalName: entitySetName,
        id: normalizeGuid(recordId),
      },
      fileName,
      columnName
    );
    const initRequest = initAction.toRequestInformation(this.baseUrl);
    const initResponse = await sendChecked(this.adapter, initRequest, options?.signal);
    const { FileContinuationToken } = await initAction.parseResponse(initResponse);

    // Step 2: Upload blocks (chunks)
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, totalSize);
      const chunk = fileData.slice(start, end);

      // Generate block ID (base64-encoded sequential number)
      const blockId = this.generateBlockId(i);
      blockIds.push(blockId);

      // Encode chunk as base64
      const blockData = this.arrayBufferToBase64(chunk.buffer);

      // Upload block
      const uploadAction = new UploadBlockAction(blockId, blockData, FileContinuationToken);
      const uploadRequest = {
        ...uploadAction.toRequestInformation(this.baseUrl),
        middlewareOptions: blockRetryOptions(),
      };
      await sendChecked(this.adapter, uploadRequest, options?.signal);

      // Report progress
      if (options?.onProgress) {
        const uploaded = end;
        const percentage = Math.round((uploaded / totalSize) * 100);
        options.onProgress({
          uploaded,
          total: totalSize,
          percentage,
          chunkIndex: i,
          totalChunks,
        });
      }
    }

    // Step 3: Commit upload
    const mimeType = (file as Blob).type || "application/octet-stream";
    const commitAction = new CommitFileBlocksUploadAction(
      fileName,
      mimeType,
      blockIds,
      FileContinuationToken
    );
    const commitRequest = commitAction.toRequestInformation(this.baseUrl);
    await sendChecked(this.adapter, commitRequest, options?.signal);
  }

  /**
   * Download a file from a file or image column.
   *
   * @param entitySetName - The entity set name (e.g., "accounts")
   * @param recordId - The record ID (GUID)
   * @param columnName - The logical name of the file/image column
   * @param options - Download options
   * @returns The file data (Blob in browser, Buffer in Node)
   */
  async download(
    entitySetName: string,
    recordId: string,
    columnName: string,
    _options?: FileDownloadOptions
  ): Promise<Blob | Buffer> {
    const normalizedId = recordId.replace(/[{}]/g, "").toLowerCase();

    // Construct download URL
    const url = `${this.baseUrl}/${entitySetName}(${normalizedId})/${columnName}/$value`;

    const request: RequestInformation = {
      method: "GET",
      url,
      headers: {
        Accept: "application/octet-stream",
      },
    };

    // A column with no file is a 404 DataverseODataError (code 0x80040217).
    const response = await sendChecked(this.adapter, request);

    // Return appropriate type based on environment
    if (typeof Blob !== "undefined") {
      return await response.blob();
    } else {
      // Node.js environment
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }
  }

  /**
   * Delete a file from a file or image column, with `DELETE /{entitySet}({id})/{column}`.
   * Deleting from a column that has no file succeeds.
   *
   * @param entitySetName - The entity set name (e.g., "accounts")
   * @param recordId - The record ID (GUID)
   * @param columnName - The logical name of the file/image column
   * @throws DataverseODataError (with `status` and `code`) when Dataverse rejects the request.
   */
  async delete(entitySetName: string, recordId: string, columnName: string): Promise<void> {
    const normalizedId = recordId.replace(/[{}]/g, "").toLowerCase();

    // PATCH { column: null } returns 204 but leaves the file in place; DELETE removes it.
    const request: RequestInformation = {
      method: "DELETE",
      url: `${this.baseUrl}/${entitySetName}(${normalizedId})/${columnName}`,
      headers: {},
    };

    await sendChecked(this.adapter, request);
  }

  /**
   * Generate a base64-encoded block ID from a sequential number.
   */
  private generateBlockId(index: number): string {
    const blockIdStr = index.toString().padStart(8, "0");
    return this.stringToBase64(blockIdStr);
  }

  /**
   * Convert string to base64 (works in both browser and Node).
   */
  private stringToBase64(str: string): string {
    if (typeof btoa !== "undefined") {
      // Browser
      return btoa(str);
    } else {
      // Node.js
      return Buffer.from(str, "utf-8").toString("base64");
    }
  }

  /**
   * Convert ArrayBuffer to base64 string.
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    if (typeof btoa !== "undefined") {
      // Browser
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    } else {
      // Node.js
      return Buffer.from(buffer).toString("base64");
    }
  }

  /**
   * Convert Blob or Buffer to Uint8Array.
   */
  private async fileToUint8Array(file: Blob | Buffer): Promise<Uint8Array> {
    if (Buffer.isBuffer(file)) {
      return new Uint8Array(file);
    } else {
      // Blob
      const arrayBuffer = await file.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    }
  }
}
