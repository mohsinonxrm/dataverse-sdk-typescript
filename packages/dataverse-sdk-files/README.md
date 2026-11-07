# @mohsinonxrm/dataverse-sdk-files

File and image column operations with chunked upload/download for Dataverse Web API.

## Installation

```bash
npm install @mohsinonxrm/dataverse-sdk-files @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-actions
```

## Features

- ✅ **Chunked uploads**: Handles files of any size with automatic chunking (default 4MB chunks)
- ✅ **Progress tracking**: Real-time upload progress callbacks
- ✅ **File & Image columns**: Supports both FileAttributeMetadata and ImageAttributeMetadata
- ✅ **Download support**: Retrieve file content as a `Blob` (browser and Node.js)
- ✅ **Browser and Node.js**: Takes a `Blob`, `File`, `ArrayBuffer` or typed array; no `Buffer` polyfill needed
- ✅ **TypeScript first**: Fully typed with comprehensive IntelliSense
- ✅ **Three upload routes**: the block actions (default), a chunked `PATCH` with `Content-Range`, or a single `PATCH`
- ✅ **Three download routes**: one `GET`, `Range` requests, or `InitializeFileBlocksDownload` / `DownloadBlock`
- ✅ **Streams**: upload a `ReadableStream`; `downloadStream()` returns one without holding the file in memory
- ✅ **Image sizes**: full-size or thumbnail
- ✅ **Cancellation**: every call takes an `AbortSignal`

## Supported Column Types

- **File columns** (`FileAttributeMetadata`): Store documents, attachments, any file type
- **Image columns** (`ImageAttributeMetadata`): Store profile pictures, logos, images

## Usage

### Basic Upload

```typescript
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";

const client = new DataverseClient({
  baseUrl: "https://your-org.crm.dynamics.com",
  tokenProvider,
});

// Every request runs through client.send(): auth, retry, logging and telemetry apply.
const fileClient = new FileColumnClient(client);

// Upload file to account logo (image column)
const accountId = "00000000-0000-0000-0000-000000000001";
// A File from an <input type="file">, or any Blob
const logoFile = document.querySelector<HTMLInputElement>("input[type=file]")!.files![0];

await fileClient.upload(
  "accounts", // Entity set name
  accountId, // Record ID
  "new_logo", // Column logical name
  logoFile, // File data (Blob, File, ArrayBuffer or Uint8Array/Buffer)
  "company-logo.png" // File name
);
```

### Upload with Progress Tracking

```typescript
await fileClient.upload("accounts", accountId, "new_document", documentFile, "contract.pdf", {
  chunkSize: 4 * 1024 * 1024, // 4MB chunks (default)
  onProgress: (progress) => {
    console.log(`Upload: ${progress.percentage}% complete`);
    console.log(`Chunk ${progress.chunkIndex + 1} of ${progress.totalChunks}`);
    console.log(`${progress.uploaded} / ${progress.total} bytes`);
  },
});
```

### Upload Large File

```typescript
import { openAsBlob } from "node:fs";

// Every upload is sent in blocks of at most 4MB (the largest block Dataverse accepts),
// so a large file needs no special options. The column's maximum size still applies.
const largeFile = await openAsBlob("large-document.pdf"); // Node.js: a Blob read slice by slice
const controller = new AbortController(); // controller.abort() cancels the upload

await fileClient.upload("emails", emailId, "new_attachment", largeFile, "large-document.pdf", {
  onProgress: (progress) => {
    console.log(`${progress.percentage}%`); // update a progress bar here
  },
  signal: controller.signal,
});
```

### Download File

```typescript
// Download file from column
const file = await fileClient.download("accounts", accountId, "new_logo");

// In a browser: save the Blob
const url = URL.createObjectURL(file);
const link = document.createElement("a");
link.href = url;
link.download = "logo.png";
link.click();
URL.revokeObjectURL(url);

// In Node.js: download() returns a Blob too
import { writeFile } from "node:fs/promises";
await writeFile("downloaded-logo.png", Buffer.from(await file.arrayBuffer()));
```

### Delete File

```typescript
// Remove the file from the column (DELETE /accounts(id)/new_logo).
// Deleting from a column that has no file succeeds.
await fileClient.delete("accounts", accountId, "new_logo");
```

### Upload Routes

```typescript
// "actions" (default): InitializeFileBlocksUpload, UploadBlock per chunk, CommitFileBlocksUpload.
// "patch-chunked": PATCH with x-ms-transfer-mode: chunked, then PATCH chunks to the returned
//   Location with Content-Range. Dataverse dictates the chunk size (x-ms-chunk-size, 4 MB), so
//   chunkSize is ignored; it needs the total size.
// "single": one PATCH with the whole file.
await fileClient.upload("accounts", accountId, "new_document", file, "contract.pdf", {
  method: "patch-chunked",
});
```

The PATCH routes send the file name as the percent-encoded `?x-ms-file-name=` query parameter, not the `x-ms-file-name` header (which carries only ASCII), so a name like `合同.pdf` or `résumé.pdf` is kept as written. The `"actions"` route sends it in the JSON body.

`method: "auto"` (the default) is `"actions"`, the route that works everywhere. `"patch-chunked"` reads the `Location` and `x-ms-chunk-size` response headers, which a browser can read only if Dataverse's CORS policy exposes them (it rejects with a clear error when `Location` is missing); use `"actions"` in browsers. `"single"` sends the file in one request, so it is limited by the column's maximum size and holds the whole file in memory.

### Upload a Stream

```typescript
// A Blob is read one slice at a time; a ReadableStream<Uint8Array> as it arrives.
const response = await fetch(sourceUrl);
await fileClient.upload("accounts", accountId, "new_document", response.body!, "copy.pdf", {
  size: Number(response.headers.get("content-length")), // needed for "patch-chunked"
  mimeType: "application/pdf", // committed by the "actions" route
});
```

Without `size`, an `"actions"` upload still works, but `progress.total` is the bytes read so far and `percentage` is 0 until the last chunk. Only the current and the next chunk are held in memory.

### Ranged and Streaming Download

```typescript
// Range requests (Range: bytes=0-4194303, size from x-ms-file-size), with progress.
const blob = await fileClient.download("accounts", accountId, "new_document", {
  method: "range", // or "actions" for InitializeFileBlocksDownload / DownloadBlock
  chunkSize: 4 * 1024 * 1024,
  onProgress: (p) => console.log(`${p.percentage}% (${p.downloaded}/${p.total})`),
  signal: controller.signal,
});

// A ReadableStream: each chunk is requested as the stream is read.
const stream = await fileClient.downloadStream("accounts", accountId, "new_document");
const reader = stream.getReader();
for (let chunk = await reader.read(); !chunk.done; chunk = await reader.read()) {
  console.log(`${chunk.value.byteLength} bytes`); // write chunk.value somewhere
}
```

`download()` with `method: "auto"` (default) is one `GET .../$value`. `downloadStream()` defaults to `"range"` (and streams the response body if Dataverse ignores `Range`). Cancelling the stream stops further requests.

Some files can't be read in parts: on-premises, or in an environment with a self-managed key (BYOK), Dataverse answers a partial read with `0x80090017` and `InitializeFileBlocksDownload` returns `IsChunkingSupported: false`. The `"actions"` route then reads the whole file as one block, and `"range"` falls back to one `GET` without `Range`.

### Image Sizes

```typescript
// Thumbnail (default) or the full-size image (?size=full).
const full = await fileClient.download("accounts", accountId, "new_photo", { imageSize: "full" });
```

Dataverse returns the full-size image only for an image column with `CanStoreFullImage` true (the platform's own `entityimage` columns don't keep one: `?size=full` answers 204 with no body). Full size is not available with `method: "actions"`.

## Chunking Strategy

By default the `FileColumnClient` uses a three-step chunked upload process based on Microsoft's Web API actions:

1. **Initialize**: `InitializeFileBlocksUpload` action creates upload session. Its `Target` is a typed entity reference, `{ "@odata.type": "Microsoft.Dynamics.CRM.account", "accountid": "…" }`, so the first upload to a table looks up its logical name and primary key from `EntityDefinitions` (once per entity set; the result is reused by every `FileColumnClient` on the same `DataverseClient`)
2. **Upload blocks**: `UploadBlock` action uploads each chunk sequentially
3. **Commit**: `CommitFileBlocksUpload` action finalizes the upload

### Default Chunk Size

- **Default and maximum**: 4MB (`4 * 1024 * 1024` bytes). Dataverse rejects bigger blocks, so `upload()` rejects a larger `chunkSize` with a `DataverseInvalidRequestError` before sending anything.
- **Configurable**: Specify a smaller `chunkSize` for finer-grained progress

### Block ID Generation

Block IDs are automatically generated as base64-encoded sequential numbers:

- Block 0: `"MDAwMDAwMDA="` (base64 of "00000000")
- Block 1: `"MDAwMDAwMDE="` (base64 of "00000001")
- Block 2: `"MDAwMDAwMDI="` (base64 of "00000002")

This ensures proper ordering when committing the upload.

## Error Handling

Every response is checked. When a step fails, `upload()`, `download()` and `delete()` reject with the parsed error (`DataverseODataError`, or `DataverseThrottleError` for a 429), which carries `status`, `code`, `message`, `requestId` and the response headers, and `upload()` sends nothing after the failed request. `download()` of a column with no file rejects with status 404.

```typescript
import { DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";

try {
  await fileClient.upload("accounts", accountId, "new_logo", logoFile, "logo.png", {
    onProgress: (progress) => {
      console.log(`Progress: ${progress.percentage}%`);
    },
  });
  console.log("Upload successful!");
} catch (error) {
  if (error instanceof DataverseODataError) {
    console.error("Dataverse error:", error.status, error.code, error.message);
  } else {
    console.error("Upload failed:", error);
  }
}
```

## React Example with Progress

```tsx
import { useState, type ChangeEvent } from "react";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { FileColumnClient } from "@mohsinonxrm/dataverse-sdk-files";

function ProfilePictureUpload({
  client,
  accountId,
}: {
  client: DataverseClient;
  accountId: string;
}) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const fileClient = new FileColumnClient(client);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      await fileClient.upload("accounts", accountId, "new_profilepicture", file, file.name, {
        onProgress: (p) => setProgress(p.percentage),
      });
      alert("Upload complete!");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={uploading} accept="image/*" />
      {uploading && (
        <div>
          <progress value={progress} max="100" />
          <span>{progress}%</span>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### FileColumnClient

#### Constructor

<!-- no-check -->

```typescript
new FileColumnClient(client: DataverseClient)
new FileColumnClient(adapter: RequestAdapter, baseUrl?: string)
```

- `client`: your `DataverseClient`. Requests go through `client.send()`, so its auth, retry, logging and telemetry apply, and URLs are built on `client.getBaseUrl()`.
- `adapter`: any object with `send(request: RequestInformation): Promise<Response>`. A raw adapter such as `FetchRequestAdapter` adds no auth or retry.
- `baseUrl`: the Web API root, e.g. `https://contoso.crm.dynamics.com/api/data/v9.2`. Optional when the adapter has a `getBaseUrl()` method (a `DataverseClient` does). Without either, the constructor throws a `DataverseInvalidRequestError` (name `MissingParameter`).

#### Methods

##### `upload()`

```typescript
async upload(
  entitySetName: string,
  recordId: string,
  columnName: string,
  file: Blob | ArrayBuffer | ArrayBufferView | ReadableStream<Uint8Array>,
  fileName: string,
  options?: FileUploadOptions
): Promise<void>
```

Upload a file to a file or image column.

**Parameters:**

- `entitySetName`: Entity set name (e.g., `'accounts'`, `'emails'`). The table's logical name and primary key are looked up from it once (see [Chunking Strategy](#chunking-strategy))
- `recordId`: Record GUID (with or without braces)
- `columnName`: Logical name of file/image column
- `file`: File data: a `Blob` or `File`, an `ArrayBuffer`, a typed-array view such as `Uint8Array` (a Node.js `Buffer` is a `Uint8Array`), or a `ReadableStream<Uint8Array>`. A `Blob`'s `type` becomes the file's MIME type (the `mimeType` option overrides it); otherwise it is `application/octet-stream`.
- `fileName`: Name of file being uploaded
- `options`: Upload options (optional)

**Returns:** Promise that resolves when upload completes.

##### `download()`

```typescript
async download(
  entitySetName: string,
  recordId: string,
  columnName: string,
  options?: FileDownloadOptions
): Promise<Blob>
```

Download a file from a file or image column.

**Parameters:**

- `entitySetName`: Entity set name
- `recordId`: Record GUID
- `columnName`: Logical name of file/image column
- `options`: Download options (optional)

**Returns:** File data as a `Blob`, in browsers and in Node.js.

##### `downloadStream()`

```typescript
async downloadStream(
  entitySetName: string,
  recordId: string,
  columnName: string,
  options?: FileDownloadOptions
): Promise<ReadableStream<Uint8Array>>
```

Download a file as a stream. The first request is made before the promise resolves, so a missing file rejects there (status 404).

##### `delete()`

```typescript
async delete(
  entitySetName: string,
  recordId: string,
  columnName: string,
  options?: { signal?: AbortSignal }
): Promise<void>
```

Delete a file from a file or image column, with `DELETE /{entitySetName}({recordId})/{columnName}`. Deleting from a column that has no file succeeds.

**Parameters:**

- `entitySetName`: Entity set name
- `recordId`: Record GUID
- `columnName`: Logical name of file/image column

**Returns:** Promise that resolves when deletion completes.

### FileUploadOptions

```typescript
interface FileUploadOptions {
  chunkSize?: number; // Chunk size in bytes (default and maximum: 4MB)
  onProgress?: (progress: UploadProgress) => void;
  signal?: AbortSignal; // Cancels the upload; it rejects with DataverseAbortError
  method?: "auto" | "actions" | "patch-chunked" | "single"; // default "auto" = "actions"
  size?: number; // total bytes of a ReadableStream (needed for "patch-chunked")
  mimeType?: string; // committed by the "actions" route
}
```

### FileDownloadOptions

```typescript
interface FileDownloadOptions {
  method?: "auto" | "single" | "range" | "actions"; // download(): "auto" = "single"
  chunkSize?: number; // bytes per request for "range"/"actions" (default and maximum: 4MB)
  onProgress?: (progress: DownloadProgress) => void; // downloaded, total, percentage, chunkIndex, totalChunks
  signal?: AbortSignal;
  timeout?: number; // milliseconds per request; no limit unless set
  imageSize?: "full" | "thumbnail"; // image columns; default thumbnail
}
```

### UploadProgress

```typescript
interface UploadProgress {
  uploaded: number; // Bytes uploaded so far
  total: number; // Total file size in bytes
  percentage: number; // Progress percentage (0-100)
  chunkIndex: number; // Current chunk index (0-based)
  totalChunks: number; // Total number of chunks
}
```

## Performance Considerations

### Chunk Size

- The default 4MB is also the largest block Dataverse accepts, and needs the fewest requests.
- `upload()` reads a `Blob` one slice at a time and a `ReadableStream` as it arrives, so memory use is a couple of chunks (except `method: "single"`, which holds the whole file). `download()` collects the chunks into one `Blob`; use `downloadStream()` to avoid that.

### Parallel Uploads

**Not supported** for one file: its chunks are uploaded one after the other. To upload several files at once, run several `upload()` calls concurrently (one per record or column); through a `DataverseClient` they share its concurrency limit.

### Retry Logic

When the `FileColumnClient` sends through a `DataverseClient`, the client's retry settings apply to every request: a 429 is retried for any request. A block (`UploadBlock`) is also retried after a 502, 503 or 504 (and after a dropped connection when the client sets `retry.retryNetworkErrors: true`; a block is a POST, so the default retries for idempotent requests don't cover it), because sending a block again with the same block id replaces it; the client retries other POSTs only after a 429. The number of retries is the client's `retry.maxRetries`. A raw adapter such as `FetchRequestAdapter` doesn't retry.

## Browser Compatibility

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge), with no `Buffer` polyfill
- **IE11**: Not supported (no native `fetch`, Blob support limited)

## Node.js Compatibility

- **Node.js 22+**: Full support
- **Older versions**: Not supported (requires native `fetch`)

## License

AGPL-3.0-only

## Related Packages

- [`@mohsinonxrm/dataverse-sdk-core`](../dataverse-sdk-core) - Core SDK with request pipeline
- [`@mohsinonxrm/dataverse-sdk-actions`](../dataverse-sdk-actions) - Typed Web API actions
- [`@mohsinonxrm/dataverse-sdk-metadata`](../dataverse-sdk-metadata) - Metadata operations (includes FileAttributeMetadata typing)
